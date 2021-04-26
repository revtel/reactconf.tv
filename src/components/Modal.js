import React from 'react';
import styled from 'styled-components';
import {useRevent} from 'revent-lib';

function Modal(props) {
  const [modalContent] = useRevent('modal');

  return (
    <Wrapper visible={modalContent}>
      <div className="backdrop" />
      <div className="content">{modalContent}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  & > .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity 1s ease;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    background-color: ${(props) =>
      props.visible ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};
  }
  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    transition: all 1s ease;
    transform: ${(props) =>
      props.visible ? 'translateY(0)' : 'translateY(-100%)'};
  }
`;

export default Modal;
