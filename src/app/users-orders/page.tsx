"use client";
import { Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios, { AxiosResponse } from "axios";

type ProductCardType = {
  id: number;
  name: string;
  description: string;
  image: string;
  totalPrice: number;
  createdAt: string;
};

const UsersOrdersPage = () => {
  const session = useSession();
  const token = session?.data?.user?.data as string;

  const [username, setUsername] = useState<string>("");
  const [allOrders, setAllOrders] = useState<AxiosResponse>();
  const [orderProducts, setOrderProducts] = useState<AxiosResponse[]>([]);
  const [productsItems, setProductsItems] = useState<AxiosResponse[]>([]);

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session?.data?.user?.role && session?.data?.user?.role != "Admin") {
    router.replace("/login");
  }

  const getUserOrders = useCallback(
    async (event?: React.MouseEvent<HTMLButtonElement>) => {
      try {
        axios
          .get(`https://localhost:7223/get/all/${username}`, {})
          .then((response) => setAllOrders(response));
      } catch (error) {
        console.log(error);
      }
    },
    [username]
  );

  const removeOrderProduct = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      try {
        axios
          .delete(`https://localhost:7223/remove/product/order/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token?.split(" , ")[0]}`,
            },
          })
          .then(() => getUserOrders());
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
    [getUserOrders, token]
  );

  const showProductsOrderDetails = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    try {
      await axios
        .get(`https://localhost:7223/get/product/order/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        })
        .then((response) => setOrderProducts(response?.data?.data));

      const pro = orderProducts?.map(({ productId }: any) => {
        return axios.get(`https://localhost:7223/get/product/${productId}`);
      });

      const product = await Promise.all(pro);
      setProductsItems(product);
      if (productsItems?.length > 0) {
        onOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"container mx-auto mt-2 space-y-4"}>
      <Input
        type="text"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button
        className={
          "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
        }
        disabled={username.length > 0 ? false : true}
        onClick={getUserOrders}
      >
        Show User Orders
      </button>
      <Divider className={"my-4"} />
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5"
        }
      >
        {allOrders?.data?.data?.length > 0 ? (
          allOrders?.data?.data?.map(
            ({ id, totalPrice, createdAt }: ProductCardType, index: number) => {
              return (
                <div key={id} className={"relative"}>
                  <button
                    className={
                      "absolute top-1 right-1 rounded-full bg-white z-50 text-center text-black font-extrabold h-5 w-5"
                    }
                    onClick={(event) => removeOrderProduct(event, id)}
                  >
                    X
                  </button>
                  <ProductCard
                    key={id}
                    id={id}
                    name={`Order number ${index + 1}`}
                    description={""}
                    price={totalPrice}
                    image={""}
                    createdAt={createdAt}
                    productFunction={(event) =>
                      showProductsOrderDetails(event, id)
                    }
                    label={"More details"}
                  />
                </div>
              );
            }
          )
        ) : (
          <div>
            <h1>There are no orders for {username}</h1>
          </div>
        )}
        {isOpen && (
          <>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Modal Title
                    </ModalHeader>
                    <ModalBody>
                      {productsItems?.map((item) => {
                        const { name, price, description } = item?.data?.data;
                        return (
                          <div key={name} className={"border-b-1"}>
                            <h1>{name}</h1>
                            <p>{price}</p>
                            <p>{description}</p>
                          </div>
                        );
                      })}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Ok
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersOrdersPage;
