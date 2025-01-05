import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(await prisma.post.findMany());
}

export async function POST(request: NextRequest) {
	const { data } = (await request.json()) as { data: { title: string; slug: string; content: string } };

	return NextResponse.json(
		await prisma.post.create({
			data,
		})
	);
}
