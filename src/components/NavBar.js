import React, {useContext, useRef} from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import * as Widgets from '../components/Widgets';
import {ArrowBack} from '@styled-icons/material';
import {LogoGithub} from '@styled-icons/ionicons-solid';
import {BookHeart} from '@styled-icons/boxicons-regular';
import {Context} from '../AppContext';
import Search from '../components/Search';

const iconSize = 32;

function NavBar(props) {
  const {
    selectedChannel,
    setSelectedChannel,
    explicitTitle,
    onBackClick,
  } = props;
  const [title, setTitle] = React.useState('untitled');
  const [transparent, setTransparent] = React.useState(true);
  const keys = useRef({}).current;
  const app = useContext(Context);

  React.useEffect(() => {
    const listener = (e) => {
      keys[e.code] = true;
      if ((keys['MetaLeft'] || keys['MetaRight']) && e.code === 'KeyK') {
        app.actions.setModal(<Search />);
      }
    };

    if (typeof window) {
      window.addEventListener('keydown', listener);
    }

    return window.addEventListener('keydown', listener);
  }, [app.actions, keys]);

  React.useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Escape') {
        app.actions.setModal(null);
      }
      delete keys[e.code];
    };
    if (typeof window) {
      window.addEventListener('keyup', listener);
    }

    return window.addEventListener('keyup', listener);
  }, [app.actions, keys]);

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
        style={{
          padding: 12,
          position: 'relative',
        }}>
        <SiteTitle hide={showCenterTitle}>
          <img src={ReactLogo} alt="logo" />
          <div>ReactConf.TV</div>
        </SiteTitle>

        <CenterTitle
          hide={!showCenterTitle}
          style={{textAlign: 'center', flex: 1}}>
          {explicitTitle || title}
        </CenterTitle>

        <RightActions hide={showCenterTitle}>
          <BookHeart
            className="btn"
            color="white"
            size={iconSize}
            style={{marginRight: 10}}
            onClick={() => navigate('/favorites')}
          />
          <LogoGithub
            className="btn"
            color="white"
            size={iconSize}
            onClick={() => {
              window.open('https://github.com/revtel/reactconf-tv');
            }}
          />
        </RightActions>

        <BackButton
          hide={!showCenterTitle}
          onClick={() => {
            if (onBackClick) {
              onBackClick();
              return;
            }
            setSelectedChannel(null);
          }}>
          <ArrowBack color="white" size={iconSize} />
        </BackButton>
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
  display: flex;
  align-items: center;

  & > img {
    width: ${iconSize}px;
    height: ${iconSize}px;
    object-fit: contain;
    margin-right: 10px;
  }
`;

const CenterTitle = styled(TitleText)`
  transform: translateY(${(props) => (props.hide ? '-80px' : '0px')});
`;

const CornerActions = styled.div`
  position: absolute;
  top: 12px;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: 300ms;
`;

const BackButton = styled(CornerActions)`
  left: 20px;
  pointer-events: ${(props) => (props.hide ? 'none' : 'auto')};
  cursor: pointer;
`;

const RightActions = styled(CornerActions)`
  right: 20px;
  display: flex;
  align-items: center;

  & > .btn {
    cursor: pointer;
  }
`;

const ReactLogo =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

export default NavBar;
