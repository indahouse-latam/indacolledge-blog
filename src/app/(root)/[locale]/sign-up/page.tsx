import { AuthContent } from "@/modules/core/components/sign-up/AuthContent";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

const SignUpPage = async () => {
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
          <AuthContent />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpPage;
