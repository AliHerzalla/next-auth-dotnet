"use client";

import axios from "axios";
import { useSession } from "next-auth/react";

const PlaceOrderButton = ({ quant, pri, onOrderPlaced }: any) => {
  const session = useSession();
  const token = session?.data?.user.data as string;

  let total = 0;
  pri.map((p: number, index: number) => {
    total += p * quant[index];
  });

  async function placeNewOrder(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      axios
        .post(
          "https://localhost:7223/create/product/order",
          {
            userId: session?.data?.user?.id,
            totalPrice: total,
            status: "Ordered",
            createdAt: "2024-02-26T12:54:46.961Z",
            modifiedAt: "2024-02-26T12:54:46.961Z",
          },
          {
            headers: {
              Authorization: `Bearer ${token?.split(" , ")[0]}`,
            },
          }
        )
        .then(() => {
          onOrderPlaced();
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className={
        "absolute bottom-0 right-5 py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
      }
      onClick={placeNewOrder}
    >
      Place Order
    </button>
  );
};

export default PlaceOrderButton;
