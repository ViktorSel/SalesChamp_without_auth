import config from 'config';
import _ from 'underscore';
import { get } from 'lodash';
import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions,
} from '../service/session.service';
import { sign } from '../utils/jwt.utils';
import { SessionDocument } from '../model/session.model';
import { number } from 'yup';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
  const sessionId = get(req, 'user.session');

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const sessions = await findSessions({ user: userId, valid: true });
  
  if (sessions.length) {
    const lastModifiedSession = _.max(sessions, function (el) {
      return new Date(el.updatedAt).getTime();
    });
    if (typeof lastModifiedSession == 'number') res.append('Last-Modified', (new Date(lastModifiedSession)).toUTCString());
    else if (typeof lastModifiedSession == 'object') res.append('Last-Modified', (new Date(lastModifiedSession.updatedAt)).toUTCString());
  }

  return res.send(sessions);
}