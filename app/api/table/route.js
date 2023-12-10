import {NextResponse} from "next/server";
import prisma from "../../../prisma/client";

export async function GET(req) {
    try {
        const tables = await prisma.tables.findMany();
        return NextResponse.json({msg: "Tables fetched successfully", status: "success", tables: tables});
    } catch (error) {
        return NextResponse.json({msg: "Could not fetch tables", status: "error"});
    }
}