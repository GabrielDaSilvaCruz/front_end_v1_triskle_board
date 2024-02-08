'use client'
import { AiOutlineDownload } from 'react-icons/ai'
import { Button } from "@/components/Button/Button";
import { Col } from "@/components/Col/Col";
import { InputFile } from "@/components/InputFile/InputFile";
import { Row } from "@/components/Row/Row";
import { ChangeEvent, useState } from "react";
import { api_axios } from "@/service/api";
import { ChartBarVertical } from "@/components/Chart/ChartBarVertical";
import moment from "moment";
import Papa from "papaparse";
import { separateDataByCategory } from "@/utils/chart";
import { Card } from "@/components/Card/Card";
import { formatNumber, formatPercentual } from "@/utils/function";
import { Progresso } from '@/components/Progresso/Progresso';


export default function Propensao() {
    const [isLoding, setIsLoding]  = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileToUpload, setFileToUpload] = useState<any>(undefined);
    const [download, setDownload] = useState<any>(undefined);
    const [dataChartQuantidade, setDataChartQuantidade] = useState<any>(undefined);
    const [dataChartPorcentagem, setDataChartPorcentagem] = useState<any>(undefined);
    const [dataCard, setDataCard] = useState<any[]>([]);
    
    function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
        setDownload(undefined)
        const { files } = event.target

        if (!files) {
            return
        }
        setFileToUpload(files[0])
    };

    function card(data: any[]) {
        const arrayCard = [];
        const Total = data.length;
        const Break = data.reduce((total, objeto) => total + (objeto.BREAK === 1 ? 1 : 0), 0);
        const Perbreak = Break / Total * 100;

        arrayCard.push({label: "Total:", value: formatNumber(Total)})
        arrayCard.push({label: "Break:", value: `${formatNumber(Break)} | ${formatPercentual(Perbreak)}`})

        return arrayCard
    }

    async function onSave() {
        try {
            setUploadProgress(0);
            setIsLoding(true);
            setDataChartQuantidade(undefined);
            setDataChartPorcentagem(undefined);
            setDownload(undefined);

            const uploadFormData = new FormData()
            uploadFormData.append('file', fileToUpload)
     
            const response  = await  api_axios.post('report/ancoragem', uploadFormData, {
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setUploadProgress(percentCompleted);  
                },
                
            })
            const { success, data, chart } = response.data
     
            if (success) {
             const porcetagem = separateDataByCategory(chart, 'Porcentagem', 'ULT_TENT', 'Porcentagem', ["#00FFFF"])
             setDataChartPorcentagem(porcetagem)
     
             const Quantidade = separateDataByCategory(chart, 'Qtd', 'ULT_TENT', 'Qtd',  ["#3FA9F5"])
             setDataChartQuantidade(Quantidade)
     
             setDownload(data)
             const datacard = card(data)
             setDataCard(datacard)
            }

        } catch (err) {
            // console.log(err)
        }
        setIsLoding(false);
    }

    async function exportData () {
        const byteArray = Papa.unparse(download);
        
        const blob = new Blob([byteArray], {
            type: 'text/csv' 
        });
  
        // Crea una URL para el Blob
        const url = URL.createObjectURL(blob);

        const year = moment().format('YYYY');
        const month = moment().format('MM');
        const day = moment().format('DD');
        
        // Crea un elemento "a" para el enlace de descarga
        const a = document.createElement('a');
        a.href = url;
        a.download =  `ancoragem_${year}_${month}_${day}`; // Nombre del archivo CSV

        a.click();

        URL.revokeObjectURL(url);
    }

    return (

        <Row className="mt-5">

            <Col sm="12" md="8" lg="4">
                <InputFile multiple={false} accept=".csv" name="ancoragemFile" id="ancoragemFile" onChange={onChangeFile}/>
            </Col>

            <Col sm="3" md="4" lg="4" className='flex gap-2'>
                <Button id="enviar" className="w-auto" onClick={onSave} disabled={fileToUpload === undefined}>
                    Enviar
                </Button>
                <Button id="download" className="w-full bg-secondary" onClick={exportData} disabled={download === undefined}>
                    <AiOutlineDownload /> Download
                </Button>
            </Col>
            {isLoding  &&  uploadProgress <= 100   ? 
                <Col sm="12" md="12" lg="12" className="h-80 w-full">
                    {uploadProgress >= 99 ? 'Transforme data' : <Progresso percentage={uploadProgress}/>}                    
                </Col>
                
            : (
                <>
                    <Col sm="12" md="12" lg="12" className="flex gap-2 max-h-40">
                    <Card data={dataCard}  direction="row"/>
                    </Col>
                    <Col sm="12" md="6" lg="6">
                        <ChartBarVertical data={dataChartQuantidade} title="Quantidade"  title_x="Probabilidade" title_y="Quantidade" />
                    </Col>
                    <Col sm="12" md="6" lg="6">
                        <ChartBarVertical data={dataChartPorcentagem} title="Percentual" title_x="Probabilidade" title_y="Percentual" />
                    </Col>
                </> 
            )}

        </Row>
    )
}


