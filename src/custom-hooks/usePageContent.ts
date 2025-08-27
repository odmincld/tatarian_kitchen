import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/siteConfig';

const usePageContent = () => {
  const pathname = usePathname();
  const pageContent =
    siteConfig.pageContent[pathname as keyof typeof siteConfig.pageContent];

  return pageContent;
};

export default usePageContent;
