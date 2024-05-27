"use client";

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <Link href="/" className="w-[230px]">
      <Image
        src="/logo.png"
        alt="Filipina Dream Girl logo"
        width={230}
        height={68}
        className="w-full h-full"
      />
    </Link>
  );
};

export default Header;
