import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/requireAuth.js";
import { getUserById, loginAdmin } from "./auth.service.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Enter a valid email and password." });
    }

    const result = await loginAdmin(parsed.data.email, parsed.data.password);

    if (!result) {
      return res.status(401).json({ message: "The admin credentials are not correct." });
    }

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Session is no longer valid." });
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});
