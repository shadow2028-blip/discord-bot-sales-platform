import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@services/stripeService';
import { iyzicoService } from '@services/iyzicoService';
import type { CartItem } from '@types/index';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, paymentMethod, items, userEmail, userId } = body;

    if (!amount || !currency || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const cartItems: CartItem[] = items || [];

    if (paymentMethod === 'stripe') {
      // Stripe payment processing
      const result = await stripeService.createPaymentIntent({
        amount,
        currency,
        userEmail: userEmail || 'customer@example.com',
        userId: userId || 'anonymous',
        cartItems,
        metadata: {
          itemsCount: items?.length.toString() || '0',
        },
      });

      if (result.success) {
        return NextResponse.json({
          success: true,
          paymentIntentId: result.paymentIntentId,
          clientSecret: result.clientSecret,
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
    } else if (paymentMethod === 'iyzico') {
      // iyzico payment processing
      const result = await iyzicoService.createPayment({
        amount,
        currency,
        userEmail: userEmail || 'customer@example.com',
        userId: userId || 'anonymous',
        cartItems,
      });

      if (result.success) {
        return NextResponse.json({
          success: true,
          paymentId: result.paymentIntentId,
          checkoutFormUrl: result.redirectUrl,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
