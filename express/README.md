# Express

This example shows how to use `effects-as-data` with Express.  By using `effects-as-data` with Express, you can write complex middleware and business logic using only easy-to-test, pure, deterministic functions.

## Getting Started

### Install
```
npm install
```

### Testing
```
npm test
```

### Start
```
npm start
```

## Routes

### Hello World
```
curl http://localhost:3000
```

### Write the string "foo" to a file
```
curl -X PUT \
  http://localhost:3000/content \
  -H 'content-type: application/json' \
  -d '{
	"content": "foo"
}'
```

### Read the contents of the file
```
curl http://localhost:3000/content
```
