import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return NextResponse.json(await prisma.post.findUnique({ where: { slug } }));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug: originalSlug } = await params;
	const { content, slug, title } = (await request.json()) as { title: string; slug: string; content: string };

	return NextResponse.json(
		await prisma.post.update({
			where: { slug: originalSlug },
			data: {
				title,
				slug,
				content,
			},
		})
	);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return NextResponse.json(await prisma.post.delete({ where: { slug } }));
}
