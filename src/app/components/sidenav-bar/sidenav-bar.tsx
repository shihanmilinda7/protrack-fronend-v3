"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineFireTruck } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsBank } from "react-icons/bs";
import { GiRolledCloth } from "react-icons/gi";

const SideNavbar = () => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const currentRoute = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const menus = [
    { name: "Coming soon ..", link: "", icon: BiPurchaseTagAlt },
    // { name: "Invoice", link: "/home/invoice", icon: LiaFileInvoiceDollarSolid },
    // {
    //   name: "Customers",
    //   link: "/home/customers",
    //   icon: CgProfile,
    //   margin: true,
    // },
    // { name: "Suppliers", link: "/home/suppliers", icon: MdOutlineFireTruck },
    // { name: "Bank Accounts", link: "/home/bankdetails", icon: BsBank },
    // { name: "Fabrics", link: "/home/fabrics", icon: GiRolledCloth },
  ];

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.warning("Are you sure you want to logout?", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div>
          <Button
            color="default"
            onClick={() => confirmSignOut()}
            className="mb-1"
          >
            Yes
          </Button>
          <Button
            color="danger"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </div>
      ),
    });
  };

  const confirmSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navButtonHandler = async (link: string) => {
    switch (link) {
      case "/systemadmin-page/fabrics":
        window.location.href = "/home/fabrics";
        break;
      default:
        window.location.href = "/";
    }
  };

  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-gray-400 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-800 px-4`}
      >
        <div className="py-3 flex justify-end">
          <span
            className={
              open
                ? "mx-auto text-xl font-black leading-none text-gray-800 select-none mt-1"
                : "hidden"
            }
          >
            Admin panel
          </span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <button
              onClick={() => navButtonHandler(menu?.link)}
              key={i}
              className={`${
                currentRoute === menu?.link ? "bg-gray-600 " : ""
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SideNavbar;
