import 'server-only';

import { createClient } from 'next-sanity';

const sanityServerClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: '2021-10-21',
});

export default sanityServerClient;
