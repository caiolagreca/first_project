# Swagger API Documentation Guide

## Overview
This project now includes automatic Swagger/OpenAPI documentation for all API endpoints. The documentation is dynamically generated from JSDoc-style annotations in the route files.

## Features
- 🔄 **Dynamic Documentation**: Automatically generated from code annotations
- 🔐 **Authentication Support**: JWT Bearer token authentication for protected endpoints
- 🌐 **Multiple API Versions**: Separate documentation for v1 (authenticated) and p1 (public) endpoints
- 📝 **Interactive Testing**: Try out API endpoints directly from the documentation
- 📦 **Export Capability**: Generate standalone swagger.json file

## Access Documentation

### During Development
Once the server is running, access the Swagger UI at:
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json

### Production
Replace `localhost:3000` with your production domain.

## Available Endpoints

### Public Endpoints (p1)
- `GET /p1/challenge` - Get all challenges (no authentication required)

### Authenticated Endpoints (v1)
All v1 endpoints require JWT Bearer token authentication:
- `GET /v1/challenge` - Get all challenges
- `GET /v1/challenge/:id` - Get a specific challenge
- `POST /v1/challenge` - Create a new challenge
- `PUT /v1/challenge/:id` - Update a challenge (full update)
- `PATCH /v1/challenge/:id` - Update a challenge (partial update)
- `DELETE /v1/challenge/:id` - Delete a challenge

## Using Authentication in Swagger UI

1. Click the **"Authorize"** button (lock icon) at the top right
2. Enter your JWT token in the format: `Bearer YOUR_TOKEN_HERE` or just `YOUR_TOKEN_HERE`
3. Click **"Authorize"** to save
4. All subsequent requests will include this token

## Generate Swagger JSON File

To generate a standalone `swagger.json` file:

```bash
npm run swagger:generate
```

This will create a `swagger.json` file in the project root directory.

## Adding Documentation to New Routes

When creating new route files, use JSDoc-style annotations:

### Example: Basic GET endpoint

```typescript
/**
 * @swagger
 * /v1/resource:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [v1/resource]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', (req, res) => {
  // Handler code
});
```

### Example: POST endpoint with request body

```typescript
/**
 * @swagger
 * /v1/resource:
 *   post:
 *     summary: Create a new resource
 *     tags: [v1/resource]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Resource Name"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.post('/', (req, res) => {
  // Handler code
});
```

### Example: Endpoint with path parameters

```typescript
/**
 * @swagger
 * /v1/resource/{id}:
 *   get:
 *     summary: Get resource by ID
 *     tags: [v1/resource]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource found
 */
router.get('/:id', (req, res) => {
  // Handler code
});
```

## Adding New Schemas

To add new data models to the documentation, edit `src/config/swagger.config.ts`:

```typescript
components: {
  schemas: {
    YourNewModel: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier"
        },
        name: {
          type: "string",
          description: "Model name"
        }
      }
    }
  }
}
```

## Configuration

The Swagger configuration is located in:
- **Config**: `src/config/swagger.config.ts`
- **Helper Functions**: `src/helpers/swagger.helper.ts`

### Customization Options

In `swagger.config.ts`, you can customize:
- API title and description
- Server URLs
- Authentication schemes
- Response schemas
- Tags and groupings

## Troubleshooting

### Documentation not showing new routes
1. Ensure annotations are properly formatted with `@swagger` tag
2. Check that the route file matches the glob pattern in `swagger.config.ts`
3. Restart the server to regenerate documentation

### Authentication not working
1. Verify token format: `Bearer YOUR_TOKEN`
2. Check that the token is valid and not expired
3. Ensure the endpoint has `security: - bearerAuth: []` in its annotation

### Changes not reflected
The documentation is generated at server startup. Restart the server to see changes.

## Best Practices

1. **Be Descriptive**: Write clear summaries and descriptions
2. **Use Examples**: Include example values for better understanding
3. **Group Endpoints**: Use consistent tags for related endpoints
4. **Document Errors**: Include all possible response codes
5. **Keep Updated**: Update documentation when changing endpoints

## Scripts

- `npm start` - Build and start server with Swagger
- `npm run start:dev` - Development mode with auto-reload
- `npm run swagger:generate` - Generate standalone swagger.json
- `npm run build` - Build TypeScript files

## Resources

- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express Documentation](https://github.com/scottie1984/swagger-ui-express)
