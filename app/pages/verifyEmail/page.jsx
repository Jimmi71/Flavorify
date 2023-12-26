"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const verifyEmail = () => {
  const [token, setToken] = useState();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const verifyUserEmail = () => {
    axios
      .post("/api/register/verifyEmail", { token })
      .then((res) => {
        toast.success("User Verified Successfully");
        setVerified(true);
        router.push("/pages/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setError(true);
        router.push("/pages/register");
      });
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    if (!urlToken) {
      toast.error("User Not Found");
      setError(true);
      router.push("/pages/register");
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <button className="bg-red-500 text-blue-50 rounded-xl md:text-2xl text-xl py-2 px-7 mt-3">
        {!verified && !error && "Verifying User..."}
        {verified && "User Verified"}
        {error && "User not Verified"}
      </button>
    </div>
  );
};

export default verifyEmail;
