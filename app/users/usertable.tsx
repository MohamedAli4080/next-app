import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";

interface Users {
  id: number;
  name: string;
  email: string;
}

interface props {
  sortOrder?: string;
}

const UserTable = async ({ sortOrder }: props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: Users[] = await res.json();
  const sortedUser = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="mb-4 flex justify-start">
          <Link href="/users/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
              Add New User
            </button>
          </Link>
        </div>

        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <Link
                  href="/users?sortOrder=name"
                  className="text-blue-600  flex items-center gap-1"
                >
                  Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </Link>
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <Link
                  href="/users?sortOrder=email"
                  className="text-blue-600  flex items-center gap-1"
                >
                  Email
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUser.map((user, idx) => (
              <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
