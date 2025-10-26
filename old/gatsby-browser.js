import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const wrapRootElement = ({ element }) => (
  <>
    {element}
    <Analytics />
    <SpeedInsights />
  </>
);
