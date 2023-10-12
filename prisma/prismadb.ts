const {PrismaClient} = require('@prisma/client')

declare global {
    var prisma: typeof PrismaClient | undefined;
}


const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = prismadb;

export default prismadb;