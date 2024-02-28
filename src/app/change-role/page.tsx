"use client";
import { Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ChangeRolePage = () => {
  const session = useSession();
  const token = session?.data?.user?.data as string;

  const router = useRouter();

  if (session?.data?.user?.role && session?.data?.user?.role != "Admin") {
    router.replace("/login");
  }

  const [userName, setUserName] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [deletedRole, setDeletedRole] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const areFieldsFilled: boolean =
      userName.trim().length > 0 && roleName.trim().length > 0;
    setIsButtonDisabled(!areFieldsFilled);
  }, [userName, roleName]);

  const assignRoleToUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const response = await axios.put(
      `https://localhost:7223/api/Roles/update-role?RoleName=${roleName}&UserName=${userName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.split(" , ")[0]}`,
        },
      }
    );

    if (response.status != 400) {
      setUserName("");
      setRoleName("");
      setNewRole("");
      setDeletedRole("");
      alert(response.data);
    }
  };

  const deleteRole = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const response = await axios.delete(
      `https://localhost:7223/api/Roles/delete-role?RoleName=${deletedRole}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.split(" , ")[0]}`,
        },
      }
    );
    console.log(response);

    if (response.status != 400) {
      setUserName("");
      setRoleName("");
      setNewRole("");
      setDeletedRole("");
      alert(response.data);
    }
  };

  const createNewRole = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const response = await axios.post(
      `https://localhost:7223/api/Roles/create-role?RoleName=${newRole}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.split(" , ")[0]}`,
        },
      }
    );

    if (response.status != 400) {
      setUserName("");
      setRoleName("");
      setNewRole("");
      setDeletedRole("");
      alert(response.data);
    }
  };

  return (
    <div className={"container mx-auto mt-2 space-y-4"}>
      <div className={"container mx-auto mt-2 space-y-4"}>
        <Input
          type="text"
          label="UserName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <Input
          type="text"
          label="Role Name"
          value={roleName}
          onChange={(event) => setRoleName(event.target.value)}
        />
        <button
          className={
            "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
          }
          disabled={isButtonDisabled}
          onClick={assignRoleToUser}
        >
          Change User Role
        </button>
      </div>
      <Divider className="my-4" />
      <div className={"container mx-auto mt-2 space-y-4"}>
        <Input
          type="text"
          label="Delete Role"
          value={deletedRole as string}
          onChange={(event) => setDeletedRole(event.target.value)}
        />
        <button
          className={
            "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
          }
          disabled={deletedRole.length > 0 ? false : true}
          onClick={deleteRole}
        >
          Delete Role
        </button>
      </div>
      <Divider className="my-4" />
      <div className={"container mx-auto mt-2 space-y-4"}>
        <Input
          type="text"
          label="New Role"
          value={newRole as string}
          onChange={(event) => setNewRole(event.target.value)}
        />
        <button
          className={
            "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
          }
          disabled={newRole.length > 0 ? false : true}
          onClick={createNewRole}
        >
          Create New Role
        </button>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

export default ChangeRolePage;
