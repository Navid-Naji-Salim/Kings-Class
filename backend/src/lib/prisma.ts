import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/index";
import { env } from "../config/env.js";

const adapter = new PrismaPg({ connectionString: env.APP_DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
