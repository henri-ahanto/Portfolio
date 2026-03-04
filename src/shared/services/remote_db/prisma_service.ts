import { PrismaClient } from "@/shared/database/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.NEXT_PRISMA_SUPABASE_DB_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: [{ level: "error", emit: "event" }],
});

prisma.$on("error", (e) => {
    console.error("Prisma Error:", e);
});

export default prisma