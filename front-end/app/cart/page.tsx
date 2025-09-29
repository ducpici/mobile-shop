import React from "react";
import BreadCrumb from "@/components/Breadcrumb";

const page = () => {
  return (
    <div>
      <BreadCrumb link="/cart" name="Cart" />
      Cart Page
    </div>
  );
};

export default page;
