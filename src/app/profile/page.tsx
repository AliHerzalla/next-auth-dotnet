import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className={"text-6xl font-medium text-center h-full"}>
      Hello And Welcome Back {session?.user.id}
    </div>
  );
};

export default ProfilePage;
