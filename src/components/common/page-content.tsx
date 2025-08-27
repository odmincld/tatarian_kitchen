'use client';

import usePageContent from '@/custom-hooks/usePageContent';
import { siteConfig } from '@/config/siteConfig';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

const PageContent = () => {
  const currentPageContent = usePageContent();

  if (!currentPageContent) {
    return <span>{siteConfig.titleError}</span>;
  }
  const cleanHTML = DOMPurify.sanitize(currentPageContent.content);

  return <div>{parse(cleanHTML)}</div>;
};

export default PageContent;
