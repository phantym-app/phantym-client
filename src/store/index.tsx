import { h } from 'preact';

import { AuthProvider } from './auth';
import { CastProvider } from './cast';
import { RoomProvider } from './room';
import { GameLibraryProvider } from './gameLibrary';

const makeCombinedProvider = (...containers) => ({ children }) =>
  containers.reduce((A, Provider) => <Provider>{A}</Provider>, children);

export default makeCombinedProvider(GameLibraryProvider, CastProvider, RoomProvider, AuthProvider);
