import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import CartButton from "./buttons/CartButton";

type ProductCardType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  createdAt: string;
  label?: string;
  productFunction: (
    event: React.MouseEvent<HTMLButtonElement>,
    id?: number,
    ...args: any
  ) => Promise<void> | any;
  productsData?: string | "";
};

const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  createdAt,
  label,
  productFunction,
  productsData,
}: ProductCardType) => {
  return (
    <Card className="py-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="uppercase font-bold text-large">{name}</p>
        <small className="text-default-500">${price}</small>
        <h4 className="font-bold text-tiny">{description}</h4>
        {productsData && (
          <h4 className="font-bold text-tiny">{productsData} items</h4>
        )}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image || ""}
          width={270}
        />
      </CardBody>
      <CardFooter className={"flex justify-between"}>
        {`${new Date(createdAt).getDay()}/${new Date(
          createdAt
        ).getMonth()}/${new Date(createdAt).getFullYear()}`}{" "}
        <CartButton
          productId={id}
          label={label}
          productFunction={(event) => productFunction(event, id)}
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
