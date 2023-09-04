import { describe, it, expect } from 'vitest';
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
});
