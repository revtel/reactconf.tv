import React from 'react';
import TalkItem from './TalkItem';

function TalkList(props) {
  const {items = [], ...extraProps} = props;

  return (
    <>
      {items.map((talk, idx) => (
        <TalkItem key={idx} idx={idx} talk={talk} {...extraProps} />
      ))}
    </>
  );
}

export default TalkList;
