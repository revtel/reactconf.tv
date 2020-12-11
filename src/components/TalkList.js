import React from 'react';
import TalkItem from './TalkItem';

function TalkList(props) {
  return (
    <>
      {(props.conf || []).items.map((talk, idx) => (
        <TalkItem key={idx} idx={idx} talk={talk} {...props} />
      ))}
    </>
  );
}

export default TalkList;
