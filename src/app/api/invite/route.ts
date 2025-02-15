import { inviteSchema } from "@/lib/schemas/invite-author";
import { generateInviteToken } from "@/utils/token";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import { SECURE_PHRASE } from "@/modules/common/constants";
import { sendInvitationEmail } from "@/utils/invitation-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = inviteSchema.parse(body);

    const generatedToken = await argon2.hash(SECURE_PHRASE!);

    if (generatedToken) {
      const token = await generateInviteToken({
        generatedToken,
        email: validatedData.email,
        role: validatedData.role,
      });

      await sendInvitationEmail({
        email: validatedData.email,
        role: validatedData.role,
        token,
        locale: validatedData.locale!,
      });

      return NextResponse.json({
        success: true,
        message: "Invitation sent successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Error generating token." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    );
  }
}
