"use client";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";

const DashboardPage = () => {
  const session = useSession();
  const token = session?.data?.user?.data as string;

  const router = useRouter();

  if (session?.data?.user?.role && session?.data?.user?.role != "Admin") {
    router.replace("/login");
  }

  const [productName, setProductName] = useState<string>("");
  const [productDesc, setProductDesc] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | string>();
  const [productImageFile, setProductImageFile] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [deletedProduct, setDeletedProduct] = useState<string>("");

  useEffect(() => {
    const areFieldsFilled =
      productName.trim().length > 0 &&
      productDesc.trim().length > 0 &&
      productImageFile.trim().length > 0 &&
      productPrice != 0;

    setIsButtonDisabled(!areFieldsFilled);
  }, [productName, productDesc, productPrice, productImageFile]);

  const createNewProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const response = await axios.post(
      "https://localhost:7223/create/product",
      {
        name: productName,
        description: productDesc,
        price: productPrice,
        image: productImageFile,
        createdAt: "2024-02-28T07:32:42.217Z",
        modeifiedAt: "2024-02-28T07:32:42.217Z",
        categoryId: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.split(" , ")[0]}`,
        },
      }
    );

    if (response.status != 400) {
      setProductName("");
      setProductDesc("");
      setProductPrice("");
      setProductImageFile("");
      setDeletedProduct("");
      alert(response.data.message);
    }
  };

  const deleteProduct = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        `https://localhost:7223/reomve/product/${deletedProduct}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.split(" , ")[0]}`,
          },
        }
      );

      if (response.status != 400) {
        setProductName("");
        setProductDesc("");
        setProductPrice("");
        setProductImageFile("");
        setDeletedProduct("");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setProductName("");
      setProductDesc("");
      setProductPrice("");
      setProductImageFile("");
      setDeletedProduct("");
      alert(error);
    }
  };

  return (
    <div className={"container mx-auto mt-2 space-y-4"}>
      <Input
        type="text"
        label="Product Name"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      <Input
        type="text"
        label="Description"
        value={productDesc}
        onChange={(event) => setProductDesc(event.target.value)}
      />
      <Input
        type="number"
        label="Price"
        value={productPrice as string}
        onChange={(event) => setProductPrice(Number(event.target.value))}
      />
      <Input
        type="file"
        value={productImageFile}
        onChange={(event) => setProductImageFile(event.target.value)}
      />

      <button
        className={
          "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
        }
        disabled={isButtonDisabled}
        onClick={createNewProduct}
      >
        Create New Product
      </button>
      <Divider className="my-4" />
      <Input
        type="text"
        label="Product Name"
        value={deletedProduct}
        onChange={(event) => setDeletedProduct(event.target.value)}
      />
      <button
        className={
          "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
        }
        disabled={deletedProduct.length > 0 ? false : true}
        onClick={deleteProduct}
      >
        Delete Product
      </button>
    </div>
  );
};

export default DashboardPage;
