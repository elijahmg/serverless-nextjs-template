Serverless part of models dashboard

### Server description

Server is a numbers of separate lambda functions to provider 'server'-like functionality for client side

### Development

During development functions inserted into express server as simple REST endpoints what gives an option to invoke
functions locally. AWS credentials must be set locally to proceed with development.

```
// Run local server
yarn dev
```

### Deployment

Deployment is done by serverless framework

`yarn deploy:stack`
