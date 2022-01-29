import next from 'next';
import { parse } from 'url';
const serverless = require('serverless-http');

const app = next({ dev: false });

const requestHandler = app.getRequestHandler();

export const handler = serverless(async (req: any, res: any) => {
	const parsedUrl = parse(req.url, true);
	await requestHandler(req, res, parsedUrl);
});
