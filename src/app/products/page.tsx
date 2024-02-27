"use client";
import axios, { AxiosResponse } from "axios";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";
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

const ProductsPage = () => {
  const session = useSession();

  const token = session?.data?.user.data as string;
  const [products, setProducts] = useState<AxiosResponse>();

  const getProducts = useCallback(async () => {
    try {
      axios
        .get("https://localhost:7223/get/product", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        })
        .then((response) => setProducts(response));
    } catch (error) {
      console.log(error);
      redirect("/");
    }
  }, [token]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProductToUserCart = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    try {
      await axios.post(
        `https://localhost:7223/add/product/cart`,
        {
          userId: session?.data?.user?.id,
          productId: id,
        },
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

  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5"
      }
    >
      {products?.data?.success &&
        products?.data?.data.map(
          ({
            id,
            name,
            description,
            price,
            image,
            createdAt,
          }: ProductCardType) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              description={description}
              price={price}
              image={image}
              createdAt={createdAt}
              productFunction={(event) => addProductToUserCart(event, id)}
              label={"Add Item"}
            />
          )
        )}
    </div>
  );
};

export default ProductsPage;
