install:
	npm install

start:
	npm run ts-node -- src/bin/gendiff.js

publish:
	npm publish

lint:
	npm run lint

test:
	npm test

build:
	npm run build
