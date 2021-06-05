import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';

function Toast(props) {
  const [toastContent, setToastContent] = useOutlet('toast');

  React.useEffect(() => {
    if (toastContent) {
      setTimeout(() => {
        setToastContent(null);
      }, 3000);
    }
  }, [toastContent, setToastContent]);

  return <ToastWrapper visible={toastContent}>{toastContent}</ToastWrapper>;
}

const ToastWrapper = styled.div`
  position: fixed;
  color: white;
  padding: 22px 85px;
  border-radius: 8px;
  background-color: #424a55;
  z-index: 30;
  transform: translateX(-50%);
  left: 50vw;
  bottom: ${(props) => (props.visible ? 100 : -100)}px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 300ms;
`;

export default Toast;
