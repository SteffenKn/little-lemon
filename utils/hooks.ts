import React, {useEffect, useRef} from 'react';

export function useUpdateEffect(effect: React.EffectCallback, dependencies: React.DependencyList = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
