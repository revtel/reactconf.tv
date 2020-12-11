import React from 'react';
import styled from 'styled-components';

import * as AppContext from '../AppContext';

function Toast(props) {
  const app = React.useContext(AppContext.Context);
  const toastContent = app.state.toastContent;

  React.useEffect(() => {
    if (toastContent) {
      setTimeout(() => {
        app.actions.setToast(null);
      }, 2000);
    }
  }, [toastContent, app.actions]);

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
