# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added predicate functions:
  - `RemoteData.isNotAsked`
  - `RemoteData.isLoading`
  - `RemoteData.isFailure`
  - `RemoteData.isSuccess`
- Added `RemoteData.match`
- Added `RemoteData.toOption`
- Added `RemoteData.fromOption`
- Added `RemoteData.fromEither`

## [1.0.0] - 2023-09-04

### Added

- Added `RemoteData` type

[unreleased]: https://github.com/maxdeviant/effect-remote-data/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/maxdeviant/effect-remote-data/compare/26a01d6...v1.0.0
