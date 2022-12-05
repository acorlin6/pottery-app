# !/bin/bash

npm i
npm run generate-schemas
npm run check

npm run esbuild
zip -j function.zip dist/app.js node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node
aws lambda update-function-code --function-name app-function --zip-file fileb://function.zip > /dev/null