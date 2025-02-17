import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND);

export const sendInvitationEmail = async ({
  email,
  token,
  role,
  locale,
}: {
  email: string;
  token: string;
  role: string;
  locale: string;
}) => {
  const emailHtml = `
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <img src="https://indahouse.com.co/wp-content/uploads/2024/06/Capa_1-3-1024x183.png" alt="Indahouse Logo" style="width: 150px; height: auto; margin: 0 auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <h1 style="color: #2E294E; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">
                Team Invitation
              </h1>
              <p style="color: #4A4A4A; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                You have been invited to join indacolledge as ${role}!
              </p>
              <table role="presentation" style="margin: 30px auto;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/sign-up?token=${token}"
                       style="background-color: #2E294E;
                              color: white;
                              padding: 14px 32px;
                              text-decoration: none;
                              border-radius: 6px;
                              font-weight: 500;
                              display: inline-block;
                              font-size: 16px;
                              transition: background-color 0.3s ease;">
                      Accept Invitation & Sign Up
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #4A4A4A; font-size: 14px; line-height: 20px; margin: 0 0 10px 0;">
                This invitation link will expire in 24 hours.
              </p>
              <p style="color: #666; font-size: 14px; line-height: 20px; margin: 0;">
                If you did not expect this invitation, please ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; line-height: 18px; margin: 0; text-align: center;">
                © 2025 Indahouse. All rights reserved.<br>
                La primera bolsa de rentas inmobiliarias en Europa
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `;

  try {
    await resend.emails.send({
      from: "info@indahouse.com.co",
      to: email,
      subject: `Invitation to join indacolledge platform`,
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send invitation email");
  }
};
