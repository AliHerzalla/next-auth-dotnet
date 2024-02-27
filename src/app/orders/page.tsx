"use client";
import ProductCard from "@/components/ProductCard";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type ProductCardType = {
  id: number;
  name: string;
  description: string;
  image: string;
  totalPrice: number;
  createdAt: string;
};

const OrdersPage = () => {
  const session = useSession();
  const token = session?.data?.user.data as string;
  const [products, setProducts] = useState<AxiosResponse>();
  const [orderProducts, setOrderProducts] = useState<AxiosResponse[]>([]);
  const [productsItems, setProductsItems] = useState<AxiosResponse[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProducts = useCallback(async () => {
    try {
      axios
        .get(
          `https://localhost:7223/get/user/order/${session?.data?.user?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token?.split(" , ")[0]}`,
            },
          }
        )
        .then((response) => setProducts(response));
    } catch (error) {
      console.log(error);
      redirect("/");
    }
  }, [session?.data?.user?.id, token]);

  const removeOrderProduct = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      axios
        .delete(`https://localhost:7223/remove/product/order/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        })
        .then(() => getProducts());
    },
    [getProducts, token]
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

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5"
      }
    >
      {products?.data?.success &&
        products?.data?.data.map(
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
  );
};

export default OrdersPage;
