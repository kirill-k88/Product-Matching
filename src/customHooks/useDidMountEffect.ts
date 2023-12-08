import { useEffect, useRef } from 'react';

// this custom hook may require dependencies of any type because it will be reused
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDidMountEffect = (func: () => void, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
