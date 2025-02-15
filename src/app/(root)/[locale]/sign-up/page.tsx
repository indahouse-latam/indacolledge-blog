import {
  AuthContent,
  TokenDataType,
} from "@/modules/core/components/sign-up/AuthContent";
import { redirect } from "@/modules/translations/i18n/routing";
import { verifyInviteToken } from "@/utils/token";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

const SignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  let tokenData = null;
  const token = (await searchParams).token;

  if (token) {
    const { isValid, payload } = await verifyInviteToken(token);
    if (!isValid) {
      redirect({ href: "/invalid-token", locale: "/en" });
    }
    tokenData = payload;
  }

  return (
    <div className="flex items-center justify-center p-4 h-no-header">
      <Card shadow="md" className="w-full max-w-md relative">
        <Image
          fill
          src="/geometrical-shapes.png"
          alt="Geometrical shapes background"
        />
        <CardHeader>
          <div className="text-2xl font-bold text-center">Sign Up</div>
        </CardHeader>
        <CardBody>
          <AuthContent tokenData={tokenData as TokenDataType} />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpPage;
