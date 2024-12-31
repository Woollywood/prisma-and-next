import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

const initialPosts = [
	{
		title: 'Post 1',
		slug: 'post-1',
		content: 'Content of post 1',
	},
];

async function main() {
	console.log('Start seeding...');
	for (const post of initialPosts) {
		await prisma.post.create({
			data: post,
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
