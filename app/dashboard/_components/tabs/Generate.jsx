"use client"
import React, {useEffect, useState} from 'react';
import {Button, Divider, Input} from "@nextui-org/react";
import CustomInput from "../CustomInput";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import DeleteIcon from "../../_components/DeleteIcon";
import {Checkbox} from "@nextui-org/react";

function Generate(props) {

    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [selectedTeachers, setSelectedTeachers] = useState([])
    const [addTeacher, setAddTeacher] = useState("")

    const days = [
        {title: "Monday", default: "8"},
        {title: "Tuesday", default: "8"},
        {title: "Wednesday", default: "8"},
        {title: "Thursday", default: "8"},
        {title: "Friday", default: "8"},
        {title: "Saturday", default: "6"},
        {title: "Sunday", default: "0"},
    ]

    const secondaryColors = [
        "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-indigo-100", "bg-pink-100", "bg-purple-100", "bg-gray-100"
    ]

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


    return (
        <div className={"h-full"}>
            <h1 className={"text-xl font-bold"}>Generate</h1>
            <div className={" flex flex-col py-7 gap-7"}>
                <div className={"flex flex-row gap-4 "}>
                    <Input
                        label="Title (Optional)"
                        variant="faded"
                        placeholder="Enter title"
                        labelPlacement={"inside"}
                        className="max-w-xs"
                    />
                    <CustomInput type={"number"} label={"Standard"} placeholder={"1"} variant={"faded"}/>
                    <Input
                        type="text"
                        label="Division"
                        variant={"faded"}
                        placeholder="A"
                        labelPlacement="inside"
                        className={"w-28"}
                    />
                </div>
                <div>
                    <h1 className={"font-semibold"}>Max Periods</h1>
                    <div className={"flex flex-row gap-4 mt-4"}>
                        {days.map((day, index) => (
                            <CustomInput key={day.title} type={"number"} label={day.title} variant={"flat"}
                                         defaultValue={day.default}
                                         color={"secondary"}/>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className={"font-semibold"}>Subjects</h1>
                    <div className={"flex gap-4"}>
                        <div className={"grid grid-cols-4 gap-4 mt-4"}>
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
                                            <Button color={"success"} variant={"solid"} onClick={() => {
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
                                                className={`flex gap-3 ${secondaryColors[Math.floor(Math.random() * 7)]}`}>
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
            </div>
        </div>
    );
}

export default Generate;
