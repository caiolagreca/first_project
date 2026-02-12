import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "First Project API Documentation",
            version: "1.0.0",
            description: "Dynamic API documentation for First Project with v1 (authenticated) and p1 (public) endpoints",
            contact: {
                name: "API Support",
                email: "support@firstproject.com"
            },
            license: {
                name: "ISC",
                url: "https://opensource.org/licenses/ISC"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server"
            },
            {
                url: "http://localhost:3000/v1",
                description: "Version 1 API (Authenticated)"
            },
            {
                url: "http://localhost:3000/p1",
                description: "Public API V1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token"
                }
            },
            schemas: {
                PlacesDetailsFormModel: {
                    type: "object",
                    required: ["textQuery"],
                    properties: {
                        textQuery: {
                            type: "string",
                            example: "pizza near Sydney"
                        }
                    }
                },
                PlaceDetailsModel: {
                    type: "object",
                    properties: {
                        places: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string", example: "ChIJN1blFLsB60sR8aYjCbg_AAE" },
                                    formattedAddress: { type: "string", example: "123 Main St, Sydney" },
                                    displayName: {
                                        type: "object",
                                        properties: {
                                            text: { type: "string", example: "Pizza Place" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                Challenge: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Challenge ID",
                            example: "507f1f77bcf86cd799439011"
                        },
                        name: {
                            type: "string",
                            description: "Challenge name",
                            example: "My Challenge"
                        },
                        userId: {
                            type: "string",
                            description: "User ID who created the challenge",
                            example: "507f191e810c19729de860ea"
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            description: "Challenge creation date",
                            example: "2026-01-27T10:00:00Z"
                        }
                    }
                },
                ChallengeInput: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                            description: "Challenge name",
                            example: "New Challenge"
                        },
                        userId: {
                            type: "string",
                            description: "User ID (optional)",
                            example: "507f191e810c19729de860ea"
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            description: "Challenge date (optional)",
                            example: "2026-01-27T10:00:00Z"
                        }
                    }
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        data: {
                            type: "object",
                            description: "Response data"
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Error message"
                                },
                                code: {
                                    type: "string",
                                    example: "ERROR_CODE"
                                }
                            }
                        }
                    }
                }
                ,
                ChallengeComment: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Comment ID",
                            example: "609e129e8bfa4b0015b708a1"
                        },
                        text: {
                            type: "string",
                            description: "Comment text",
                            example: "Great challenge!"
                        },
                        userId: {
                            type: "string",
                            description: "User ID who wrote the comment",
                            example: "507f191e810c19729de860ea"
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            description: "Comment date",
                            example: "2026-01-27T12:00:00Z"
                        },
                        challengeId: {
                            type: "string",
                            description: "Challenge ID this comment belongs to",
                            example: "507f1f77bcf86cd799439011"
                        }
                    }
                },
                ChallengeCommentInput: {
                    type: "object",
                    required: ["text", "userId"],
                    properties: {
                        text: {
                            type: "string",
                            description: "Comment text",
                            example: "Great challenge!"
                        },
                        userId: {
                            type: "string",
                            description: "User ID",
                            example: "507f191e810c19729de860ea"
                        },
                        challengeId: {
                            type: "string",
                            description: "Challenge ID"
                        }
                    }
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Access token is missing or invalid",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse"
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: "Resource not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse"
                            }
                        }
                    }
                },
                ValidationError: {
                    description: "Validation error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse"
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: "v1/challenge",
                description: "Challenge management endpoints (Authenticated)"
            },
            {
                name: "p1/challenge",
                description: "Public challenge endpoints (Read-only)"
            }
            ,
            {
                name: "p1/challenge-comments",
                description: "Public challenge comment endpoints (Read-only)"
            },
            {
                name: "v1/challenge-comments",
                description: "Challenge comment endpoints (Authenticated)"
            }
        ]
    },
    apis: [
        "./src/routes/**/*.route.ts",
        "./src/routes/**/*.route.js",
        "./dist/routes/**/*.route.js"
    ]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
