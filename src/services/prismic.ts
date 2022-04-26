import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

import sm from '../../sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

export function createClient(
  config: prismic.ClientConfig | undefined = {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  },
) {
  const client = prismic.createClient(endpoint, { ...config });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
}
