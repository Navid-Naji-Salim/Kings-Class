import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import type { AuthUser } from "../../types/auth.js";

const toAuthUser = (user: {
  id: string;
  email: string;
  name: string;
  role: "ADMIN";
}): AuthUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role
});

export async function loginAdmin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  const authUser = toAuthUser(user);
  const signOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
  const token = jwt.sign(authUser, env.JWT_SECRET, signOptions);

  return { token, user: authUser };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toAuthUser(user) : null;
}
