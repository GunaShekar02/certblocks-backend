import l from '../../common/logger';
import { API_KEY } from '../../common/config';

// eslint-disable-next-line no-unused-vars, no-shadow
export default function hasAPIKey(req, res, next) {
  const key = req.headers.authorization || req.headers.Authorization;
  if (key === API_KEY) next();
  else res.status(401).json({ message: 'Invalid API Key.' });
}
