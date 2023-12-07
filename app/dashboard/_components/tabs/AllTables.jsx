"use client"
import React, {useEffect, useState} from 'react';
import {Toaster, toast} from "react-hot-toast";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";
import ScrollableFeed from "react-scrollable-feed";
import {useRouter} from "next/navigation";

function AllTables(props) {
    const [tables, setTables] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleTableClick = (table) => {
        const id = table.id
        const url = `/dashboard?table=${id}`
        router.push(url)
    }

    useEffect(() => {
        async function fetchTables() {
            try {
                setLoading(true)
                const res = await fetch("/api/table", {cache: "force-cache"})
                const data = await res.json()

                if (data.status === "success") {
                    setTables(data.tables)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchTables()
    }, []);

    return (
        <div className={"h-full"}>
            <div><Toaster position={"bottom-right"}/></div>
            <h1 className={"text-xl font-bold"}>All Tables</h1>
            {loading && <div className={"flex justify-center items-center h-full"}>
                <h1 className={"text-2xl font-bold"}>Loading...</h1>
            </div>}
            {!loading && <ScrollableFeed className={"pb-44 overflow-y-scroll"}>
                {tables.length > 0 && <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4"}>
                    {tables.map((table) => (
                        <div key={table.id}
                             className={" p-4 rounded-lg hover:bg-slate-200 bg-slate-100 hover:cursor-pointer"}
                             onClick={() => {
                                 handleTableClick(table)
                             }}>
                            <h1 className={"text-md"}><span
                                className={"font-bold"}>{table.title}</span> {table.standard}-{table.division}</h1>
                            <Table key={table.id} aria-label="Example static collection table" className={"mt-2"}>
                                <TableHeader className={"bg-slate-700"}>
                                    {table.data[0].map((row) => (
                                        <TableColumn>{row}</TableColumn>
                                    ))}

                                </TableHeader>
                                <TableBody>
                                    {table.data.slice(1).map((row) => (
                                        <TableRow>
                                            {row.map((cell) => (
                                                <TableCell>{cell}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>}
            </ScrollableFeed>}
        </div>
    );
}

export default AllTables;