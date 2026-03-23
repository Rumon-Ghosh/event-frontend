"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <div>
      <Link href={href} className={isActive ? "text-blue-500" :  ""}>
        {children}
      </Link>
    </div>
  );
};

export default NavLink;