import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const locale = await getCurrentLocale();
  const { billingPage } = await getTrans(locale);
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">{billingPage.billing}</h1>
      <p>
        {billingPage.yourCurrentPlan}:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              {billingPage.canceledSubscription}{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton translation={billingPage} />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
