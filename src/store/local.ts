import useLocalState from '@logic/hooks/useLocalState';

// default values to be stored in localStorage for each key
const localDefaults = {
  visible: true,
};

function useLocal(key: keyof typeof localDefaults) {
  return useLocalState(key, localDefaults[key]);
}

export { useLocal };
