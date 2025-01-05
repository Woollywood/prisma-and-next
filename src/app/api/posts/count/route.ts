import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(await prisma.post.count());
}
