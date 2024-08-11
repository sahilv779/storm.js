const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30,
            password: 'password'
        }
    });

    await prisma.post.create({
        data: {
            title: 'First Post',
            content: 'This is the first post content.',
            authorId: 1
        }
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
