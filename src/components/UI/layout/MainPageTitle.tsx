'use client';

import usePageContent from '@/custom-hooks/usePageContent';

type MainPageTitleProps = {
  name?: string;
};

const MainPageTitle = ({ name }: MainPageTitleProps) => {
  const currentPageContent = usePageContent();

  const pageTitle = currentPageContent ? currentPageContent.title : '';

  if (pageTitle) {
    return (
      <div className="w-full flex justify-center my-6">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
      </div>
    );
  }

  if (name && !pageTitle) {
    return (
      <div className="w-full flex justify-center my-6">
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
    );
  }
};
export default MainPageTitle;
