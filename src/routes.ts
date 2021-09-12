import { Express, Request, Response } from 'express';
import {
  createAddressHandler,
  updateAddressHandler,
  getAddressHandler,
  deleteAddressHandler,
  getAllAddressHandler,
} from './controller/address.controller';
import { createUserHandler } from './controller/user.controller';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import { validateRequest, requiresUser } from './middleware';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schema/user.schema';
import {
  createAddressSchema,
  updateAddressSchema,
  deleteAddressSchema,
} from './schema/address.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  // Logout
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

  //Create a address
  app.post(
    '/address',
    [validateRequest(createAddressSchema)],
    createAddressHandler
  );

 // Update a address
  app.patch(
    '/address/:addressId',
    [validateRequest(updateAddressSchema)],
    updateAddressHandler
  );

   //Get all address
  app.get('/address', getAllAddressHandler);

  //Get a address
  app.get('/address/:addressId', getAddressHandler);

  //Delete a address
  app.delete(
    '/address/:addressId',
    [validateRequest(deleteAddressSchema)],
    deleteAddressHandler
  );
}