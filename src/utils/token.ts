import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export const generateInviteToken = async ({
  generatedToken,
  email,
  role,
}: {
  generatedToken: string;
  email: string;
  role: string;
}) => {
  const token = await new SignJWT({ email, role, generatedToken })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  return token;
};

export const verifyInviteToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      isValid: true,
      payload: payload,
    };
  } catch {
    return { isValid: false, payload: null };
  }
};
