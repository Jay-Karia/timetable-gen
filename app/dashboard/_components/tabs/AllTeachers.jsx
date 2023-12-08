"use client";
import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Button,
    Input,
} from "@nextui-org/react";
import {Toaster, toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import ScrollableFeed from "react-scrollable-feed";
import toastOptions from "../../../../config/toastOptions";

function AllTeachers(props) {
    const [teachers, setTeachers] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleTableClick = (table) => {
        if (table.length === 0) {
            toast.error("No table Found!", toastOptions.error);
        } else {
            const id = table.id;
            const url = `/dashboard?table=${id}`;
            router.push(url);
        }
    };

    useEffect(() => {
        async function fetchTeachers() {
            try {
                setLoading(true);
                const localTeachers = localStorage.getItem("teachers");
                if (localTeachers) {
                    setTeachers(JSON.parse(localTeachers));
                } else {
                    const res = await fetch("/api/teacher", {
                        cache: "force-cache",
                        method: "GET",
                    });
                    const data = await res.json();

                    if (data.status === "success") {
                        setTeachers(data.teachers);
                        localStorage.setItem("teachers", JSON.stringify(data.teachers));
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, []);

    const handleRemove = async (teacher) => {
        const id = teacher.id;
        try {
            toast.success("Removing teacher", toastOptions.loading);
            const res = await fetch(`/api/teacher`, {
                method: "DELETE",
                body: JSON.stringify({id}),
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Teacher removed!", toastOptions.success);
                setTeachers(teachers.filter((teacher) => teacher.id !== id));
                localStorage.setItem("teachers", JSON.stringify(teachers.filter((teacher) => teacher.id !== id)));
            } else {
                toast.error("Could not remove teacher!", toastOptions.error);
            }
        } catch (e) {
            toast.error("Could not remove teacher!", toastOptions.error);
        }
    };

    const handleAdd = async () => {
        const firstName = document.getElementById("fName").value;
        const lastName = document.getElementById("lName").value;
        try {
            toast.success("Adding teacher", toastOptions.loading);
            const res = await fetch(`/api/teacher`, {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                }),
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Teacher added!", toastOptions.success);
                setTeachers([...teachers, data.teacher]);
                localStorage.setItem("teachers", JSON.stringify([...teachers, data.teacher]));
            } else {
                toast.error("Could not add Teacher!", toastOptions.error);
            }
        } catch (e) {
            toast.error("Could not add teacher!", toastOptions.error);
        }
    };

    return (
        <div className={"h-full"}>
            <div>
                <Toaster position={"bottom-right"}/>
            </div>
            <h1 className={"text-xl font-bold"}>All Teachers</h1>
            {loading && (
                <div className={"flex justify-center items-center h-full"}>
                    <h1 className={"text-2xl font-bold"}>Loading...</h1>
                </div>
            )}

            {!loading &&
                <ScrollableFeed className={"h-full pb-40 overflow-y-scroll"}>
                    <div className={"overflow-y-scroll h-full"}>
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
                                        <Input
                                            variant={"bordered"}
                                            size={"sm"}
                                            placeholder={"First Name"}
                                            className={"rounded-lg"}
                                            id={"fName"}
                                        />
                                        <Input
                                            variant={"bordered"}
                                            size={"sm"}
                                            placeholder={"Last Name"}
                                            className={"rounded-lg "}
                                            id={"lName"}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter className={"flex justify-between"}>
                                    <Button
                                        color="success"
                                        auto
                                        onClick={() => {
                                            handleAdd();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        {teachers && (
                            <div
                                className={
                                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-3"
                                }
                            >
                                {teachers.map((teacher) => (
                                    <Card
                                        key={teacher.id}
                                        className="max-w-[400px] p-4 rounded-xl hover:bg-slate-100 "
                                    >
                                        <CardHeader className="flex gap-3">
                                            <div className="flex flex-col">
                                                <p className="text-md font-bold">
                                                    {teacher.firstName} {teacher.lastName}
                                                </p>
                                            </div>
                                        </CardHeader>
                                        <Divider/>
                                        <CardFooter className={"flex justify-between "}>
                                            <Button
                                                variant={"flat"}
                                                color="primary"
                                                auto
                                                onClick={() => {
                                                    handleTableClick(teacher.table);
                                                }}
                                            >
                                                Table
                                            </Button>
                                            <Button
                                                variant={"solid"}
                                                color="danger"
                                                auto
                                                onClick={() => {
                                                    handleRemove(teacher);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollableFeed>
            }
        </div>
    );
}

export default AllTeachers;
