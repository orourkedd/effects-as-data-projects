# Express

This example shows how to use `effects-as-data` with Express.  By using `effects-as-data` with Express, you can write complex middleware and business logic using only easy-to-test, pure, deterministic functions.

## Request Handling Diagram
![Effects-as-data HTTP Architecture](https://s3-us-west-2.amazonaws.com/effects-as-data/http-effects-as-data-v4.png)

1) Client makes HTTP request.
```
//  Post Body
{
  "content": "foo bar baz"
}
```

2) Request is routed to pure business logic function.

3) Business logic function yields an action(s) to the E13A runtime.  An action is a JSON object with a `type` field and some metadata describing a side effect operation. The E13A runtime routes the action to a side effect handler.
```
//  Write file action.  This is the output of actions.writeFile(...)
{
  type: 'node',
  module: 'fs',
  function: 'writeFile',
  args: ['content.txt', { content: "foo bar baz" }, { encoding: 'utf8' }]
}
```

4) The side effect handler performs the operation described by the action and returns the result to E13A.

5) E13A gets the return value from the business logic functions, wraps it as an HTTP response, and sends it to the client.

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

### Zen - Something a little more complex with multiple side effects
```
curl http://localhost:3000/zen
```
