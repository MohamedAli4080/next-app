import React, { Suspense } from "react";
import Link from "next/link";
import UserTable from "./usertable";
import Loading from "../loading";

interface props {
  searchParams: {
    sortOrder: string;
  };
}

const UserPage = async ({ searchParams }: props) => {
  const params = await searchParams;
  console.log(params.sortOrder);
  return (
    <>
      <h1>User Page</h1>
      <Suspense fallback={<Loading />}>
        <UserTable sortOrder={params.sortOrder} />
      </Suspense>
    </>
  );
};

export default UserPage;
