import type { VNode } from 'preact';
import { h } from 'preact';

import { AuthProvider } from './auth';
import { RoomProvider } from './room';
import { CastProvider } from './cast';
import { GameLibraryProvider } from './gameLibrary';
import { DeviceWidthProvider } from './deviceWidth';

const Providers = [
  // higher can access to lower
  DeviceWidthProvider,
  GameLibraryProvider,
  CastProvider,
  RoomProvider,
  AuthProvider,
];

const CombinedProvider = ({ children }: { children: VNode<any> }) =>
  Providers.reduce((A, Provider) => <Provider>{A}</Provider>, children);

export default CombinedProvider;
