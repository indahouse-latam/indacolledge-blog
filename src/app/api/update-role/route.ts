"use server";

import { auth } from "@/modules/auth/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth();

    const googleId = session?.id;

    const { intendedRole } = req.body;
    await writeClient
      .patch(googleId as string)
      .set({ role: intendedRole })
      .commit();
    return res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
