/* eslint-disable react/jsx-key */
'use client'
interface columnsProps {
    name: string
}
interface TableProps {
    columns: columnsProps[]
    rows: any[]
}
export function Table({ columns, rows }: TableProps) {
    return (
        <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        {columns.map(({ name}: columnsProps) => {
                return <th key={name}> {name} </th>
        })} 

      </tr>
    </thead> 
    <tbody>
        {rows.map((item: any) => {
                    return <tr><td key={item}> {item} </td></tr>
        })} 
    </tbody> 
  </table>
</div>
    )
}