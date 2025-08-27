import React, { FC } from 'react';

interface IProps {
  children: React.ReactNode;
}

const AboutLayout: FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AboutLayout;
