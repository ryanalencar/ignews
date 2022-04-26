import { exitPreview } from '@prismicio/next';

export default async function exit(req: any, res: any) {
  await exitPreview({ res, req });
}
