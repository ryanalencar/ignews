import { setPreviewData, redirectToPreviewURL } from '@prismicio/next';

import { createClient } from '../../services/prismic';

export default async (req: any, res: any) => {
  const client = createClient({ req });
  await setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};
