import react, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return (
    <div className="flex">
      <aside className="bg-sky-200 p-5 mr-5 ">this asside</aside>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
