import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createAddress,
  findAddress,
  findAllAddress,
  findAndUpdate,
  deleteAddress,
} from '../service/address.service';

export async function createAddressHandler(req: Request, res: Response) {
  const body = req.body;
  const Location = get(req, 'path');
  
  res.setHeader('Location', Location);

  const address = await createAddress(body);

  return res.status(201).json(address)
}

export async function updateAddressHandler(req: Request, res: Response) {
  const addressId = get(req, 'params.addressId');
  const update = req.body;
  const Location = get(req, 'path');
  
  res.setHeader('Location', Location);

  const address = await findAddress({ _id:addressId });

  if (!address) {
    return res.sendStatus(404);
  }

  if ((address && address.status == null) || (address && address.status == 'not at home')) {

    const updatedAddress = await findAndUpdate({ _id:addressId }, update, { new: true });
    
    if (updatedAddress) {
      return res.send(updatedAddress);
    }
    else return res.sendStatus(404);

  }
  else return res.sendStatus(403);
}
export async function getAddressHandler(req: Request, res: Response) {
  const addressId = get(req, 'params.addressId');
  let address = await findAddress({ _id:addressId });
  const Location = get(req, 'path');
  
  res.setHeader('Location', Location);

    if (!address) {
    return res.sendStatus(404);
  }

  return res.send(address);
}

export async function getAllAddressHandler(req: Request, res: Response) {

  let address = await findAllAddress({});
  const Location = get(req, 'path');
  
  res.setHeader('Location', Location);

  if (!address || (address && address.length == 0)) {
    return res.sendStatus(404);
  }

  return res.send(address);
}

export async function deleteAddressHandler(req: Request, res: Response) {

  const addressId = get(req, 'params.addressId');
  const Location = get(req, 'path');

  res.setHeader('Location', Location);

  const address = await findAddress({ addressId });

  if (!address) {
    return res.sendStatus(404);
  }

  await deleteAddress({ addressId });

  return res.sendStatus(204);
}