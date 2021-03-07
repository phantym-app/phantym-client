import useLocalState from '@logic/hooks/useLocalState';

// default values to be stored in localStorage for each key
const localDefaults = {
  sidebarHidden: false,
  videoVolume: 100,
};

function useLocal<T>(key: keyof typeof localDefaults) {
  // @ts-ignore
  return useLocalState<T>(key, localDefaults[key]);
}

export { useLocal };
