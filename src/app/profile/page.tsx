import CheckAuthHelper from "@/helpers/CheckAuthHelper";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
// https://localhost:7223/api/Auth/get/user?userId=gfdg
const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user?.role == "Admin") {
    return (
      <div className={"text-6xl font-medium text-center h-full"}>
        <h1>
          Hello And Welcome Back Admin {session?.user?.username} <br /> You Can
          Add New Product And Change User Role
        </h1>
      </div>
    );
  }

  return (
    <div className={"text-6xl font-medium text-center h-full"}>
      Hello And Welcome Back <br />
      {session?.user?.username}
    </div>
  );
};

CheckAuthHelper(ProfilePage);

export default ProfilePage;
