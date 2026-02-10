import { Request, Response } from "express";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    // ✅ TYPE GUARD — THIS IS THE KEY
    if (!("user" in result)) {
      return res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }

    // ✅ SUCCESS PATH (TypeScript now knows result.user exists)
    await prisma.user.update({
      where: { id: result.user.id },
      data: { emailVerified: true },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
