import { createContainer } from 'unstated-preact';

function useLocation() {}

const { Provider, useContainer } = createContainer(useLocation);
export { Provider as LocationProvider, useContainer as useLocation };
