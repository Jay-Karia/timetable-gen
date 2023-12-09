"use client"
import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button} from "@nextui-org/react";

function SpecificTable({id}) {
    const [header, setHeader] = useState("Table")
    const [loading, setLoading] = useState(false);
    const [table, setTable] = useState(null)

    useEffect(() => {
         async function  fetchTable () {
            try {
                setLoading(true)
                const res = await fetch(`/api/table/${id}`);
                const data = await res.json();
                if (data.status === "success") {
                    setTable(data.table)
                    setHeader("")
                }
            } catch (e) {
                setHeader("Could not load table")
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchTable();
    }, []);

    return (
        <div className={"flex h-full w-full"}>
            {loading ? <div className={"flex justify-center items-center h-full w-full"}>
                <h1 className={"text-2xl font-bold items-center"}>Loading...</h1>
            </div>: <h1 className={"text-xl font-bold"}>{header}</h1>}
             {table ? <div>
                <h1 className={"text-md"}><span
                    className={"font-bold"}>{table.title}</span> {table.standard}-{table.division}</h1>
                <Table key={table.id} aria-label="Example static collection table" className={"mt-2"}>
                    <TableHeader className={"bg-slate-700"}>
                        {table.data[0].map((row, index) => (
                            <TableColumn key={index}>{row}</TableColumn>
                        ))}

                    </TableHeader>
                    <TableBody>
                        {table.data.slice(1).map((row, index) => (
                            <TableRow key={index}>
                                {row.map((cell, index) => (
                                    <TableCell key={index}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody> 
               </Table>
            </div>: ""}
        </div>
    );
}

export default SpecificTable;