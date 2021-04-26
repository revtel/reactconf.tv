import React from 'react';
import styled from 'styled-components';

function ProgressBar(props) {
  const {percentage} = props;

  return (
    <ProgressWrapper percentage={percentage}>
      <div className="watched" />
      <div className="not-watched" />
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.div`
  width: 100%;
  height: 3px;
  display: flex;
  align-items: stretch;
  background-color: red;

  & > .watched {
    flex: ${(props) => props.percentage};
  }

  & > .not-watched {
    flex: ${(props) => 100 - props.percentage};
    background-color: grey;
  }
`;

export default ProgressBar;
