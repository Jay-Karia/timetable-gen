import {NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function POST(req) {
    const {title, standard, division, data} = await req.json();
    try {
        await prisma.tables.create({
            data: {
                title: title,
                standard: standard,
                division: division,
                data: data,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        return NextResponse.json({msg: "Table added successfully", status: "success"});
    } catch (error) {
        return NextResponse.json({msg: "Could not add table", status: "error"});
    }
}