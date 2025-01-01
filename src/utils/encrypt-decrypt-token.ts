import argon2 from "argon2";

const SECURE_PHRASE = "my-secure-phrase";

// Generate a hashed token based on the secure phrase
export const generateToken = async () => {
  try {
    const hash = await argon2.hash(SECURE_PHRASE);
    return hash;
  } catch {
    throw new Error("Error generating token");
  }
};

// Validate the token by comparing it to the secure phrase
export const validateToken = async (token: string) => {
  try {
    const isValid = await argon2.verify(token, SECURE_PHRASE);
    return isValid;
  } catch {
    return false;
  }
};
