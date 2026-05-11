import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { count, timestamp } = body;
        console.log(count, timestamp);
    } catch (e) {
        console.error(e);
    }
}