'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className={'flex flex-col items-center justify-center gap-4 pt-20'}>
      <span className={'text-8xl font-bold text-gray-300'}>404</span>

      <h1 className={'text-2xl font-bold text-gray-300'}>Page Not Found</h1>

      <div>
        <Button as={Link} href={'/'} color={'primary'} variant={'shadow'}>
          Main Page
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
