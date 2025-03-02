import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const BuyCarButton = ({ carId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCarHandler = async () => {
    await createCheckoutSession(carId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to stripe checkout url
      } else {
        toast.error("Invalid response from server.")
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session")
    }
  }, [data, isSuccess, isError, error])

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCarHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Car"
      )}
    </Button>
  );
};

export default BuyCarButton;
