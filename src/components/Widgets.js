import React from 'react';
import styled, {css} from 'styled-components';

export const AbsCoverAll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const MaxWidthCenter = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.maxWidth || 800}px;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRowCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexPlaceholder = styled.div`
  flex: 1;
`;

export function Button(props) {
  const {children, type, ...btnProps} = props;
  let Wrapper = ButtonWrapper;

  if (type === 'outlined') {
    Wrapper = OutlineButtonWrapper;
  } else if (type === 'text') {
    Wrapper = TextButtonWrapper;
  }

  return <Wrapper {...btnProps}>{children}</Wrapper>;
}

const ButtonBase = styled.button`
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonWrapper = styled(ButtonBase)`
  border: 1px solid ${(props) => props.color || '#4f77e2'};
  background-color: ${(props) => props.color || '#4f77e2'};
  color: white;
`;

const OutlineButtonWrapper = styled(ButtonBase)`
  border: 1px solid ${(props) => props.color || '#4f77e2'};
  background-color: white;
  color: ${(props) => props.color || '#4f77e2'};
`;

const TextButtonWrapper = styled(ButtonBase)`
  border: none;
  background-color: transparent;
`;

export const Badge = styled.div`
  font-weight: bold;
  height: 24px;
  min-width: 24px;
  color: #4f77e2;
  border-radius: 5px;
  border: 2px solid #4f77e2;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
`;

export const ScrollBarCss = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.showScrollBar ? 'darkgray' : 'transparent'};
  }

  body::-webkit-scrollbar-track-piece {
    display: none;
  }
`;
