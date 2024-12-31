'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma/client';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
	await prisma.post.create({
		data: {
			title: formData.get('title') as string,
			slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase(),
			content: formData.get('content') as string,
		},
	});

	revalidatePath('/posts');
}

export async function editPost(id: string, formData: FormData) {
	const { title, slug, content } = {
		title: formData.get('title') as string,
		slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase(),
		content: formData.get('content') as string,
	};

	await prisma.post.update({
		where: { id },
		data: {
			title,
			slug,
			content,
		},
	});

	redirect(`/posts/${slug}`);
}

export async function deletePost(id: string) {
	await prisma.post.delete({ where: { id } });

	redirect('/posts');
}
