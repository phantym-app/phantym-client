import type firebase from 'firebase';

import { createContainer } from 'unstated-next';
import { useState } from 'preact/hooks';

const fs$ = import('@logic/firebase/firestore');

export type GameStub = {
  id: string;
  title: string;
  thumbnail: string;
  euroCents: number;
  compatibility: ('desktop' | 'mobile' | 'cast')[];
  popularity: number;
};

export type GameLabel = {
  text: string;
  popularity: number;
};

type Query<T> = firebase.firestore.Query<T>;

const gameStubQuery$ = fs$.then(m => m.fs.collection('gamePreviews').orderBy('popularity', 'desc') as Query<GameStub>);
const gameLabelQuery$ = fs$.then(m => m.fs.collection('gameTags').orderBy('popularity', 'desc') as Query<GameLabel>);

function usePaginatedFetch<T>(baseQuery$: Promise<firebase.firestore.Query<T>>) {
  const [query$, setQuery$] = useState<Promise<firebase.firestore.Query<T>>>(baseQuery$);
  const [dataArray, setDataArray] = useState<T[]>([]);

  // TODO use ai reccomendations
  async function fetchNextPage(count: number) {
    const query = await query$;

    const { docs } = await query.limit(count).get();

    if (docs.length === 0) throw new Error('No more data to fetch');

    setDataArray(dataArray => [...dataArray, ...docs.map(snap => ({ ...snap.data(), id: snap.id }))]);
    setQuery$(baseQuery$.then(q => q.startAfter(docs[docs.length - 1])));
  }

  return [dataArray, fetchNextPage] as [T[], (number: number) => Promise<void>];
}

function useGameLibrary() {
  const [gameStubs, fetchGameStubs] = usePaginatedFetch(gameStubQuery$);
  const [gameLabels, fetchGameLabels] = usePaginatedFetch(gameLabelQuery$);

  return {
    gameStubs,
    fetchGameStubs,

    gameLabels,
    fetchGameLabels,
  };
}

const { Provider, useContainer } = createContainer(useGameLibrary);
export { Provider as GameLibraryProvider, useContainer as useGameLibrary };
