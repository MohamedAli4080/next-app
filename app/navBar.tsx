"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="bg-amber-200 px-4 py-3 flex items-center gap-6 shadow">
      <Link
        href="/"
        className="font-bold text-lg text-gray-800 hover:text-sky-700"
      >
        Home
      </Link>
      <Link href="/users" className="text-gray-700 hover:text-sky-700">
        Users
      </Link>
      <Link href="/admin" className="text-gray-700 hover:text-sky-700">
        Admin
      </Link>
      <Link href="/product" className="text-gray-700 hover:text-sky-700">
        Products
      </Link>
      {status === "loading" && (
        <span className="text-gray-700">Loading...</span>
      )}
      {status === "authenticated" && (
        <Link
          href="api/auth/signout"
          className="text-gray-700 hover:text-sky-700"
        >
          Logout {session?.user?.name}
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link
          href="api/auth/signin"
          className="text-gray-700 hover:text-sky-700"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
