"use client";
import { useState } from "react";
import React from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { UserPen, CircleX, Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { user } from "@/datas/user";
import { User, GenderLabel, Gender } from "@/types/user";
import { formatDate } from "../utils/formatDate";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(user as User);
  const [open, setOpen] = React.useState(false);
  const [openGender, setOpenGender] = React.useState(false);
  const genders = [
    { value: Gender.Male, label: "Male" },
    { value: Gender.Female, label: "Female" },
  ];
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      userData.name == "" ||
      userData.email == "" ||
      userData.dob == "" ||
      userData.companyAddress == "" ||
      userData.homeAddress == ""
    ) {
      toast("Please fill full information");
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <BreadCrumb link="/profile" name="Profile" />
      <div className="mx-auto mt-10 max-w-2xl rounded p-6 shadow-lg">
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
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600">Email: {userData.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-6 text-sm">
          <div className="flex items-center">
            <span className="w-40 font-medium">Date of birth:</span>
            <div className="flex items-center gap-2">
              <span className="flex-1">{formatDate(userData.dob.toString())}</span>
              {/* <Calendar size={16} className="inline-block" /> */}
            </div>
          </div>

          <div className="flex items-center">
            <span className="w-40 font-medium">Sex:</span>
            <div className="flex items-center gap-2">
              <span className="flex-1">{GenderLabel[userData.gender]}</span>
            </div>
          </div>

          <div className="flex items-start">
            <span className="w-40 font-medium">Address Company:</span>
            <p className="flex-1">{userData.companyAddress}</p>
          </div>

          <div className="flex items-start">
            <span className="w-40 font-medium">Address Home:</span>
            <p className="flex-1">{userData.homeAddress}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <CircleX
            className="cursor-pointer hover:text-red-500"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <form className="space-y-2 md:space-y-4">
          <div>
            <label className="mb-1 block font-medium">Name:</label>
            <input
              type="text"
              defaultValue={userData.name}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Email:</label>
            <input
              type="text"
              defaultValue={userData.email}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex space-x-5">
            <div>
              <label className="mb-1 block font-medium">Date of birth:</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-fit">
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-between rounded border-gray-300 font-normal"
                  >
                    {userData.dob ? formatDate(userData.dob.toString()) : "Select date"}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[1000] w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={userData.dob ? new Date(userData.dob) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (date) {
                        setUserData({
                          ...userData,
                          dob: date.toISOString().slice(0, 10),
                        });
                      }
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>{" "}
            <div>
              <label className="mb-1 block font-medium">Sex:</label>
              <Popover open={openGender} onOpenChange={setOpenGender}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-fit justify-between rounded border-gray-300 font-normal"
                  >
                    {GenderLabel[userData.gender] ?? "Select gender..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[1000] w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No gender found.</CommandEmpty>
                      <CommandGroup>
                        {genders.map((g) => (
                          <CommandItem
                            key={g.value}
                            value={g.label}
                            onSelect={() => {
                              setUserData({
                                ...userData,
                                gender: g.value, // 👈 lưu về số 0 | 1
                              });
                              setOpenGender(false);
                            }}
                          >
                            {g.label}
                            {userData.gender === g.value && <Check className="ml-auto h-4 w-4" />}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium">Address Company:</label>
            <input
              type="text"
              defaultValue={userData.companyAddress}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  companyAddress: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Address Home:</label>
            <input
              type="text"
              defaultValue={userData.homeAddress}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  homeAddress: e.target.value,
                });
              }}
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
              onClick={(e) => handleSave(e)}
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
