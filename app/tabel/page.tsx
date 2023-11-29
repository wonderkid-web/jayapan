import React from 'react'
import { ObatTable } from './data-table'
import { columns } from './column'
import supabse from '@/utils/supabse'


async function getData(){
    const {data} = await supabse.from('obat').select("*")
    return data
}

export default async function page() {
  
  const dataObat = await getData()
  if(dataObat !== null)
  return (
    <ObatTable data={dataObat} columns={columns} />
    
  )
}
