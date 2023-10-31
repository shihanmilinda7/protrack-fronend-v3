"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from "@nextui-org/react";
import { validateEmail } from "../common-comp/nextui-input-fields/next-email-input-fields";
import { compare } from "bcryptjs";
import { db } from "@/db";
import OrganizationSelect from "../organization/org-select";

const Login = () => {
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

  const divStyle: React.CSSProperties = {
    backgroundImage:
      "url('https://img.freepik.com/free-vector/flat-design-business-planning-concept_23-2149151729.jpg?w=1060&t=st=1698555917~exp=1698556517~hmac=fd5322c5d836a097671d554fd1ee76d6ba3f003dd7f16bb939a7ebc84eb913d8')",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [dbname, setDbname] = useState("");
  const [orgList, setOrgList] = useState<any[]>([]);

  const [isMultyOrg, setIsMultyOrg] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // login(event);
    }
  };

  const masterLoginEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const isValid = validateEmail(email);
      if (isValid) {
        setIsValidEmail(true);
        const reponse = await fetch(
          pathname + "/api/auth/master-login?email=" + email
        );
        const res = await reponse.json();
        if (res.masterUser == 0) {
          toast.error("Email Incorrect!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          const tmpUser = res.masterUser[0];
          const tmpPassword = password;
          const userPassword = tmpUser?.password;
          const passwordsMatch = await compare(tmpPassword, userPassword);
          if (!passwordsMatch) {
            toast.error("Email or Password Incorrect!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            const reponse = await fetch(
              pathname +
                "/api/auth/get-userorgmapping-details?masteruserid=" +
                res.masterUser[0].masteruserid
            );
            const res1 = await reponse.json();
            if (res1.mappingDetails.length == 1) {
              // console.log("res1.mappingDetails", res1.mappingDetails[0]);
              setDbname(res1.mappingDetails[0].dbname);
              const response = await signIn("credentials", {
                email,
                password,
                dbname: res1.mappingDetails[0].dbname,
                organizationid: res1.mappingDetails[0].organizationid,
                organizationname: res1.mappingDetails[0].organizationname,
                orglist: JSON.stringify(res1.mappingDetails),
                ismultyorg: "SINGLE",
                redirect: false,
              });
              if (response?.error) {
                toast.error("Username or Password Incorrect!", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                return;
              }
              toast.success("Logged in successfully!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push("/dashboard");
            } else {
              //todo................
              //multy org
              setIsMultyOrg(true);
              setOrgList(res1.mappingDetails);
              // console.log("sdfsdfsdfsdfsdf", res1.mappingDetails);
            }
          }
        }
      } else {
        setIsValidEmail(false);
      }
    } catch (error) {
      console.log("System error please reload!", error);
      toast.error("error", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   try {
  //     const isValid = validateEmail(email);
  //     if (isValid) {
  //       setIsValidEmail(true);
  //       const response = await signIn("credentials", {
  //         email,
  //         password,
  //         redirect: false,
  //       });
  //       if (response?.error) {
  //         toast.error("Username or Password Incorrect!", {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         return;
  //       }
  //       toast.success("Logged in successfully!", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       router.push("/dashboard");
  //     } else {
  //       setIsValidEmail(false);
  //     }
  //   } catch (error) {
  //     console.log("System error please reload!", error);
  //     toast.error("error", {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={divStyle}
    >
      <OrganizationSelect
        isOpenPopup={isMultyOrg}
        orgList={orgList}
        email={email}
        password={password}
      />
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold italic text-white">
              ProTrack
            </h2>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcom Back!
            </h2>
            <p className="mt-2 text-sm text-white mb-3">
              Please sign in to your account
            </p>
          </div>
          <div className="mb-4 text-lg">
            <Input
              type="email"
              color="primary"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              startContent={
                <MdOutlineAlternateEmail className="inline-block h-6 w-6 text-slate-900" />
              }
            />
          </div>

          <div className="mb-4 text-lg">
            <Input
              color="primary"
              placeholder="Enter your password"
              onKeyDown={handleKeyPress}
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <AiFillEyeInvisible className="text-2xl text-slate-900 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-slate-900 pointer-events-none" />
                  )}
                </button>
              }
              startContent={
                <RiLockPasswordLine className="inline-block h-6 w-6 text-slate-900" />
              }
            />
          </div>
          {isValidEmail === false && (
            <div className="w-full pl-1 pr-1">
              <span className="font-semibold text-red-900">
                Invalid email address please provide valid email
              </span>
            </div>
          )}
          <div className="mt-8 flex justify-center text-lg text-black">
            <button
              onClick={masterLoginEvent}
              className="flex mt-3 items-center justify-center focus:outline-none text-blue-600 text-sm sm:text-base bg-white hover:bg-blue-200 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span className="mr-2 uppercase">Login</span>
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
