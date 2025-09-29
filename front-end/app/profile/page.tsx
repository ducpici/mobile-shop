"use client";
import { useState } from "react";
import React from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { UserPen, CircleX, Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal";
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    name: "Phạm Công Đức",
    email: "phamcongducx8@gmail.com",
    avatar: "/images/user.png",
    dob: "2003-11-30",
    sex: 1,
    companyAddress: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
    homeAddress: "Triều Khúc, Thanh Xuân, Hà Nội",
  };
  return (
    <div>
      <BreadCrumb link="/profile" name="Profile" />
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
          <button
            className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <UserPen className="" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <Image
            src="/images/user.png"
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-6 text-sm">
          <div className="flex items-center">
            <span className="w-40 font-medium">Date of birth:</span>
            <div className="flex items-center gap-2">
              {/* <input type="date" name="" id="" value={user.dob} /> */}
              <span className="flex-1">{user.dob}</span>
              <Calendar size={16} className="inline-block" />
            </div>
          </div>

          <div className="flex items-center">
            <span className="w-40 font-medium">Sex:</span>
            <div className="flex items-center gap-2">
              <span className="flex-1">{user.sex == 1 ? "Nam" : "Nữ"}</span>
            </div>
          </div>

          <div className="flex items-start">
            <span className="w-40 font-medium">Address Company:</span>
            <p className="flex-1">{user.companyAddress}</p>
          </div>

          <div className="flex items-start">
            <span className="w-40 font-medium">Address Home:</span>
            <p className="flex-1">{user.homeAddress}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <CircleX
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Name:</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Date of birth:</label>
            <input
              type="date"
              defaultValue={user.dob}
              className="w-full cursor-pointer rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Sex:</label>
            <select
              id="sex"
              name="sex"
              className="w-full cursor-pointer rounded border border-gray-300 p-2"
            >
              <option value="1" selected>
                Nam
              </option>
              <option value="0">Nữ</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Address Company:</label>
            <input
              type="text"
              defaultValue={user.companyAddress}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Address Home:</label>
            <input
              type="text"
              defaultValue={user.homeAddress}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Avatar:</label>
            <input
              type="file"
              className="w-full cursor-pointer rounded border border-gray-300 p-2"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="cursor-pointer rounded bg-blue-500 p-2 text-white"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Save
            </button>
            <button
              className="cursor-pointer rounded bg-red-500 p-2 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
