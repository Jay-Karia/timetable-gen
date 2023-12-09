"use client"
import React, {useEffect, useState} from 'react';
import {
    Button,
    Divider,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import CustomInput from "../CustomInput";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import DeleteIcon from "../../../../icons/DeleteIcon";
import DownloadIcon from "../../../../icons/DownloadIcon";
import SaveIcon from "../../../../icons/SaveIcon";
import RegenerateIcon from "../../../../icons/RegenerateIcon";
import AddIcon from "../../../../icons/AddIcon";
import {Checkbox} from "@nextui-org/react";
import ScrollableFeed from "react-scrollable-feed";
import {Toaster, toast} from "react-hot-toast"
import toastOptions from "../../../../config/toastOptions";

function Generate(props) {

    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [addTeacher, setAddTeacher] = useState("")
    const [table, setTable] = useState({
        "id": "656f48a5233e1a9542325ce5",
        "createdAt": "2023-12-05T15:58:29.169Z",
        "data": [["Periods ", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ""], ["Period 1", "chemistry", "engII", "engII", "chemistry", "chemistry", "computer", ""], ["Period 2", "maths", "maths", "chemistry", "computer", "physics", "engI", ""], ["Period 3", "chemistry", "physics", "maths", "engII", "chemistry", "physics", ""], ["Period 4", "PT", "maths", "chemistry", "chemistry", "engII", "engII", ""], ["Period 5", "engI", "chemistry", "physics", "engI", "computer", "physics", ""], ["Period 6", "computer", "engI", "engI", "maths", "engI", "maths", ""], ["Period 7", "computer", "chemistry", "maths", "physics", "physics", "", ""], ["Period 8", "engII", "computer", "physics", "maths", "maths", "", ""]],
        "division": "A",
        "standard": "11",
        "title": "new title +1234+",
        "updatedAt": "2023-12-05T15:58:29.169Z"
    })
    const [loading, setLoading] = useState(false)

    const days = [
        {title: "Monday", default: "8"},
        {title: "Tuesday", default: "8"},
        {title: "Wednesday", default: "8"},
        {title: "Thursday", default: "8"},
        {title: "Friday", default: "8"},
        {title: "Saturday", default: "6"},
        {title: "Sunday", default: "0"},
    ]

    const colors = ["bg-slate-200", "bg-slate-300", "bg-slate-400"]

    const addSubject = (subject) => {
        subject.consecutive = subject.consecutive.getAttribute("data-selected") !== null
        subject.teacher = addTeacher
        if (localStorage.getItem("subjects") === null) {
            localStorage.setItem("subjects", JSON.stringify([subject]));
        } else {
            localStorage.setItem(
                "subjects",
                JSON.stringify([
                    ...JSON.parse(localStorage.getItem("subjects")),
                    subject,
                ]),
            );
        }
        if (subjects) {
            setSubjects([...subjects, subject]);
        } else {
            setSubjects([subject]);
        }
    };

    const deleteSubject = (subject) => {
        setSubjects(subjects.filter((item) => item !== subject));
        localStorage.setItem(
            "subjects",
            JSON.stringify(subjects.filter((item) => item !== subject)),
        );
    };

    const handleTeacherChange = (event, subjectIndex) => {
        setSubjects(
            subjects.map((item, i) => {
                if (i === subjectIndex) {
                    item.teacher = event.target.value;
                }
                return item;
            }),
        );
        localStorage.setItem(
            "subjects",
            JSON.stringify(subjects),
        );
    };

    const handleChange = (e, subject, index, checkbox) => {
        if (checkbox) {
            setSubjects(
                subjects.map((item, i) => {
                    if (i === index) {
                        item.consecutive = e.target.checked;
                    }
                    return item;
                }),
            );
            subject.consecutive = e.target.checked;
            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects),
            );
        } else {
            setSubjects(
                subjects.map((item, i) => {
                    if (i === index) {
                        item.subject = e.target.value;
                    }
                    return item;
                }),
            )
            subject.subject = e.target.value;
            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects),
            );
        }
    }

    useEffect(() => {
        const localSubject = localStorage.getItem("subjects") === null ?
            []
            : JSON.parse(localStorage.getItem("subjects"))
        setSubjects(localSubject);

        const fetchTeachers = async () => {
            try {
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
                console.log(e)
            }
        }

        fetchTeachers()
    }, []);

    const generateTable = async () => {
        try {
            setLoading(true)
            toast.success("Generating Table...", toastOptions.loading)
            const title = document.getElementById("title").value
            const standard = document.getElementById("standard").value
            const division = document.getElementById("division").value
            const subjects = JSON.parse(localStorage.getItem("subjects"))

            let maxPeriods = []
            days.forEach((day) => {
                maxPeriods.push(document.getElementById(day.title).value)
            })
            const body = JSON.stringify({
                title,
                standard,
                division,
                subjects,
                maxPeriods,
            })

            const res = await fetch("/api/table/generate", {
                method: "POST",
                body: body
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success(data.msg, toastOptions.success)
            } else {
                toast.error("Could not generate table", toastOptions.error)
            }
        } catch (e) {
            toast.error("Could not generate table", toastOptions.error)
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = () => {
        alert("save")
    }

    const handleDownload = () => {
        alert("download")
    }

    return (
        <div className={"h-full"}>
            <h1 className={"text-xl font-bold"}>Generate</h1>
            <div><Toaster position={"bottom-right"} /></div>
            <ScrollableFeed className={"h-full pb-40 overflow-y-scroll"}>
                <div className={" flex flex-col py-7 gap-7"}>
                    <div className={"flex gap-4 flex-col md:flex-row "}>
                        <Input
                            label="Title (Optional)"
                            variant="faded"
                            placeholder="Enter title"
                            labelPlacement={"inside"}
                            className="max-w-xs"
                            id={"title"}
                        />
                        <CustomInput type={"number"} label={"Standard"} placeholder={"1"} id={"standard"} variant={"faded"}/>
                        <Input
                            type="text"
                            label="Division"
                            variant={"faded"}
                            placeholder="A"
                            labelPlacement="inside"
                            className={"w-28"}
                            id={"division"}
                        />
                    </div>
                    <div>
                        <h1 className={"font-semibold"}>Max Periods</h1>
                        <div className={"gap-4 mt-4 flex flex-wrap"}>
                            {days.map((day, index) => (
                                <CustomInput key={day.title} id={day.title} type={"number"} label={day.title} variant={"flat"}
                                             defaultValue={day.default}
                                             color={"default"}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className={"font-semibold"}>Subjects</h1>
                        <div className={"flex gap-4"}>
                            <div className={"flex flex-wrap gap-4 mt-4"}>
                                {subjects ? (
                                    <>
                                        <Card className={"max-w-xs hover:bg-slate-50 w-96"}>
                                            <CardHeader className={`flex gap-3`}>
                                                <p className="text-md font-medium">Add Subject</p>
                                            </CardHeader>
                                            <Divider/>
                                            <CardBody>
                                                <Input label="Subject" id={"subject"}/>
                                                <div className={"flex gap-4 my-4"}>
                                                    <Input label="Daily Max" id={"daily"} className="w-28"/>
                                                    <Input label="Weekly Max" id={"weekly"} className="w-28"/>
                                                </div>
                                                <Select
                                                    label="Teacher"
                                                    placeholder="Select teacher"
                                                    labelPlacement="outside"
                                                    className="max-w-xs"
                                                    id={"teacher"}
                                                    selectedKeys={[addTeacher]}
                                                    onChange={(e) => {
                                                        setAddTeacher(e.target.value)
                                                    }}
                                                    disableSelectorIconRotation
                                                >
                                                    {teachers.map((teacher) => (
                                                        <SelectItem key={teacher.id} value={JSON.stringify(teacher)}
                                                                    textValue={`${teacher.firstName} ${teacher.lastName}`}>
                                                            {teacher.firstName} {teacher.lastName}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <Checkbox id={"consecutive"} className={"mt-4"}>Consecutive</Checkbox>
                                            </CardBody>
                                            <CardFooter className={"flex justify-between"}>
                                                <Button startContent={<AddIcon/>} color={"success"} variant={"solid"} onClick={() => {
                                                    addSubject({
                                                        subject: document.getElementById("subject").value,
                                                        daily: document.getElementById("daily").value,
                                                        weekly: document.getElementById("weekly").value,
                                                        consecutive: document.getElementById("consecutive")
                                                    });
                                                }}>
                                                    Add Subject
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                        {subjects.map((subject, index) => (

                                            <Card key={index} className={"max-w-xs hover:bg-slate-50 w-96"}>
                                                <CardHeader
                                                    className={`flex gap-3 ${colors[index % colors.length]}`}>

                                                    <Input variant={"bordered"} className="text-xl font-medium"
                                                           onChange={(e) => {
                                                               handleChange(e, subject, index, false)
                                                           }}
                                                           defaultValue={subject.subject}/>
                                                </CardHeader>
                                                <Divider/>
                                                <CardBody>
                                                    <div className={"flex gap-4 my-4"}>
                                                        <Input label="Daily Max" defaultValue={subject.daily}
                                                               onChange={(e) => {
                                                                   handleChange(e, subject, index, false)
                                                               }}
                                                               className="w-28"/>
                                                        <Input label="Weekly Max" defaultValue={subject.weekly}
                                                               onChange={(e) => {
                                                                   handleChange(e, subject, index, false)
                                                               }}
                                                               className="w-28"/>
                                                    </div>
                                                    <Select
                                                        label="Teacher"
                                                        placeholder="Select teacher"
                                                        labelPlacement="outside"
                                                        className="max-w-xs"
                                                        disableSelectorIconRotation
                                                        selectedKeys={[subject.teacher]}
                                                        onChange={(e) => {
                                                            handleTeacherChange(e, index)
                                                        }}
                                                    >
                                                        {teachers.map((teacher) => (
                                                            <SelectItem key={teacher.id} value={JSON.stringify(teacher)}
                                                                        textValue={`${teacher.firstName} ${teacher.lastName}`}>
                                                                {teacher.firstName} {teacher.lastName}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
                                                    <Checkbox onChange={(e) => {
                                                        handleChange(e, subject, index, true)
                                                    }} className={"mt-4"} id={"consecutive"}
                                                              defaultSelected={subject.consecutive}>Consecutive</Checkbox>
                                                </CardBody>
                                                <CardFooter className={"flex justify-between"}>
                                                    <DeleteIcon onClick={() => {
                                                        deleteSubject(subject)
                                                    }}/>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    <p className={"text-md font-medium"}>No subjects added</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"space-y-4"}>
                        <h1 className={"font-semibold"}>Table</h1>
                        <Button startContent={<RegenerateIcon/>} color={"secondary"} onClick={generateTable}>Generate</Button>
                        <div>
                            {table ? (
                                <>
                                    <div className={"m-4"}>
                                        <h1 className={"text-md"}><span
                                            className={"font-bold"}>{table.title}</span> {table.standard}-{table.division}
                                        </h1>
                                        <Table key={table.id} aria-label="Example static collection table"
                                               className={"mt-2"}>
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
                                        <div className={"flex flex-wrap gap-4 my-4 justify-between"}>
                                            <div className={"flex items-center gap-4"}>
                                                <Button color={"primary"} variant={"ghost"} onClick={handleSave}
                                                        startContent={<SaveIcon/>}>Save</Button>
                                                <Button color={"primary"} variant={"ghost"}
                                                        startContent={<RegenerateIcon/>}
                                                        onClick={generateTable}>Regenerate</Button>
                                            </div>
                                            <Button color={"primary"} variant={"bordered"} onClick={handleDownload}
                                                    startContent={<DownloadIcon/>}>Download</Button>
                                        </div>
                                    </div>
                                </>
                            ) : ""}
                        </div>
                    </div>
                </div>
            </ScrollableFeed>
        </div>
    );
}

export default Generate;
