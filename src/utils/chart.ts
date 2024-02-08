

export interface SelectChartProps {
    value: number | undefined;
    type: string | undefined;
    label: string | undefined;
}

function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export function separateDataByCategory(regs: any[], title: string, type: string, unit: string, backgroundColor?: string[]) {
  
    const obj: any = {};
  
    for (const reg of regs) {
        const category = reg[type]
        const value = reg[unit]
        if (obj[category] !== undefined) {
            obj[category] = obj[category] + value
        } else {
            obj[category] =  value
        }
    }

    const labels = Object.keys(obj)
    const data = labels.map((label) => obj[label])


    const DataPie = {
        labels,
        type,
        datasets: [
          {
            label: title,
            data,
            backgroundColor,
          },
        ],
    }

    return DataPie
}

export function separateDataByCategoryLine(regs: any[], type: string, unit: string, subtype?: string) {
  
    const obj: any = {};
    const obj_multiple: any = {};
  
    for (const reg of regs) {
        const category = reg[type]
        const value = reg[unit]
        if (obj[category] !== undefined) {
            obj[category] = obj[category] + value
        } else {
            obj[category] =  value
        }
    }

    if (subtype) {
        for (const reg of regs) {
            const subcategory = reg[subtype]
            const value = reg[unit]

            if (obj_multiple[subcategory] !== undefined) {
                obj_multiple[subcategory] = [...obj_multiple[subcategory], value + 0] 
            } else {
                obj_multiple[subcategory] = [value + 0]
            }
        }
    }


    const labels = Object.keys(obj)
    const data = labels.map((label) => obj[label])
    const subcategorys = Object.keys(obj_multiple)
    const colors = generateChartColors()

    const dataset = subcategorys.map((label, index) => {
        return {
            label,
            fill: true,
            lineTension: 0,
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors[index],
            pointBackgroundColor: colors[index],
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors[index],
            pointHoverBorderColor: colors[index],
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: obj_multiple[label],
        }
    })
    return {
        labels,
        data,
        dataset
    }
}


export function abstractDataClickChart(
    event: any, 
    elements: any[], 
    data: any , 
    setFilter: (item: SelectChartProps) => void, 
    setIsToFilter: (isToFilter: boolean) => void) {
    if (elements[0]) {
        const { datasetIndex, index } = elements[0]
        const label = data.labels[index]
        const value = data.datasets[datasetIndex].data[index];
        setFilter({label, type: data.type, value})
        setIsToFilter(true)
    } else {
        setIsToFilter(false)
        setFilter({value: undefined, type: undefined, label: undefined})
    }
}

export function generateChartColors() {
    const backgroundColor = ['#21BDC6', '#9D00EB', '#3FA9F5', '#00FFFF', randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]

    return backgroundColor
}

function themeColorToHexadecimal(arg0: string): any {
    throw new Error("Function not implemented.");
}
