import { AES, enc } from "crypto-js";

const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-secure-key";

export const encryptData = (data: string): string => {
  return AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(enc.Utf8);
};
