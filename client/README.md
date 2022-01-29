Client side for models dashboard

## Getting Started

Install all dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
```

### Deployment

Deployment is done by serverless framework. Currently, API gateway endpoint received after deploy must be set in AWS for
CloudFront for https://imagepipeline.webt00ls.de manually.

1. Before main deployment install dependencies in .next-server/deps/nodejs (Lambda layer dependencies)
2. Remove .next folder after development cycle (without deleting, development chunk will be packed into zip lambda which
   will bloat lambda size drastically)
3. Run `yarn build` to build production
4. Deploy

Command to deploy

```bash
yarn deploy:stack
```
