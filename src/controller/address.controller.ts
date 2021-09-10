import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createAddress,
  findAddress,
  findAndUpdate,
  deleteAddress,
} from '../service/address.service';

export async function createAddressHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;

  const address = await createAddress({ ...body, user: userId });

  return res.send(address);
}

export async function updateAddressHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const addressId = get(req, 'params.addressId');
  const update = req.body;

  const address = await findAddress({ addressId });

  if (!address) {
    return res.sendStatus(404);
  }

  if (String(address.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedAddress = await findAndUpdate({ addressId }, update, { new: true });

  return res.send(updatedAddress);
}
export async function getAddressHandler(req: Request, res: Response) {
  const addressId = get(req, 'params.addressId');
  const address = await findAddress({ addressId });

  if (!address) {
    return res.sendStatus(404);
  }

  return res.send(address);
}

export async function deleteAddressHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const addressId = get(req, 'params.postId');

  const address = await findAddress({ addressId });

  if (!address) {
    return res.sendStatus(404);
  }

  if (String(address.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteAddress({ addressId });

  return res.sendStatus(200);
}