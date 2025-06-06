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
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderDate: string;
}

export default function OrderConfirmationEmail({
  orderNumber = "SP-12345",
  customerName = "John Doe",
  items = [
    { name: "Product 1", quantity: 1, price: 19.99 },
    { name: "Product 2", quantity: 2, price: 29.99 },
  ],
  subtotal = 79.97,
  shipping = 5.99,
  total = 85.96,
  shippingAddress = {
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "Anytown",
    state: "ST",
    postalCode: "12345",
    country: "United States",
  },
  orderDate = new Date().toLocaleDateString(),
}: OrderConfirmationEmailProps) {
  
  return (
    <Html>
      <Head />
      <Preview>Your Z7 Neck Brackets Order Confirmation - Order #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logo}>Z7 Neck Brackets</Text>
          </Section>
          <Section style={contentSection}>
            <Heading style={h1}>Order Confirmation</Heading>
            <Text style={mainText}>
              Hi {customerName},
            </Text>
            <Text style={mainText}>
              {`Thank you for your order! We've received your order and are processing it now.`}
            </Text>
            <Text style={orderInfo}>
              <strong>Order Number:</strong> {orderNumber}<br />
              <strong>Order Date:</strong> {orderDate}
            </Text>

            <Hr style={hr} />
            
            <Heading style={h2}>Order Summary</Heading>
            
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemColumn}>
                  <Text style={itemText}>
                    {item.name} x {item.quantity}
                  </Text>
                </Column>
                <Column style={priceColumn}>
                  <Text style={priceText}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
            
            <Hr style={hr} />
            
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>Subtotal:</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>Shipping:</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>${shipping.toFixed(2)}</Text>
              </Column>
            </Row>
            
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}><strong>Total:</strong></Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}><strong>${total.toFixed(2)}</strong></Text>
              </Column>
            </Row>
            
            <Hr style={hr} />
            
            <Heading style={h2}>Shipping Information</Heading>
            <Text style={addressText}>
              {shippingAddress.line1}<br />
              {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}<br />
              {shippingAddress.country}
            </Text>
            
            <Hr style={hr} />
            
            <Text style={footerText}>
              If you have any questions about your order, please contact our customer service team.
            </Text>
            
            <Section style={buttonSection}>
              <Button
                style={button}
                href="https://example.com/my-account"
              >
                View Order Status
              </Button>
            </Section>
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
  backgroundColor: "#EF1F24",
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

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};

const mainText = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
};

const orderInfo = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "15px 0",
};

const itemRow = {
  margin: "5px 0",
};

const itemColumn = {
  width: "70%",
};

const priceColumn = {
  width: "30%",
  textAlign: "right" as const,
};

const itemText = {
  color: "#525f7f",
  fontSize: "14px",
  margin: "5px 0",
};

const priceText = {
  color: "#525f7f",
  fontSize: "14px",
  margin: "5px 0",
  textAlign: "right" as const,
};

const totalRow = {
  margin: "2px 0",
};

const totalLabelColumn = {
  width: "70%",
};

const totalValueColumn = {
  width: "30%",
  textAlign: "right" as const,
};

const totalLabel = {
  color: "#525f7f",
  fontSize: "14px",
  margin: "5px 0",
};

const totalValue = {
  color: "#525f7f",
  fontSize: "14px",
  margin: "5px 0",
  textAlign: "right" as const,
};

const addressText = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "5px 0 15px",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0 0",
};

const button = {
  backgroundColor: "#EF1F24",
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

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footerText = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "20px",
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