import Stripe from 'stripe';
import type { PaymentIntentPayload, PaymentResult } from '@types/index';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing Stripe secret key in environment variables');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export const stripeService = {
  async createPaymentIntent(
    payload: PaymentIntentPayload
  ): Promise<PaymentResult> {
    try {
      const amountInCents = Math.round(payload.amount * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: payload.currency.toLowerCase(),
        description: `Purchase of ${payload.cartItems.length} Discord bot(s)`,
        receipt_email: payload.userEmail,
        metadata: {
          userId: payload.userId,
          cartItemsCount: payload.cartItems.length.toString(),
          ...payload.metadata,
        },
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error: any) {
      console.error('Stripe payment intent error:', error);
      return {
        success: false,
        error: error.message || 'Failed to create payment intent',
      };
    }
  },

  async confirmPaymentIntent(
    paymentIntentId: string
  ): Promise<{ success: boolean; status?: string; error?: string }> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      return {
        success: paymentIntent.status === 'succeeded',
        status: paymentIntent.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to confirm payment intent',
      };
    }
  },

  async refundPayment(
    paymentIntentId: string,
    amount?: number
  ): Promise<{ success: boolean; refundId?: string; error?: string }> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });

      return {
        success: refund.status === 'succeeded',
        refundId: refund.id,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to refund payment',
      };
    }
  },

  async constructWebhookEvent(
    body: string | Buffer,
    sig: string
  ): Promise<Stripe.Event | null> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Missing Stripe webhook secret');
    }

    try {
      const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      return event;
    } catch (error: any) {
      console.error('Webhook signature verification failed:', error);
      return null;
    }
  },
};
