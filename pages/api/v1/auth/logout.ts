import { SafeAny } from '@/models/common';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SafeAny>,
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Not found!' });
  }

  const cookies = new Cookies(req, res);
  cookies.set('access_token');

  return res.status(200).json({ message: 'You have already logout!' });
}
