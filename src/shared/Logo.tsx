import React from "react";
import Image,{StaticImageData} from "next/image";
import Link from "next/link";

import imagePng from "@/images/logo.png";

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "w-24",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <Image
        src={imagePng}
        alt="logo"
        width={600}
        height={500}
      />
    </Link>
  );
};

export default Logo;
