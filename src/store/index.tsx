import { h } from 'preact';

import { AuthProvider } from './auth';
import { CastProvider } from './cast';
import { RoomProvider } from './room';

const makeCombinedProvider = (...containers) => ({ children }) =>
  containers.reduce((A, Provider) => <Provider>{A}</Provider>, children);

export default makeCombinedProvider(CastProvider, RoomProvider, AuthProvider);
