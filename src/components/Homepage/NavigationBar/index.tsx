"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import type { NavigationMenuProps } from "@/utils/types";
import Link from "next/link";

import { tw } from "@/utils/style";
import { NAVIGATION_MENU } from "@/utils/const";

const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-wrap gap-x-9 items-center">
      {NAVIGATION_MENU.map((menu: NavigationMenuProps, index: number) => {
        let isActive = pathname === menu.pathname;

        return (
          <li key={index}>
            <Link
              href={menu.pathname}
              className={tw(
                " navLink  relative font-[500]",
                isActive ? "naLinkActive" : ""
              )}
            >
              {menu.menuTitle}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationBar;
