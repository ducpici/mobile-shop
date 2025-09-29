import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

interface BreadCrumbProps {
  link: string;
  name?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ link, name }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center">
        <li>
          <Link href="/" className="ml-2 flex items-center">
            <House size={20} className="mr-1 inline-block" />
            Shop
          </Link>
        </li>
        {name && <span className="mx-2">/</span>}
        <li>
          <Link href={link} className="">
            {name}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
