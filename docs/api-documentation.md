# API Documentation

The server can expose protected OpenAPI documentation for internal development.
The documentation covers the server's active Express API endpoints across
public, authenticated, admin-only, request-body, and path-parameter flows.

## Enable Locally

From the `server` directory, set `ENABLE_API_DOCS=true` before starting the
server:

```bash
cd server
ENABLE_API_DOCS=true npm start
```

The interactive Swagger UI is available at:

```text
http://localhost:PORT/api-docs
```

The raw OpenAPI JSON is available at:

```text
http://localhost:PORT/api-docs.json
```

When running the app through the Vite frontend on port `3000`, the frontend dev
server proxies these docs routes to the backend:

```text
http://localhost:3000/api-docs
http://localhost:3000/api-docs.json
```

When opening the backend directly, use the backend port. The default local
backend port is `5001`:

```text
http://localhost:5001/api-docs
http://localhost:5001/api-docs.json
```

Both routes require an authenticated `isAdmin` user. The API accepts JWT auth
from either the `jwt` cookie or an `Authorization: Bearer <token>` header.
API docs are never mounted when `NODE_ENV=production`; `/api-docs` and
`/api-docs.json` return `404` in production.

Swagger UI only enables "Try it out" for `GET` operations. Non-GET operations
are documented for reference, but cannot be executed from the docs UI.

## Adding Endpoint Docs

Reusable request schemas live in `server/app/schemas` and are exposed as
OpenAPI components from `server/app/docs/openapi.js`. The complete endpoint
catalog is assembled in `server/app/docs/openapi-paths.js`; route-adjacent
`@openapi` JSDoc blocks in `server/app/routes/*.routes.js` are also supported
for endpoints that are easier to document beside the route.

When documenting a new endpoint, include:

- route path under the `/api` base path
- method, summary, and tag
- path parameters when present
- request body schema for write endpoints
- auth requirements matching the route middleware
- expected success and error responses

Keep docs close to the route that owns the behavior so future route changes are
easy to review with their OpenAPI changes.
