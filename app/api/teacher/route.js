import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(req) {
    const {id} = await req.json();
    try {
        const teachers = await prisma.teachers.findUnique({
            where: {
                id: id
            }
        });
        if (!teachers) {
            return NextResponse.json({message: "Teacher not found", success: false}, {status: 404});
        }

        await prisma.teachers.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({msg: "Teacher deleted successfully", status: "success"});
    } catch (error) {
        return NextResponse.json({msg: "Could not delete teacher", status: "error"});
    }
}

export async function POST(req, {params}){
const {firstName, lastName} = await req.json();
    try {
        const teachers = await prisma.teachers.findFirst({
            where: {
                firstName: firstName,
                lastName: lastName
            }

        })
        if (teachers) {
            return NextResponse.json({message: "Teacher already exists", success: false}, {status: 404});
        }

        await prisma.teachers.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                createdAt: new Date(),
                table: "",
                updatedAt: new Date(),
            }
        });
        const newTeacher = await prisma.teachers.findFirst({
            where: {
                firstName: firstName,
                lastName: lastName
            }
        });
        return NextResponse.json({msg: "Teacher added successfully", status: "success", teacher: newTeacher});
    } catch (error) {
        return NextResponse.json({msg: "Could not add teacher", status: "error"});
    }
}

export async function GET(req, {params}){
    try {
        const teachers = await prisma.teachers.findMany();
        return NextResponse.json({msg: "Teachers fetched successfully", status: "success", teachers: teachers});
    } catch (error) {
        return NextResponse.json({msg: "Could not fetch teachers", status: "error"});
    }
}