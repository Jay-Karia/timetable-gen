"use client"
import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Button, Input} from "@nextui-org/react";
import {Toaster, toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import ScrollableFeed from "react-scrollable-feed";

function AllTeachers(props) {
    const [teachers, setTeachers] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleTableClick = (table) => {
        if (table.length === 0) {
            toast.error("No table Found!", {
                style: {
                    border: '1px solid #2a0202',
                    color: '#9b1515',
                },
                iconTheme: {
                    primary: '#9b1515',
                    secondary: '#FFFAEE',
                },
            })
        } else {
            const id = table.id
            const url = `/dashboard?table=${id}`
            router.push(url)
        }
    }

    useEffect(() => {
        async function fetchTeachers() {
            try {
                setLoading(true)
                const res = await fetch("/api/teacher", {cache: "force-cache", method: "GET"})
                const data = await res.json()

                if (data.status === "success") {
                    setTeachers(data.teachers)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchTeachers()
    }, []);

    const handleRemove = async (teacher) => {
        const id = teacher.id
        try {
            toast.success("Removing teacher", {
                icon: '⭕',
                style: {
                    border: '1px solid #713200',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            })
            const res = await fetch(`/api/teacher`, {
                method: "DELETE",
                body: JSON.stringify({id})
            })
            const data = await res.json()
            if (data.status === "success") {
                toast.success("Teacher removed!", {
                    style: {
                        border: '1px solid #022a09',
                        color: '#054b11',
                    },
                    iconTheme: {
                        primary: '#054b11',
                        secondary: '#FFFAEE',
                    },
                })
                setTeachers(teachers.filter((teacher) => teacher.id !== id))
            } else {
                toast.error("Could not remove teacher!", {
                    style: {
                        border: '1px solid #2a0202',
                        color: '#9b1515',
                    },
                    iconTheme: {
                        primary: '#9b1515',
                        secondary: '#FFFAEE',
                    },
                })
            }

        } catch (e) {
            toast.error("Could not remove teacher!", {
                style: {
                    border: '1px solid #2a0202',
                    color: '#9b1515',
                },
                iconTheme: {
                    primary: '#9b1515',
                    secondary: '#FFFAEE',
                },
            })
        }
    }

    const handleAdd = async () => {
        const firstName = document.getElementById("fName").value
        const lastName = document.getElementById("lName").value
        try {
            toast.success("Adding teacher", {
                icon: '⭕',
                style: {
                    border: '1px solid #713200',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            })
            const res = await fetch(`/api/teacher`, {
                method: "POST",
                body: JSON.stringify({
                    firstName, lastName
                })
            })
            const data = await res.json()
            if (data.status === "success") {
                toast.success("Teacher added!", {
                    style: {
                        border: '1px solid #022a09',
                        color: '#054b11',
                    },
                    iconTheme: {
                        primary: '#054b11',
                        secondary: '#FFFAEE',
                    },
                })
                setTeachers([...teachers, data.teacher])
            } else {
                toast.error(data.msg, {
                    style: {
                        border: '1px solid #2a0202',
                        color: '#9b1515',
                    },
                    iconTheme: {
                        primary: '#9b1515',
                        secondary: '#FFFAEE',
                    },
                })
            }

        } catch (e) {
            toast.error("Could not add teacher!", {
                style: {
                    border: '1px solid #2a0202',
                    color: '#9b1515',
                },
                iconTheme: {
                    primary: '#9b1515',
                    secondary: '#FFFAEE',
                },
            })
        }
    }

    return (
        <div className={"h-full"}>
            <div><Toaster position={"bottom-right"}/></div>
            <h1 className={"text-xl font-bold"}>All Teachers</h1>
            {loading && <div className={"flex justify-center items-center h-full"}>
                <h1 className={"text-2xl font-bold"}>Loading...</h1>
            </div>}
            <div className={"mt-4"}>
                <Card className="max-w-[400px] p-4 rounded-xl border-2">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md font-bold">Add Teacher</p>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className={"flex flex-col gap-2"}>
                            <Input variant={"bordered"} size={"sm"} placeholder={"First Name"}
                                   className={"rounded-lg"} id={"fName"}/>
                            <Input variant={"bordered"} size={"sm"} placeholder={"Last Name"}
                                   className={"rounded-lg "} id={"lName"}/>
                        </div>
                    </CardBody>
                    <CardFooter className={"flex justify-between"}>
                        <Button color="success" auto onClick={() => {
                            handleAdd()
                        }}>
                            Add
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {!loading && <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"}>
                    {teachers && teachers.map((teacher) => (
                        <Card key={teacher.id} className="max-w-[400px] p-4 rounded-xl hover:bg-slate-100 ">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-col">
                                    <p className="text-md font-bold">{teacher.firstName} {teacher.lastName}</p>
                                </div>
                            </CardHeader>
                            <Divider/>
                            <CardFooter className={"flex justify-between"}>
                                <Button color="primary" auto onClick={() => {
                                    handleTableClick(teacher.table)
                                }}>
                                    Table
                                </Button>
                                <Button color="danger" auto onClick={() => {
                                    handleRemove(teacher)
                                }}>
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
            }

        </div>
    )
        ;
}

export default AllTeachers;