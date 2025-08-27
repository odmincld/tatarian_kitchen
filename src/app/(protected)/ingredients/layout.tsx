import React, { FC } from 'react';

interface IProps {
  children: React.ReactNode;
}

const IngredientsLayout: FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default IngredientsLayout;
