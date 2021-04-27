import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRevent} from 'revent-lib';

function Modal(props) {
  const [modalContent] = useRevent('modal');
  const [content, setContent] = useState(modalContent);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (modalContent) {
      setContent(modalContent);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [modalContent]);

  return (
    <Wrapper visible={visible}>
      <div className="backdrop" />
      <div className="content">{content}</div>
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
    background-color: rgba(0, 0, 0, 0.7);
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
      props.visible ? 'translateY(-20%)' : 'translateY(-100%)'};
  }
`;

export default Modal;
