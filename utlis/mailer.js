import User from "@/models/user";
import bcrypt from "bcrypt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, userId }) => {
  try {
    // Create a Hashed Token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000,
    });

    const mailResponse = await resend.emails.send({
      from: "Flavorify <info@mytechsol.com>",
      to: email,
      subject: "Verify Your Email",
      react: (
        <p>
          Click{" "}
          <a
            href={`${process.env.NEXTAUTH_URL}pages/verifyEmail?token=${hashedToken}`}
          >
            Here
          </a>{" "}
          to verify the user or copy and paste this {process.env.NEXTAUTH_URL}
          pages/verifyEmail?token={hashedToken} into your Browser
        </p>
      ),
    });

    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
