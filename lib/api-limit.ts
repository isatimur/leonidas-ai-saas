import {auth} from "@clerk/nextjs";

import prismadb from "@/prisma/prismadb";
import {MAX_FREE_COUNTS} from "@/constants";

export const increaseApiLimit = async () => {
    const {userId} = auth();
    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {userId: userId},
            data: {count: userApiLimit.count + 1},

        })
    } else {
        await prismadb.userApiLimit.create({
            data: {userId: userId, count: 1}
        })
    }
}

export const checkApiLimit = async () => {
    const {userId} = auth();
    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS;
}

export const getApiLimitCount = async () => {

    const {userId} = auth();
    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 0;
    }
    return userApiLimit.count;
}