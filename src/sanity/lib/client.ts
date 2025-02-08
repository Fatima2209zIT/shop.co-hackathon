import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export default client;
