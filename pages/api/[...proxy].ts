import { SafeAny } from '@/models/common';
import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxyServer = httpProxy.createProxyServer();

proxyServer.on('proxyReq', (proxyReq, req: any) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SafeAny>,
) {
  req.headers.cookie = '';
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get('access_token');

  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }

  proxyServer.web(req, res, {
    target: process.env.NEXT_PUBLIC_API_ENDPOINT,
    changeOrigin: true,
    selfHandleResponse: false,
  });

  return new Promise((resolve) => {
    proxyServer.once('proxyRes', () => resolve(true));
  });
}
