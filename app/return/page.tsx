import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function Return({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
      <Card className="max-w-lg">
        <CardContent className="justify-center text-center">
          <CardHeader>
            <ShoppingBag className="h-14 w-14 text-green-500 p-2 mx-auto" />
            <CardTitle>Assinatura confirmada</CardTitle>
          </CardHeader>
          <div className="flex flex-col text-gray-800">
            Nós agradecemos sua compra! Um email de confirmação será enviado
            para {customerEmail}.
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "default" }), "mt-4")}
            >
              Ir para a Dashboard
            </Link>
          </div>
        </CardContent>
        </Card>
      </div>
    );
  }
}
