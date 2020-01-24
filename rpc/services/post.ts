import { ModuleRpcServer } from 'rpc_ts/lib/server';
import { ModuleRpcCommon } from 'rpc_ts/lib/common';
import { ModuleRpcProtocolServer } from 'rpc_ts/lib/protocol/server';
import { IPostModel } from '../../mongo/models/post';
import { mongo } from '../../mongo';

const service = {
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

const serviceHandler: ModuleRpcServer.ServiceHandlerFor<typeof service> = {
  async create(request) {
    const post = new mongo.Post(request);
    const resp = await post.save();
    return resp;
  },
  async listAll(request) {
    const query = mongo.Post.find();
    const posts = await query.exec();
    return posts;
  },
  async remove(request) {
    const { id } = request;
    const query = mongo.Post.deleteOne({ _id: id })
    const resp = await query.exec();
    if (resp.deletedCount === 0) {
      throw new ModuleRpcServer.ServerRpcError(
        ModuleRpcCommon.RpcErrorType.notFound,
        `post with id '${id}' not found`,
      );
    }
    return resp;
  },
  async update(request) {
    const { id, ...rest } = request;
    const query = mongo.Post.updateOne({ _id: id }, rest)
    const resp = await query.exec();
    return resp;
  }
};

export default ModuleRpcProtocolServer.registerRpcRoutes(service, serviceHandler);
