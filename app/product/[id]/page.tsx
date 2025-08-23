import React from "react";

const ProductPage = ({ params }: { params: { id: string } }) => {
  return <div> paramter ProductPage {params.id}</div>;
};

export default ProductPage;
