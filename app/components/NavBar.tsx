"use client";

import React from "react";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrPlan } from "react-icons/gr";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Clientes",
      href: "/pages/customers",
    },
    {
      label: "Obras",
      href: "/pages/works",
    },
    {
      label: "Concretagem",
      href: "/pages/concretes",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b px-5 h-14 items-center">
      <Link href="/">
        <GrPlan />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
