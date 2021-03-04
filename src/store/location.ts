import { createContainer } from 'unstated-next';

function useLocation() {}

const { Provider, useContainer } = createContainer(useLocation);
export { Provider as LocationProvider, useContainer as useLocation };
