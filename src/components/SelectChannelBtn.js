import React from 'react';
import styled from 'styled-components';
import {List} from '@styled-icons/material';
import SlideInPanel from './SlideInPanel';

function SelectChannelBtn(props) {
  const {confChannels, selectedChannel, setSelectedChannel} = props;
  const leftPanelRef = React.useRef();

  return (
    <>
      <SlideInPanel
        position="left"
        getInstance={(inst) => {
          leftPanelRef.current = inst;
        }}
      />

      <CircleBtn
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
        }}
        onClick={() => {
          leftPanelRef.current.open(
            <div>
              {confChannels.map((channel) => (
                <Channel
                  key={channel.name}
                  active={
                    selectedChannel && selectedChannel.name === channel.name
                  }
                  onClick={async () => {
                    leftPanelRef.current.close();
                    setSelectedChannel(channel);
                  }}>
                  {channel.display}
                </Channel>
              ))}
            </div>,
          );
        }}>
        <List color="white" size={26} />
      </CircleBtn>
    </>
  );
}

const CircleBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e50914;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  border: none;
  outline: none;
  &:active {
    transform: scale(1.05);
  }
`;

const Channel = styled.div`
  font-family: VictorMonoItalic;
  font-size: 18px;
  margin-bottom: 10px;
  color: ${(props) => (props.active ? 'red' : 'black')};
  cursor: pointer;
`;

export default SelectChannelBtn;
