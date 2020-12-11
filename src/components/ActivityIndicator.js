import React from 'react';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import {LoaderAlt} from '@styled-icons/boxicons-regular';

function ActivityIndicator(props) {
  const app = React.useContext(AppContext.Context);
  const visible = app.state.loading;

  return (
    <>
      <Wrapper visible={visible}>
        <div className="spinner">
          <LoaderAlt size={32} color="#e50914" />
        </div>
      </Wrapper>

      <Backdrop visible={visible} />
    </>
  );
}

const CoverAll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`;

const Wrapper = styled(CoverAll)`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  @keyframes infinite-spinning {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(360deg) scale(1.2);
    }
    100% {
      transform: rotate(720deg) scale(1);
    }
  }

  & > .spinner {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    transition: 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    animation: infinite-spinning 1.2s infinite;
  }
`;

const Backdrop = styled(CoverAll)`
  z-index: 1;
  transition: 200ms;
  background-color: ${(props) =>
    props.visible ? 'rgba(0,0,0,0.5)' : 'transparent'};
`;

export default ActivityIndicator;
