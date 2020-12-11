import React from 'react';
import styled from 'styled-components';

const defaultStyle = {
  backgroundColor: 'white',
  padding: 15,
};

function SlideInPanel(props) {
  const {
    size = 250,
    zIndex = 10,
    backdropColor = 'rgba(0,0,0,0.2)',
    dismissOnClickBackdrop = true,
    position = 'right',
    style = defaultStyle,
  } = props;
  const selfRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  const open = React.useCallback((contentElement) => {
    contentRef.current = contentElement;
    setVisible(true);
  }, []);

  const close = React.useCallback(() => {
    setVisible(false);
  }, []);

  if (props.getInstance) {
    selfRef.current = {
      open,
      close,
    };
    props.getInstance(selfRef.current);
  }

  const panelProps = {
    size,
    zIndex,
    visible,
  };

  const backdropProps = {
    visible,
    backdropColor,
    zIndex: zIndex - 1,
  };

  let WrapperComp = RightWrapper;

  if (position === 'left') {
    WrapperComp = LeftWrapper;
  } else if (position === 'top') {
    WrapperComp = TopWrapper;
  } else if (position === 'bottom') {
    WrapperComp = BottomWrapper;
  }

  return (
    <>
      <WrapperComp {...panelProps} style={style}>
        {contentRef.current || 'Do you forget to set content?'}
      </WrapperComp>
      <Backdrop
        {...backdropProps}
        onClick={(evt) => {
          evt.stopPropagation();
          if (dismissOnClickBackdrop) {
            setVisible(false);
          }
        }}
      />
    </>
  );
}

const WrapperBase = styled.div`
  z-index: ${(props) => props.zIndex};
  transition: 200ms;
  position: fixed;
`;

const RightWrapper = styled(WrapperBase)`
  top: 0;
  right: ${(props) => (props.visible ? 0 : -props.size)}px;
  width: ${(props) => props.size}px;
  height: 100vh;
`;

const LeftWrapper = styled(WrapperBase)`
  top: 0;
  left: ${(props) => (props.visible ? 0 : -props.size)}px;
  width: ${(props) => props.size}px;
  height: 100vh;
`;

const TopWrapper = styled(WrapperBase)`
  right: 0;
  top: ${(props) => (props.visible ? 0 : -props.size)}px;
  height: ${(props) => props.size}px;
  width: 100vw;
`;

const BottomWrapper = styled(WrapperBase)`
  right: 0;
  bottom: ${(props) => (props.visible ? 0 : -props.size)}px;
  height: ${(props) => props.size}px;
  width: 100vw;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: ${(props) => props.backdropColor};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: 200ms;
  z-index: ${(props) => props.zIndex};
`;

export default SlideInPanel;
