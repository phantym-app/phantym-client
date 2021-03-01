import { h } from 'preact';

import { AuthProvider } from './auth';
import { RoomProvider } from './room';
import { CastProvider } from './cast';
import { DeviceWidthProvider } from './deviceWidth';

const makeCombinedProvider = (...containers) => ({ children }) =>
  containers.reduce((A, Provider) => <Provider>{A}</Provider>, children);

export default makeCombinedProvider(DeviceWidthProvider, CastProvider, RoomProvider, AuthProvider);
