import { Request, Response, NextFunction } from 'express';
import { ModuleRpcProtocolClient } from "rpc_ts/lib/protocol/client";
import service from '../services/post';

const RPC_URI: string = process.env.RPC_URI || 'http://typescript-rpc-api_rpc_1:8500';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await ModuleRpcProtocolClient.getRpcClient(
      service,
      {
        remoteAddress: RPC_URI,
      }
    ).create(req.body);

    res.json(post);
  } catch (e) {
    next(e);
  }
}

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await ModuleRpcProtocolClient.getRpcClient(
      service,
      {
        remoteAddress: RPC_URI,
      }
    ).listAll(req.body);

    res.json(posts);
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await ModuleRpcProtocolClient.getRpcClient(
      service,
      {
        remoteAddress: RPC_URI,
      }
    ).remove(req.body);

    res.status(200).json();
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    await ModuleRpcProtocolClient.getRpcClient(
      service,
      {
        remoteAddress: RPC_URI,
      }
    ).update(req.body);

    res.status(200).json();
  } catch (e) {
    next(e);
  }
}

export { create, list, remove, update };
