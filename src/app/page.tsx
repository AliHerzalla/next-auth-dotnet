import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function App() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className={"text-6xl font-medium text-center h-full"}>
        Welcome To E-commerce App
      </h1>
      {!session && (
        <h1 className={"text-6xl font-medium text-center h-full"}>
          Login to buy
        </h1>
      )}
    </div>
  );
}
