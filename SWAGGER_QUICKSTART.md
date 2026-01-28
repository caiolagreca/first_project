# Swagger Documentation - Quick Start

## 🚀 Quick Start

### 1. Start the Server
```bash
npm run start:dev
```

### 2. Access Documentation
Open your browser and navigate to:
```
http://localhost:3000/api-docs
```

### 3. Test Authenticated Endpoints
1. Click the **Authorize** button (🔒)
2. Enter your JWT token
3. Click **Authorize**
4. Try out the endpoints!

## 📋 What Was Implemented

### ✅ Core Files Created
- `src/config/swagger.config.ts` - Swagger/OpenAPI configuration
- `src/helpers/swagger.helper.ts` - Helper functions for Swagger setup
- `src/scripts/generate-swagger.ts` - Script to generate swagger.json file

### ✅ Route Annotations Added
- **v1/challenge.route.ts** - Full CRUD operations (authenticated)
  - GET /v1/challenge - List all challenges
  - GET /v1/challenge/:id - Get specific challenge
  - POST /v1/challenge - Create challenge
  - PUT /v1/challenge/:id - Full update
  - PATCH /v1/challenge/:id - Partial update
  - DELETE /v1/challenge/:id - Delete challenge

- **p1/challenge.route.ts** - Public endpoints
  - GET /p1/challenge - Public list of challenges

### ✅ Features
- 🔐 JWT Bearer token authentication
- 📝 Comprehensive schema definitions
- 🎨 Clean, interactive UI
- 📦 Export to swagger.json
- 🔄 Dynamic generation from code
- 📚 Detailed examples and descriptions

## 🎯 Available Commands

```bash
# Start server with Swagger
npm start

# Development mode with auto-reload
npm run start:dev

# Generate swagger.json file
npm run swagger:generate

# Build TypeScript
npm run build
```

## 📍 API Endpoints

### Public Endpoints (No Auth Required)
- `GET http://localhost:3000/p1/challenge`

### Authenticated Endpoints (Requires Bearer Token)
- `GET http://localhost:3000/v1/challenge`
- `GET http://localhost:3000/v1/challenge/:id`
- `POST http://localhost:3000/v1/challenge`
- `PUT http://localhost:3000/v1/challenge/:id`
- `PATCH http://localhost:3000/v1/challenge/:id`
- `DELETE http://localhost:3000/v1/challenge/:id`

## 🔑 Authentication

For v1 endpoints, include the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Or use the Authorize button in Swagger UI.

## 📖 Documentation Links

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json
- **Full Guide**: See `SWAGGER_GUIDE.md` for detailed documentation

## 🎨 Swagger UI Features

- **Try It Out**: Test endpoints directly from the browser
- **Authentication**: Persistent JWT token storage
- **Filter**: Search for specific endpoints
- **Examples**: Pre-filled request bodies
- **Schemas**: View all data models
- **Response Codes**: See all possible responses

## 🛠 Adding New Routes

To document a new endpoint, add JSDoc annotations:

```typescript
/**
 * @swagger
 * /v1/your-route:
 *   get:
 *     summary: Your endpoint description
 *     tags: [v1/your-tag]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/your-route', handler);
```

## 📦 Dependencies Installed

```json
{
  "dependencies": {
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.8"
  }
}
```

## ✨ Next Steps

1. Start the server: `npm run start:dev`
2. Visit http://localhost:3000/api-docs
3. Explore the interactive documentation
4. Test the endpoints with your JWT token
5. Add documentation to new routes as you create them

## 📝 Notes

- Documentation is generated at server startup
- Restart the server to see changes
- swagger.json is auto-generated and gitignored
- All v1 routes require authentication
- All p1 routes are public

## 🐛 Troubleshooting

**Can't see my new route?**
- Check the @swagger annotation format
- Ensure the file is in src/routes/**/*.route.ts
- Restart the server

**Authentication not working?**
- Format: `Bearer YOUR_TOKEN` or just `YOUR_TOKEN`
- Click Authorize button first
- Token must be valid JWT

**Server won't start?**
- Run `npm run build` to check for errors
- Verify all dependencies are installed
- Check MongoDB connection

For more details, see `SWAGGER_GUIDE.md`
