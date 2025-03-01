"use client";

import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "./actions";
type Translation  ={
  somethingWentWrong: string;
  manageSubscription: string;
  canceledSubscription: string;
  billing: string;
  yourCurrentPlan: string;
}
export default function ManageSubscriptionButton(translation:any|Translation) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: `${translation.somethingWentWrong}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      {translation.manageSubscription}
    </LoadingButton>
  );
}