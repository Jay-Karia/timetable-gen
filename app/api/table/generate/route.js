import {NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function POST(req, {params}) {
    return NextResponse.json({msg: "Table created successfully", status: "success"});
}