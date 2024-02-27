import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type CheckAuthHelperType = (PageComponent: any) => void;

const CheckAuthHelper: CheckAuthHelperType = async (PageComponent) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.data;
  if (!session) {
    redirect("/login");
  } else {
    return <PageComponent />;
  }
};

export default CheckAuthHelper;
