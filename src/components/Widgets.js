import styled from 'styled-components';

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
