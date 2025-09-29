import React from "react";
import BreadCrumb from "@/components/Breadcrumb";
const page = () => {
  return (
    <div>
      <BreadCrumb link="/profile" name="Profile" />
      Profile Page
    </div>
  );
};

export default page;
