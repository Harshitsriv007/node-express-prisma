### Start mongodb
brew services start mongodb-community@7.0

### Login
mongosh


### TEST CREATE USER + POST

### CREATE

`{
    "email": "alice@example.com",
    "name": "Alice",
    "posts": {
        "create": [
        {
            "title": "Alice Post 1",
            "content": "Hello from Alice",
            "published": true
        }
        ]
    }
}`

### update User

`URL = http://localhost:8000/api/v1/:id`
`{
    "email": "alice1@example.com",
    "name": "Alice1",
    "posts": {
      "create": [
        {
          "title": "Alice Post 2",
          "content": "Hello from Alice 2",
          "published": false
        }
      ]
    }
}`