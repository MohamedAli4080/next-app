import Link from "next/link";
import React from "react";

const NavBar = () => {
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
    </nav>
  );
};

export default NavBar;
