'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/siteConfig';

export const Logo = () => {
  return (
    <Image
      src={'/logo_tatar_kitchen.png'}
      alt={'logo'}
      width={40}
      height={40}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const { navItems } = siteConfig;
  const getNavItems = () => {
    return navItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <NavbarItem key={item.href}>
          <Link
            color="foreground"
            href={item.href}
            className={`px-3 py-1
                             font-bold
                             hover:text-blue-300
                             duration-200
                             ${isActive ? 'text-blue-500 pointer-events-none' : 'text-foreground'}`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="flex gap-2 text-xl">
          <Logo />
          <p className="font-bold text-inherit">Tatarian Kitchen</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/registration" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
