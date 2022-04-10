import { SafeAny } from '@/models/common';
import Cookies from 'cookies';
import type { ProxyResCallback } from 'http-proxy';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxyServer = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SafeAny>,
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Not found!' });
  }

  req.headers.cookie = '';

  proxyServer.web(req, res, {
    target: process.env.NEXT_PUBLIC_API_ENDPOINT,
    changeOrigin: true,
    selfHandleResponse: true,
    secure: false,
  });

  proxyServer.on('proxyReq', (proxyReq, req: any) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });

  return new Promise((resolve) => {
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      const body: Uint8Array[] = [];

      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });

      proxyRes.on('end', () => {
        try {
          const response = JSON.parse(body.toString());
          const accessToken = response.data.token;

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });

          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(2030, 1, 1),
          });

          (res as NextApiResponse).status(200).json(response);
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'Something went wrong.' });
        }
      });

      resolve(true);
    };

    proxyServer.once('proxyRes', handleLoginResponse);
  });
}
