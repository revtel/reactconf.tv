import styled from 'styled-components';
import React, {useContext, useMemo, useState} from 'react';
import {
  BookHeart,
  ChevronDown,
  ChevronUp,
  SearchAlt,
} from '@styled-icons/boxicons-regular';
import {LogoGithub} from '@styled-icons/ionicons-solid';
import {Context} from '../AppContext';
import Search from './Search';
import {navigate} from '../../.cache/gatsby-browser-entry';

const WidgetWithCollapse = (props) => {
  const app = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(() => {
    return [
      {
        icon: isOpen ? (
          <ChevronDown color="white" size={26} />
        ) : (
          <ChevronUp color="white" size={26} />
        ),
        onClick: (e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        },
      },
      {
        icon: <LogoGithub color="white" size={26} />,
        onClick: (e) => {
          e.stopPropagation();
          window.open('https://github.com/revtel/reactconf-tv');
        },
      },
      {
        icon: <SearchAlt color="white" size={26} />,
        onClick: (e) => {
          e.stopPropagation();
          app.actions.setModal(<Search />);
        },
      },
      {
        icon: <BookHeart color="white" size={26} />,
        onClick: async (e) => {
          e.stopPropagation();
          await navigate('/favorites');
        },
      },
    ];
  }, [app.actions, isOpen]);

  return (
    <Wrapper isOpen={isOpen}>
      {options.map((opt, idx) => (
        <div
          key={idx}
          className="option"
          onClick={opt.onClick}
          style={{bottom: idx * 60}}>
          {opt.icon}
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60px;
  background-color: #4f77e2;
  height: ${(props) => `calc(60px * ${props.isOpen ? 4 : 1})`};
  border-radius: ${(props) => `calc(60px * ${props.isOpen ? 4 : 1} / 2)`};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 32px;
  bottom: 112px;
  overflow-y: hidden;
  transition: all 300ms ease-in-out;
  & > .option {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
  @media screen and (min-width: 996px) {
    display: none;
  }
`;

export default WidgetWithCollapse;
