import React, { useEffect, useRef } from 'react';

// component with custom hook
export default function ChatScroll(props){
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if(shouldScrollRef.current){
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  };

  return <div {...props} ref={ref} onScroll={handleScroll}/>
}