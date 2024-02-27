"use client";
import axios, { AxiosResponse } from "axios";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";
import PlaceOrderButton from "@/components/buttons/PlaceOrderButton";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

type ProductCardType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  createdAt: string;
};

const CartPage = () => {
  let session = useSession();

  const token = session?.data?.user?.data as string;
  const [productsDetails, setProductsDetails] = useState<any[]>([]);
  const [productsCart, setProductsCart] = useState<AxiosResponse[]>([]);
  const [productsData, setProductsData] = useState<[]>([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  const quant = productsData.map(({ quantity }) => quantity);
  const pri = productsDetails.map(({ price }) => price);

  const getProducts = useCallback(async () => {
    try {
      const productsResponse = await axios.get(
        `https://localhost:7223/get/cart/all?userId=${session?.data?.user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        }
      );

      setProductsData(productsResponse.data.data);

      const productRequests = productsResponse.data.data.map(
        ({ productId }: any) =>
          axios.get(`https://localhost:7223/get/product/${productId}`)
      );

      const productCart = await Promise.all(productRequests);

      setProductsCart(productCart);

      const productsDetails = productCart.map((response) => response.data.data);
      setProductsDetails(productsDetails);
    } catch (error) {
      console.log(error);
      redirect("/");
    }
  }, [session?.data?.user?.id, token]);

  const removeProductFromUserCart = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    try {
      await axios.delete(
        `https://localhost:7223/remove/product/cart/${id}?userId=${session?.data?.user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderPlaced = () => {
    setIsOrderPlaced(true);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts, isOrderPlaced]);

  return (
    <div>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5"
        }
      >
        {productsDetails?.map(
          (
            { id, name, description, price, image, createdAt }: ProductCardType,
            index
          ) => {
            return (
              <ProductCard
                key={index}
                id={id}
                name={name}
                description={description}
                price={price}
                image={image}
                createdAt={createdAt}
                label={"Remove Item"}
                productFunction={(event) =>
                  removeProductFromUserCart(event, id)
                }
                productsData={productsData[index]["quantity"]}
              />
            );
          }
        )}
      </div>
      {productsDetails.length > 0 && (
        <PlaceOrderButton
          quant={quant}
          pri={pri}
          onOrderPlaced={handleOrderPlaced}
        />
      )}
    </div>
  );
};

export default CartPage;
