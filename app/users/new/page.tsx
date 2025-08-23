"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NewUser = () => {
  const router = useRouter();

  return (
    <div>
      <div>Create new user</div>
      <button
        className="mt-4  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        onClick={() => router.push("/users")}
      >
        Back to Users
      </button>
    </div>
  );
};

export default NewUser;
