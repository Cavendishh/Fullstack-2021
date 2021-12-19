import React from 'react';

interface IHeaderProps {
  name: string;
}

const Header = ({ name }: IHeaderProps) => {
  return <h1>{name}</h1>;
};

export default Header;
