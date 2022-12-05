## Backend

The backend is hosted in a lambda function at https://whtcem2sxikf6dkcn5nfvxfjmi0hdjxx.lambda-url.us-east-1.on.aws/
It's ARN is arn:aws:lambda:us-east-1:190614199940:function:app-function

### Running

The app can be run locally with

```bash
npm run start
```

### Lint

Linting steps can be run individually as

```bash
npm run lint:typecheck
npm run lint:prettier
```

Or in parallel alltogether as

```bash
npm run lint
```

### Test

Tests are written with [jest](https://jestjs.io/) and can be run with

```bash
npm run test
```

or for code coverage

```bash
npm run test-cov
```

### Build

We are using [esbuild](https://esbuild.github.io/) as a bundler and transpiler,
a bundled JS file can be built with

```bash
npm run esbuild
```

which will result in a file `dist/app.js` that can be run with node 18 via

```bash
node dist/app.js
```

### Lint, Test, Build and Deploy

The backend can be built and deployed with:

```bash
sh backend/deploy.sh
```

Note that linting and tests must pass for the deployment to happen.
