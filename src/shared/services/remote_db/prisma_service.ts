import { PrismaClient } from "@/shared/database/prisma/generated/client";

const prisma = new PrismaClient({
    accelerateUrl: process.env["NEXT_PRISMA_DIRECT_URL"]!,
    log: [{ level: "error", emit: "event" }],
});

prisma.$on("error", (e) => {
    console.error("Prisma Error:", e);
});

export default prisma