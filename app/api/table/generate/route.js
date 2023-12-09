import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req) {
    const { title, standard, division, subjects, maxPeriods } = await req.json()

    const prisma = new PrismaClient();
    return NextResponse.json({ msg: "Table created successfully", status: "success" });
}