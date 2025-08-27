'use client';

import { HeroUIProvider } from '@heroui/react';
import React from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
