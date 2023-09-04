import * as Option from '@effect/data/Option';
import * as Either from '@effect/data/Either';
import { dual } from '@effect/data/Function';

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

export const isNotAsked = <E, A>(value: RemoteData<E, A>): value is NotAsked =>
  value.tag === 'NotAsked';

export const isLoading = <E, A>(value: RemoteData<E, A>): value is Loading =>
  value.tag === 'Loading';

export const isFailure = <E, A>(value: RemoteData<E, A>): value is Failure<E> =>
  value.tag === 'Failure';

export const isSuccess = <E, A>(value: RemoteData<E, A>): value is Success<A> =>
  value.tag === 'Success';

export const match: {
  <E, A, O1, O2 = O1, O3 = O1, O4 = O1>(options: {
    readonly onNotAsked: () => O1;
    readonly onLoading: () => O2;
    readonly onFailure: (error: E) => O3;
    readonly onSuccess: (data: A) => O4;
  }): (self: RemoteData<E, A>) => O1 | O2 | O3 | O4;
  <E, A, O1, O2 = O1, O3 = O1, O4 = O1>(
    self: RemoteData<E, A>,
    options: {
      readonly onNotAsked: () => O1;
      readonly onLoading: () => O2;
      readonly onFailure: (error: E) => O3;
      readonly onSuccess: (data: A) => O4;
    },
  ): O1 | O2 | O3 | O4;
} = dual(
  2,
  <E, A, O1, O2 = O1, O3 = O1, O4 = O1>(
    self: RemoteData<E, A>,
    {
      onNotAsked,
      onLoading,
      onFailure,
      onSuccess,
    }: {
      readonly onNotAsked: () => O1;
      readonly onLoading: () => O2;
      readonly onFailure: (error: E) => O3;
      readonly onSuccess: (data: A) => O4;
    },
  ): O1 | O2 | O3 | O4 => {
    if (isNotAsked(self)) {
      return onNotAsked();
    }

    if (isLoading(self)) {
      return onLoading();
    }

    if (isFailure(self)) {
      return onFailure(self.error);
    }

    return onSuccess(self.data);
  },
);

export const toOption: <E, A>(
  remoteData: RemoteData<E, A>,
) => Option.Option<A> = match({
  onNotAsked: Option.none,
  onLoading: Option.none,
  onFailure: Option.none,
  onSuccess: Option.some,
});

export const fromOption: <E, A>(option: Option.Option<A>) => RemoteData<E, A> =
  Option.match({
    onNone: () => notAsked(),
    onSome: data => success(data),
  });

export const fromEither: <E, A>(
  either: Either.Either<E, A>,
) => RemoteData<E, A> = Either.match({
  onLeft: left => failure(left),
  onRight: right => success(right),
});
