'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
	try {
		await fetch(`${process.env.BASE_URL}/api/posts`, {
			method: 'POST',
			body: JSON.stringify({
				data: {
					title: formData.get('title') as string,
					slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase(),
					content: formData.get('content') as string,
				},
			}),
		});
		revalidatePath('/posts');
	} catch (error) {
		alert((error as Error).message);
	}
}

export async function editPost(slug: string, formData: FormData) {
	const data = {
		title: formData.get('title') as string,
		slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase(),
		content: formData.get('content') as string,
	};

	const { slug: nextSlug } = data;

	try {
		await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	} catch (error) {
		alert((error as Error).message);
	}

	redirect(`/posts/${nextSlug}`);
}

export async function deletePost(slug: string, withRedirect = true) {
	try {
		await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
			method: 'DELETE',
		});
	} catch (error) {
		alert((error as Error).message);
	}

	if (withRedirect) {
		redirect('/posts');
	}
	revalidatePath('/posts');
}
