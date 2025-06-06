import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  resetLink?: string;
}

export default function ResetPasswordEmail({
  resetLink = "https://example.com/reset-password",
}: ResetPasswordEmailProps) {
  
  return (
    <Html>
      <Head />
      <Preview>Z7 Neck Brackets Password Reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logo}>Z7 Neck Brackets</Text>
          </Section>
          <Section style={contentSection}>
            <Heading style={h1}>Reset your password</Heading>
            <Text style={mainText}>
              {`You've requested to reset your password for your Z7 Neck Brackets account. Click the button below to set a new password. If you didn't request this, you can safely ignore this email.`}
            </Text>
            <Section style={buttonSection}>
              <Button
                style={button}
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text style={validityText}>(This link is valid for 1 hour)</Text>
            <Hr style={hr} />
            <Text style={footerText}>
              {`If the button above doesn't work, copy and paste this link into your browser:`}
            </Text>
            <Text style={linkText}>{resetLink}</Text>
          </Section>
          <Section style={footerSection}>
            <Text style={footerContent}>
              © {new Date().getFullYear()} Z7 Neck Brackets. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoSection = {
  padding: "20px 30px",
  backgroundColor: "#044588",
};

const logo = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
  textDecoration: "none",
};

const contentSection = {
  padding: "40px 30px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const mainText = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#044588",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "12px",
  paddingBottom: "12px",
};

const validityText = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footerText = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "22px",
  marginBottom: "10px",
};

const linkText = {
  color: "#044588",
  fontSize: "14px",
  lineHeight: "22px",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const footerSection = {
  padding: "0 30px",
  textAlign: "center" as const,
};

const footerContent = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  marginBottom: "10px",
}; 