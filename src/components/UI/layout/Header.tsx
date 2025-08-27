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
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/config/siteConfig';
import RegistrationModal from '@/components/UI/modals/registration.modal';
import LoginModal from '@/components/UI/modals/login.modal';
import { useState } from 'react';
import { signOutFunc } from '@/actions/sign-out';
import { useAuthStore } from '@/store/auth.store';

export const Logo = () => {
  return (
    <Image
      src={'/logo_tatar_kitchen.png'}
      alt={'logo'}
      width={40}
      height={40}
      style={{ width: '40px', height: '40px' }}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const { navItems } = siteConfig;
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isAuth, session, status, setAuthState } = useAuthStore();
  const buttonClass = status === 'loading' ? 'hidden' : '';
  const router = useRouter();

  const username: string = session?.user?.email
    ? session.user.email.split('@')[0]
    : '';

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      router.refresh();
    } catch (err) {
      console.error('Error:', err);
    }

    setAuthState('unauthenticated', null);
  };

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
        {isAuth && <p>Hello, {username}</p>}
        {!isAuth ? (
          <>
            <NavbarItem className={buttonClass}>
              <Button
                type="button"
                color="primary"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Login
              </Button>
            </NavbarItem>

            <NavbarItem className={buttonClass}>
              <Button
                type="button"
                color="primary"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className={buttonClass}>
            <Button
              type="button"
              color="primary"
              variant="flat"
              onPress={handleSignOut}
            >
              Log Out
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
