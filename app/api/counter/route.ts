import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { counter } = body;
    const result = await pool.query(
      'INSERT INTO counter (counter) VALUES ($1) RETURNING *',
      [counter]
    );
    return Response.json(result.rows[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query('SELECT * FROM counter WHERE id = 1');
    return Response.json(result.rows[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return Response.json({ error: message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { counter } = body;

    const result = await pool.query(
      'UPDATE counter SET counter = $1 WHERE id = 1 RETURNING *',
      [counter]
    );

    return Response.json(result.rows[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return Response.json({ error: message }, { status: 500 });
  }
}