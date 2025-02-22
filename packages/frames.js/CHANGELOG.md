# frames.js

## 0.1.1

### Patch Changes

- 40d0ad7: feat: Add `getFrameMessage`, which parse frame action payloads and optionally fetches additional context from hubs.

  feat(debugger): Forward unmocked hub requests to an actual hub.

- 57649be: Add a helper function to retrieve the user data for an FID
- 518ada3: custom redirects handling for long redirect urls

## 0.1.0

### Minor Changes

- 1a73918: fix: Breaking change! `validateFrameMessage` & `getAddressForFid` now take an optional `hubHttpUrl` parameter to allow for custom hub URLs instead of env vars.

  If you were using `getAddressForFid`, you no longer need to include the second `hubClient` argument. Instead, you can optionally pass the `hubHttpUrl` in the second argument.

  ```ts
  const address = getAddressForFid(fid);
  // or
  const address = getAddressForFid(fid, { hubHttpUrl: "..." });
  ```

- 1598cb6: Breaking change! getFrame now returns a { frame, errors } object instead of a frame or null

### Patch Changes

- 99536fb: fix: frame action message creation to not include inputText if inputText was not requested by the frame
- 501861d: corrects nextjs type inaccuracy

## 0.0.4

### Patch Changes

Possibly breaking changes.

- add5abd: Fix inaccurate payload optional type
- fix an incorrect type on payload inputText being optional
- fallbackToCustodyAddress is now a default true option on getAddressForFid
- removes some unneeded internals from being exported

## 0.0.3

### Patch Changes

- Support null as children to FrameContainer

## 0.0.2

### Patch Changes

- 24dc8c5: Extends FrameState type

## 0.0.1

### Patch Changes

- d035f36: feat: fc:frame:input:text support
- 10a79e9: fix: validation via REST API
