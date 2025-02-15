import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { SECURE_PHRASE } from "@/modules/common/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, token } = body;

    if (action === "generate") {
      // Generate token
      const generatedToken = await argon2.hash(SECURE_PHRASE!);
      return NextResponse.json({ token: generatedToken });
    } else if (action === "validate") {
      // Validate token
      const isValid = await argon2.verify(token, SECURE_PHRASE!);
      return NextResponse.json({ isValid });
    } else {
      return NextResponse.json(
        { error: "Invalid action. Use 'generate' or 'validate'." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
