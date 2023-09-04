import * as Either from '@effect/data/Either';
import { pipe } from '@effect/data/Function';
import * as Option from '@effect/data/Option';
import { describe, expect, it } from 'vitest';
import * as RemoteData from './RemoteData';

describe('RemoteData', () => {
  describe('notAsked', () => {
    it('returns the `NotAsked` variant', () => {
      expect(RemoteData.notAsked()).toEqual<
        RemoteData.RemoteData<never, never>
      >({
        tag: 'NotAsked',
      });
    });
  });

  describe('loading', () => {
    it('returns the `Loading` variant', () => {
      expect(RemoteData.loading()).toEqual<RemoteData.RemoteData<never, never>>(
        {
          tag: 'Loading',
        },
      );
    });
  });

  describe('failure', () => {
    it('returns the `Failure` variant with the error', () => {
      expect(RemoteData.failure(new Error('Internal Server Error'))).toEqual<
        RemoteData.RemoteData<Error, never>
      >({
        tag: 'Failure',
        error: new Error('Internal Server Error'),
      });
    });
  });

  describe('success', () => {
    interface Movie {
      title: string;
    }

    it('returns the `Success` variant with the fetched data', () => {
      expect(
        RemoteData.success([{ title: 'Inception' }] satisfies Movie[]),
      ).toEqual<RemoteData.RemoteData<never, Movie[]>>({
        tag: 'Success',
        data: [{ title: 'Inception' }],
      });
    });
  });

  describe('match', () => {
    describe('when used data-last', () => {
      it('calls `onNotAsked` when given a `NotAsked`', () => {
        expect(
          pipe(
            RemoteData.notAsked(),
            RemoteData.match({
              onNotAsked: () => 'not_asked',
              onLoading: () => 'loading',
              onFailure: () => 'failure',
              onSuccess: () => 'success',
            }),
          ),
        ).toEqual('not_asked');
      });

      it('calls `onLoading` when given a `Loading`', () => {
        expect(
          pipe(
            RemoteData.loading(),
            RemoteData.match({
              onNotAsked: () => 'not_asked',
              onLoading: () => 'loading',
              onFailure: () => 'failure',
              onSuccess: () => 'success',
            }),
          ),
        ).toEqual('loading');
      });

      it('calls `onFailure` when given a `Failure`', () => {
        expect(
          pipe(
            RemoteData.failure('bad'),
            RemoteData.match({
              onNotAsked: () => 'not_asked',
              onLoading: () => 'loading',
              onFailure: () => 'failure',
              onSuccess: () => 'success',
            }),
          ),
        ).toEqual('failure');
      });

      it('calls `onSuccess` when given a `Success`', () => {
        expect(
          pipe(
            RemoteData.success('good'),
            RemoteData.match({
              onNotAsked: () => 'not_asked',
              onLoading: () => 'loading',
              onFailure: () => 'failure',
              onSuccess: () => 'success',
            }),
          ),
        ).toEqual('success');
      });
    });

    describe('when used data-first', () => {
      it('calls `onNotAsked` when given a `NotAsked`', () => {
        expect(
          RemoteData.match(RemoteData.notAsked(), {
            onNotAsked: () => 'not_asked',
            onLoading: () => 'loading',
            onFailure: () => 'failure',
            onSuccess: () => 'success',
          }),
        ).toEqual('not_asked');
      });

      it('calls `onLoading` when given a `Loading`', () => {
        expect(
          RemoteData.match(RemoteData.loading(), {
            onNotAsked: () => 'not_asked',
            onLoading: () => 'loading',
            onFailure: () => 'failure',
            onSuccess: () => 'success',
          }),
        ).toEqual('loading');
      });

      it('calls `onFailure` when given a `Failure`', () => {
        expect(
          RemoteData.match(RemoteData.failure('bad'), {
            onNotAsked: () => 'not_asked',
            onLoading: () => 'loading',
            onFailure: () => 'failure',
            onSuccess: () => 'success',
          }),
        ).toEqual('failure');
      });

      it('calls `onSuccess` when given a `Success`', () => {
        expect(
          RemoteData.match(RemoteData.success('good'), {
            onNotAsked: () => 'not_asked',
            onLoading: () => 'loading',
            onFailure: () => 'failure',
            onSuccess: () => 'success',
          }),
        ).toEqual('success');
      });
    });
  });

  describe('toOption', () => {
    it('turns a `NotAsked` into a `None`', () => {
      expect(pipe(RemoteData.notAsked(), RemoteData.toOption)).toEqual(
        Option.none(),
      );
    });

    it('turns a `Loading` into a `None`', () => {
      expect(pipe(RemoteData.loading(), RemoteData.toOption)).toEqual(
        Option.none(),
      );
    });

    it('turns a `Failure` into a `None`', () => {
      expect(pipe(RemoteData.failure('bad'), RemoteData.toOption)).toEqual(
        Option.none(),
      );
    });

    it('turns a `Success` into a `Some`', () => {
      expect(pipe(RemoteData.success('good'), RemoteData.toOption)).toEqual(
        Option.some('good'),
      );
    });
  });

  describe('fromOption', () => {
    describe('when used data-last', () => {
      it('turns a `None` into a `NotAsked`', () => {
        expect(pipe(Option.none(), RemoteData.fromOption)).toEqual(
          RemoteData.notAsked(),
        );
      });
    });

    describe('when used data-first', () => {
      it('turns a `None` into a `NotAsked`', () => {
        expect(RemoteData.fromOption(Option.none())).toEqual(
          RemoteData.notAsked(),
        );
      });
    });
  });

  describe('fromEither', () => {
    describe('when used data-last', () => {
      it('turns a `Left` into a `Failure`', () => {
        expect(pipe(Either.left('bad'), RemoteData.fromEither)).toEqual(
          RemoteData.failure('bad'),
        );
      });

      it('turns a `Right` into a `Success`', () => {
        expect(pipe(Either.right('good'), RemoteData.fromEither)).toEqual(
          RemoteData.success('good'),
        );
      });
    });

    describe('when used data-first', () => {
      it('turns a `Left` into a `Failure`', () => {
        expect(RemoteData.fromEither(Either.left('bad'))).toEqual(
          RemoteData.failure('bad'),
        );
      });

      it('turns a `Right` into a `Success`', () => {
        expect(RemoteData.fromEither(Either.right('good'))).toEqual(
          RemoteData.success('good'),
        );
      });
    });
  });
});
