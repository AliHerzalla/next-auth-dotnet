import CheckAuthHelper from "@/helpers/CheckAuthHelper";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
// https://localhost:7223/api/Auth/get/user?userId=gfdg
const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className={"text-6xl font-medium text-center h-full"}>
      Hello And Welcome Back <br />
      {session?.user?.username}
      {session?.user?.role}
    </div>
  );
};

CheckAuthHelper(ProfilePage);

export default ProfilePage;
