import React, { ComponentType, Suspense } from 'react';

export const withSuspense = (Wrapped: ComponentType<any>) => () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Wrapped />
  </Suspense>
);
