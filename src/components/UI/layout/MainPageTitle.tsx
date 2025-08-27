'use client';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/siteConfig';

const Title = () => {
  const pathname = usePathname();

  const currentNavItem = siteConfig.navItems.find(
    (navItem) => navItem.href === pathname
  );

  const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

  return (
    <div>
      <h1>{pageTitle}</h1>
    </div>
  );
};

export default Title;
