import React from 'react';

function useDimension() {
  const [dimension, setDimension] = React.useState({});
  const detectDimension = React.useCallback(() => {
    const nextDimension = {};
    if (typeof window !== undefined) {
      nextDimension.innerWidth = window.innerWidth;
      nextDimension.innerHeight = window.innerHeight;
      setDimension(nextDimension);
    }
  }, []);
  const onResize = React.useCallback(() => {
    detectDimension();
  }, [detectDimension]);

  React.useEffect(() => {
    try {
      detectDimension();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    } catch (ex) {
      // bypass
    }
  }, [onResize, detectDimension]);

  return {
    dimension,
  };
}

export default useDimension;
