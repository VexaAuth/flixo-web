import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL;
        const res = await fetch(`${apiUrl}/api/bot-info`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch from Bot API" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
