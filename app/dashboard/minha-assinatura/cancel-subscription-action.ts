'use server';

import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

export default async function cancelSubscriptionAction(formData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const subscriptionId = formData.get("subscriptionId") as string;

  await stripe.subscriptions.cancel(subscriptionId);

  revalidatePath("/dashboard/minha-assinatura");
}