import { IPostModel } from '../../mongo/models/post';

export default {
  create: {
    request: {} as IPostModel,
    response: {} as IPostModel,
  },
  listAll: {
    request: {} as {},
    response: {} as IPostModel[],
  },
  remove: {
    request: {} as { id: string },
    response: {} as {
      ok?: number,
      n?: number,
    } & { deletedCount?: number },
  },
  update: {
    request: {} as IPostModel,
    response: {} as {
      n: number,
      nModified: number,
      ok: number,
    },
  }
};
