import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import * as Widgets from '../components/Widgets';
import {ArrowBack} from '@styled-icons/material';
import {LogoGithub} from '@styled-icons/ionicons-solid';
import {BookHeart} from '@styled-icons/boxicons-regular';

function NavBar(props) {
  const {
    selectedChannel,
    setSelectedChannel,
    explicitTitle,
    onBackClick,
  } = props;
  const [title, setTitle] = React.useState('untitled');
  const [transparent, setTransparent] = React.useState(true);

  React.useEffect(() => {
    function onScroll() {
      if (window.scrollY > 200) {
        transparent && setTransparent(false);
      } else {
        !transparent && setTransparent(true);
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [transparent]);

  React.useEffect(() => {
    if (selectedChannel && selectedChannel?.name !== title) {
      setTitle(selectedChannel.display);
    }
  }, [selectedChannel, title]);

  const showCenterTitle = selectedChannel || explicitTitle;

  return (
    <NavBarWrapper transparent={transparent}>
      <Widgets.MaxWidthCenter
        maxWidth={1180}
        style={{padding: 12, position: 'relative'}}>
        <CenterTitle
          hide={!showCenterTitle}
          style={{textAlign: 'center', flex: 1}}>
          {explicitTitle || title}
        </CenterTitle>

        <SiteTitle hide={showCenterTitle}>
          <img src={'../images/logo-dark-2.png'} alt="logo" width="180" />
        </SiteTitle>

        <BackButton
          hide={!showCenterTitle}
          onClick={() => {
            if (onBackClick) {
              onBackClick();
              return;
            }
            setSelectedChannel(null);
          }}>
          <ArrowBack color="white" size={24} />
        </BackButton>

        <RightActions hide={showCenterTitle}>
          <BookHeart
            className="btn"
            color="white"
            size={33}
            style={{marginRight: 10}}
            onClick={() => navigate('/favorites')}
          />
          <LogoGithub
            className="btn"
            color="white"
            size={33}
            onClick={() => {
              window.open('https://github.com/revtel/reactconf-tv');
            }}
          />
        </RightActions>
      </Widgets.MaxWidthCenter>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background-color: ${(props) =>
    props.transparent ? 'transparent' : '#212121'};
  box-shadow: ${(props) =>
    props.transparent
      ? 'none'
      : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'};
  transition: 330ms;
`;

const TitleText = styled.div`
  color: white;
  font-size: 22px;
  font-family: VictorMonoItalic;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: 200ms;
`;

const SiteTitle = styled(TitleText)`
  position: absolute;
  top: 12px;
  left: 20px;
`;

const CenterTitle = styled(TitleText)`
  transform: translateY(${(props) => (props.hide ? '-80px' : '0px')});
`;

const BackButton = styled.div`
  position: absolute;
  top: 18px;
  left: 20px;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: 300ms;
  pointer-events: ${(props) => (props.hide ? 'none' : 'auto')};
  cursor: pointer;
`;

const RightActions = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: 300ms;

  & > .btn {
    cursor: pointer;
  }
`;

export default NavBar;
