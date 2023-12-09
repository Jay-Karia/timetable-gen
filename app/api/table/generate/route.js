import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req) {
    const { title, standard, division, subjects, maxPeriods } = await req.json()
    console.log(title, standard, division, subjects, maxPeriods)

    const prisma = new PrismaClient();
    return NextResponse.json({ msg: "Table created successfully", status: "success" });
}