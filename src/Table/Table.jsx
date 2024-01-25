
import React, { useEffect, useMemo, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import axios from 'axios';


import './Table.scss';


const COLUMNS = [
    {
        accessorKey: 'name',
        header: 'Country Name',
    },
    {
        accessorKey: 'abbreviation',
        header: 'Code',
    },
    {
        accessorKey: 'capital',
        header: 'Capital',
    },
    {
        accessorKey: 'currency',
        header: 'Ph Code',
    },
    {
        accessorKey: 'population',
        header: 'Population',
        cell: info => info.getValue() || 'n/a'
    },
    {
        accessorKey: 'media.flag',
        header: 'Flag',
        cell: info => <img height='20px' width='20px' src={info.getValue()} alt='' />

    },
    {
        accessorKey: 'media.emblem',
        header: 'Emblem',
        cell: info => <img height='20px' width='20px' src={info.getValue()} alt='' />

    },
]

export default function Table({ state }) {

    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const newCountryName = state.countryName.trim().toLocaleLowerCase();

    const { countryName, population } = state

    const filterData = useMemo(() => data.filter(({ name, population }) => (name.toLocaleLowerCase().includes(newCountryName) || !newCountryName) && (state.population <= population || !state.population)), [data, countryName, population])

    const table = useReactTable({
        data: filterData,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })


    useEffect(() => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: 'https://mocki.io/v1/ec42d07b-99b4-4d9b-b678-4643ef8baad8'
        })
            .then((response) => {
                setData(response.data)
            }).catch(() => {
                setData([])
            }).finally(() => {
                setIsLoading(false)
            });

    }, [])

    return (
        <div className='tableContainer'>
            {isLoading ? <div>Please wait data is loading...</div> : <table className='tableMain'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {!filterData.length ? <tr>
                        <td className='noData'>No Data found. Clear the filters.</td>
                    </tr> : table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>}


        </div>
    )
}
