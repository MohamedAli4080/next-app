import React from "react";

interface ProductPageProps {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: ProductPageProps) => {
  return (
    <div>
      paramter ProductPage {slug.join("/")}
      search parmas is {sortOrder}
    </div>
  );
};

export default ProductPage;
