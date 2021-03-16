import type firebase from 'firebase';

import { createContainer } from 'unstated-preact';
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
type Awaitable<T> = T | Promise<T>;

const gameStubQuery$ = fs$.then(m => m.fs.collection('gamePreviews').orderBy('popularity', 'desc') as Query<GameStub>);
const gameLabelQuery$ = fs$.then(m => m.fs.collection('gameTags').orderBy('popularity', 'desc') as Query<GameLabel>);

function usePaginatedFetch<T>(baseQuery$: Awaitable<firebase.firestore.Query<T>>) {
  const [query$, setQuery$] = useState<Awaitable<firebase.firestore.Query<T>>>(baseQuery$);
  const [dataArray, setDataArray] = useState<T[]>([]);

  // TODO use ai reccomendations
  async function fetchNextPage(count: number) {
    const query = await query$;

    const { docs } = await query.limit(count).get();

    if (docs.length === 0) throw new Error('No more data to fetch');

    setDataArray(dataArray => [...dataArray, ...docs.map(snap => ({ ...snap.data(), id: snap.id }))]);
    setQuery$(query.startAfter(docs[docs.length - 1]));
  }

  return [dataArray, fetchNextPage] as [T[], (number: number) => Promise<void>];
}

function useGameLibrary() {
  const [gameStubs, fetchGameStubs] = usePaginatedFetch(gameStubQuery$);
  const [gameLabels, fetchGameLabels] = usePaginatedFetch(gameLabelQuery$);

  return {
    gameStubs,
    fetchGameStubs,

    async get(id: string): Promise<GameStub> {
      const { fs } = await fs$;

      const locally = gameStubs.find(g => g.id === id);
      if (locally) return locally;

      const fetched = (await fs.doc(`gamePreviews/${id}`).get()).data() as GameStub;
      if (fetched) {
        // TODO add to gameStubs
        return fetched;
      }

      throw new Error(`game of id - "${id}" doesnt exist`);
    },

    gameLabels,
    fetchGameLabels,
  };
}

const { Provider, useContainer } = createContainer(useGameLibrary);
export { Provider as GameLibraryProvider, useContainer as useGameLibrary };
