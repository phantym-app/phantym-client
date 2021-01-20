import { h } from 'preact';

import { AuthContainer } from './auth';
import { CasterContainer } from './caster';

const makeCombinedProvider = (...containers) => ({ children }) =>
  containers.reduce((A, { Provider }) => <Provider>{A}</Provider>, children);

export default makeCombinedProvider(AuthContainer, CasterContainer);
