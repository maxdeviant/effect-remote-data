/**
 * A type representing fetched data.
 */
export type RemoteData<E, A> = NotAsked | Loading | Failure<E> | Success<A>;

export interface NotAsked {
  readonly tag: 'NotAsked';
}

export interface Loading {
  readonly tag: 'Loading';
}

export interface Failure<E> {
  readonly tag: 'Failure';
  readonly error: E;
}

export interface Success<A> {
  readonly tag: 'Success';
  readonly data: A;
}

export const notAsked = <E, A>(): RemoteData<E, A> => ({ tag: 'NotAsked' });

export const loading = <E, A>(): RemoteData<E, A> => ({ tag: 'Loading' });

export const failure = <E, A>(error: E): RemoteData<E, A> => ({
  tag: 'Failure',
  error,
});

export const success = <E, A>(data: A): RemoteData<E, A> => ({
  tag: 'Success',
  data,
});
