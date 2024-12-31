import { createPost } from '@/actions';
import prisma from '@/prisma/client';
import { NextPage } from 'next';
import Link from 'next/link';

const Page: NextPage = async () => {
	const posts = await prisma.post.findMany();
	const postsCount = await prisma.post.count();
	const hasPosts = postsCount > 0;

	return (
		<div>
			{hasPosts ? (
				<>
					<h1 className='text-4xl font-medium text-center mb-12'>All Posts ({postsCount})</h1>
					<ul className='py-5 border-y border-white/10 space-y-1 mb-12'>
						{posts.map(({ id, slug, title, content }) => (
							<li
								key={id}
								className='flex items-center justify-between px-5 rounded-lg transition-colors hover:bg-white/5 py-2'>
								<Link href={`/posts/${slug}`} className='w-full'>
									<h2 className='text-2xl font-medium mb-2'>{title}</h2>
									<p className='text-lg'>{content}</p>
								</Link>
							</li>
						))}
					</ul>
				</>
			) : (
				<div className='py-8'>
					<p className='text-4xl font-medium text-center'>No posts</p>
				</div>
			)}
			<form action={createPost} className='flex flex-col gap-2 max-w-2xl mx-auto'>
				<input className='bg-white/30 px-2 py-1 rounded-sm' placeholder='Title' name='title' />
				<textarea className='bg-white/30 px-2 py-1 rounded-sm' placeholder='Content' name='content' />
				<div className='flex items-center justify-center py-4'>
					<button className='flex items-center justify-center px-4 py-1 rounded-sm bg-white/40 transition-colors hover:bg-white/30'>
						create post
					</button>
				</div>
			</form>
		</div>
	);
};

export default Page;
