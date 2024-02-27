"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

interface CartButtonProps {
  productId: number;
  label?: string;
  productFunction: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => Promise<void> | any;
}

const CartButton: React.FC<CartButtonProps> = ({
  productId,
  label,
  productFunction,
}) => {
  const session = useSession();
  const token = session?.data?.user.data as string;

  // const addProductToUserCart = async (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();

  //   try {
  //     await axios.post(
  //       `https://localhost:7223/add/product/cart`,
  //       {
  //         userId: session?.data?.user?.id,
  //         productId: productId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token?.split(" , ")[0]}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeProductFromUserCart = async (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();

  //   try {
  //     await axios.delete(
  //       `https://localhost:7223/remove/product/cart/${productId}?userId=${session?.data?.user?.id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token?.split(" , ")[0]}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Button
      color={"default"}
      onClick={(event) => productFunction(event, productId)}
    >
      {label || "Add to cart"}
    </Button>
  );
};

export default CartButton;
