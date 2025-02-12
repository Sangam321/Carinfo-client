import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const BuyCarButton = ({ carId }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const purchaseCarHandler = async () => {
    setIsLoading(true);
    try {
      // Simulate a frontend action, such as opening a modal or redirecting
      setTimeout(() => {
        toast.success("Redirecting to checkout...");
        // Example of a frontend-only redirect:
        window.location.href = `/checkout/${carId}`;
      }, 1000);
    } catch (error) {
      toast.error("Failed to process the purchase.");
    } finally {
      setIsLoading(false);
    }
  };

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
