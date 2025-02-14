"use server";

import { auth } from "@/modules/auth/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const googleId = session.id;
    const response = await writeClient
      .patch(googleId)
      .set({ role: "publisher" })
      .commit();

    return NextResponse.json({ user: response }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
