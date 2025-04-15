import Image from "next/image";
import React from "react";
import { assets } from "@/Assets/assets";

const Footer = () => {
  return (
    <div className="bg-black text-white w-full py-2 -mt-4">
      <div className="container mx-auto flex flex-col justify-center items-center gap-2">
        <Image src={assets.logo_light} alt="UTCC ComSci Reviews logo" width={160} />
        <div className="text-sm text-gray-400">
          &copy; 2025 UTCC ComSci Reviews. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
