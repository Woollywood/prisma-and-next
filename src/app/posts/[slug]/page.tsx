import { deletePost, editPost } from '@/actions';
import prisma from '@/prisma/client';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ slug: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { slug } = await params;
	const post = await prisma.post.findUnique({ where: { slug } });

	if (!post) {
		notFound();
	}

	const editPostById = editPost.bind(null, post?.id || '');
	const deletePostById = deletePost.bind(null, post?.id || '');

	return (
		<div>
			<div>
				<div className='mb-12 md:mb-24'>
					<h1 className='text-2xl md:text-4xl font-medium mb-2 md:mb-6'>{post?.title}</h1>
					<p className='text-xl md:text-2xl'>{post?.content}</p>
				</div>
			</div>
			<form action={editPostById} className='flex flex-col gap-2 max-w-2xl mx-auto'>
				<input
					className='bg-white/30 px-2 py-1 rounded-sm'
					placeholder='Title'
					name='title'
					defaultValue={post?.title}
				/>
				<textarea
					className='bg-white/30 px-2 py-1 rounded-sm'
					placeholder='Content'
					name='content'
					defaultValue={post?.content}
				/>
				<div className='flex items-center justify-between py-4 gap-6'>
					<button
						className='flex items-center justify-center px-4 py-2 rounded-md bg-white/40 transition-colors hover:bg-white/30 uppercase w-full'
						formAction={deletePostById}>
						delete
					</button>
					<button className='flex items-center justify-center px-4 py-2 rounded-md bg-white/40 transition-colors hover:bg-white/30 uppercase w-full'>
						edit post
					</button>
				</div>
			</form>
		</div>
	);
};

export default Page;
