# week2-node-express

A simple Express API built for the Week 2 assignment.

## Setup

```bash
npm install
cp .env.example .env   # set PORT if you like
npm start
```

## Endpoints

| Method | Route       | Description                                   |
|--------|-------------|-----------------------------------------------|
| GET    | `/`         | Static HTML page (browser); `/api` returns "My Week 2 API!" |
| POST   | `/user`     | Body `{name, email}` → "Hello, [name]!" (400 if missing) |
| GET    | `/user/:id` | "User [id] profile"                           |

## Test with curl

```bash
curl http://localhost:3000/api
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Glory","email":"glory@example.com"}'
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Glory"}'   # 400
curl http://localhost:3000/user/5
```

A custom middleware logs every request (method + URL) to the console.
