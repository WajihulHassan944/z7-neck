import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Replace the bullet points with the actual API key
const resend = new Resend('re_123456789'); // Use your actual Resend API key without any special characters

// Or better yet, use an environment variable
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { orderData, email } = await request.json();
    
    if (!email || !orderData) {
      console.error('Missing required data:', { email, orderData });
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }


    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Z7 Neck Brackets - Order Confirmation #${orderData.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #044588;">Thank you for your order!</h1>
          <p>We're excited to confirm your Z7 Neck Brackets order.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #044588;">Order #${orderData.orderNumber}</h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #044588;">Order Details</h3>
              <p>Product: Z7 Neck Brackets Original</p>
              <p>Quantity: ${orderData.cartData.quantity}</p>
              <p>Price: $${orderData.cartData.total}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #044588;">Delivery Method</h3>
              <p>${orderData.deliveryMethod.method === 'standard' ? 'Standard Delivery (3-5 business days)' : 'Express Delivery (1-2 business days)'}</p>
              <p>Delivery Fee: $${orderData.deliveryMethod.price.toFixed(2)}</p>
            </div>

            <div style="margin: 20px 0; border-top: 1px solid #ddd; padding-top: 20px;">
              <h3 style="color: #044588;">Total Amount</h3>
              <p style="font-size: 1.2em; font-weight: bold;">$${(
                parseFloat(orderData.cartData.total) + 
                orderData.deliveryMethod.price
              ).toFixed(2)}</p>
            </div>
          </div>

          <p>Your order will be processed and shipped according to your selected delivery method.</p>
          <p>Questions about your order? Contact us at support@suckapunch.com</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email confirmation' },
      { status: 500 }
    );
  }
} 