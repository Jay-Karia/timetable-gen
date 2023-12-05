import {NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(req, {params}) {
    try {
        const tables = await prisma.tables.findUnique({
            where: {
                id: params.id
            }
        });
        if (!tables) {
            return NextResponse.json({message: "Table not found", success: false}, {status: 404});
        }

        await prisma.tables.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({msg: "Table deleted successfully", status: "success"});
    } catch (error) {
        return NextResponse.json({msg: "Could not delete table", status: "error"});
    }
}

export async function GET(req, {params}) {
    try {
        const table = await prisma.tables.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({msg: "Table fetched successfully", status: "success", table: table});
    } catch (error) {
        return NextResponse.json({msg: "Could not fetch table", status: "error"});
    }
}

export async function PUT(req, {params}) {
    const {title, standard, division, data} = await req.json();
    try {
        const tables = await prisma.tables.findUnique({
            where: {
                id: params.id
            }
        });
        if (!tables) {
            return NextResponse.json({message: "Table not found", success: false}, {status: 404});
        }

        await prisma.tables.update({
            where: {
                id: params.id
            }, data: {
                title: title,
                standard: standard,
                division: division,
                data: data
            }
        });
        return NextResponse.json({msg: "Table updated successfully", status: "success"});
    } catch (error) {
        return NextResponse.json({msg: "Could not update table", status: "error"});
    }
}