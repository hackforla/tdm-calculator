const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const packageJson = require("../../package.json");
const aboutSchema = require("../schemas/about");
const accountConfirmEmailSchema = require("../schemas/account.confirmEmail");
const accountForgotPasswordSchema = require("../schemas/account.forgotPassword");
const accountLoginSchema = require("../schemas/account.login");
const accountRegisterSchema = require("../schemas/account.register");
const accountResetSchema = require("../schemas/account.reset");
const accountRoleSchema = require("../schemas/account.role");
const accountUpdateAccountSchema = require("../schemas/account.updateAccount");
const droSchema = require("../schemas/dro");
const emailSchema = require("../schemas/email");
const faqCategorySchema = require("../schemas/faqCategory");
const feedbackPostSchema = require("../schemas/feedback.post");
const projectSchema = require("../schemas/project");
const projectShareSchema = require("../schemas/projectShare");
const additionalPaths = require("./openapi-paths");

const schemaWithExample = (schema, example) => ({
  ...schema,
  example
});

const mergePaths = (generatedPaths, extraPaths) => {
  const mergedPaths = { ...generatedPaths };

  Object.entries(extraPaths).forEach(([path, methods]) => {
    mergedPaths[path] = {
      ...methods,
      ...(mergedPaths[path] || {})
    };
  });

  return mergedPaths;
};

const openapiSpec = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TDM Calculator API",
      version: packageJson.version,
      description:
        "Internal API documentation for the Transportation Demand Management Calculator."
    },
    servers: [
      {
        url: "/api",
        description: "API base path"
      }
    ],
    tags: [
      { name: "About" },
      { name: "Accounts" },
      { name: "Calculations" },
      { name: "Configs" },
      { name: "Debug" },
      { name: "DRO" },
      { name: "Emails" },
      { name: "FAQ Categories" },
      { name: "Feedback" },
      { name: "Projects" },
      { name: "Project Share" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt"
        }
      },
      schemas: {
        About: aboutSchema,
        AccountConfirmEmail: schemaWithExample(accountConfirmEmailSchema, {
          email: "jane.planner@example.com"
        }),
        AccountForgotPassword: schemaWithExample(accountForgotPasswordSchema, {
          email: "jane.planner@example.com"
        }),
        AccountLogin: schemaWithExample(accountLoginSchema, {
          email: "jane.planner@example.com",
          password: "ExamplePass1!"
        }),
        AccountRegister: schemaWithExample(accountRegisterSchema, {
          firstName: "Jane",
          lastName: "Planner",
          email: "jane.planner@example.com",
          password: "ExamplePass1!"
        }),
        AccountReset: schemaWithExample(accountResetSchema, {
          token: "password-reset-token",
          password: "ExamplePass1!"
        }),
        AccountRole: schemaWithExample(accountRoleSchema, {
          id: 42,
          isAdmin: true,
          isSecurityAdmin: false,
          isDro: false
        }),
        AccountUpdateAccount: schemaWithExample(accountUpdateAccountSchema, {
          firstName: "Jane",
          lastName: "Planner",
          email: "jane.planner@example.com"
        }),
        Config: {
          type: "object",
          required: ["code", "value"],
          properties: {
            code: {
              type: "string"
            },
            value: {
              type: "string"
            },
            description: {
              type: "string"
            }
          },
          example: {
            code: "CURRENT_GUIDELINES_VERSION",
            value: "2025",
            description: "Current program guidelines version."
          }
        },
        Dro: schemaWithExample(droSchema, {
          name: "Central Development Review Office",
          displayOrder: 1
        }),
        Email: schemaWithExample(emailSchema, {
          to: "jane.planner@example.com",
          subject: "TDM Calculator notification",
          text: "Your project has been updated."
        }),
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string"
            }
          }
        },
        FaqCategory: faqCategorySchema,
        FeedbackPost: schemaWithExample(feedbackPostSchema, {
          name: "Jane Planner",
          email: "jane.planner@example.com",
          forwardToWebTeam: false,
          comment: "I have a question about my submitted project.",
          selectedProjects: [101, 102]
        }),
        Project: schemaWithExample(projectSchema, {
          name: "Downtown Mixed Use Project",
          address: "200 N Spring St, Los Angeles, CA 90012",
          description: "Mixed-use development near transit.",
          formInputs: '{"PROJECT_LEVEL":1}',
          loginId: 42,
          calculationId: 1,
          targetPoints: 25,
          earnedPoints: 30,
          projectLevel: 1
        }),
        ProjectShare: schemaWithExample(projectShareSchema, {
          email: "reviewer@example.com",
          projectId: 101
        }),
        MemoryUsage: {
          type: "object",
          properties: {
            rss: {
              type: "string"
            },
            heapTotal: {
              type: "string"
            },
            heapUsed: {
              type: "string"
            },
            external: {
              type: "string"
            }
          },
          example: {
            rss: "120 MB",
            heapTotal: "60 MB",
            heapUsed: "45 MB",
            external: "5 MB"
          }
        },
        ProjectAdminNotes: {
          type: "object",
          required: ["adminNotes"],
          properties: {
            adminNotes: {
              type: "string"
            }
          },
          example: {
            adminNotes: "Reviewed by LADOT staff."
          }
        },
        ProjectCalculationUpdate: {
          type: "object",
          required: ["calculationId"],
          properties: {
            calculationId: {
              type: "number"
            },
            isCalculationIdOverride: {
              type: "boolean"
            },
            targetPoints: {
              type: "number"
            },
            earnedPoints: {
              type: "number"
            },
            projectLevel: {
              type: "number"
            }
          },
          example: {
            calculationId: 2,
            isCalculationIdOverride: true,
            targetPoints: 25,
            earnedPoints: 30,
            projectLevel: 1
          }
        },
        ProjectDroUpdate: {
          type: "object",
          required: ["droId"],
          properties: {
            droId: {
              type: "number"
            },
            loginId: {
              type: "number"
            }
          },
          example: {
            droId: 3,
            loginId: 42
          }
        },
        ProjectIdBody: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "number"
            }
          },
          example: {
            id: 101
          }
        },
        ProjectSnapshot: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: {
              type: "number"
            },
            name: {
              type: "string"
            }
          },
          example: {
            id: 101,
            name: "Downtown Mixed Use Snapshot"
          }
        },
        ProjectStateChange: schemaWithExample(
          {
            type: "object",
            required: ["ids"],
            properties: {
              ids: {
                type: "array",
                items: {
                  type: "number"
                }
              },
              hide: {
                type: "boolean"
              },
              trash: {
                type: "boolean"
              }
            }
          },
          {
            ids: [101, 102],
            trash: true
          }
        ),
        ProjectSubmission: {
          type: "object",
          required: ["id"],
          additionalProperties: true,
          properties: {
            id: {
              type: "number"
            },
            approvalStatus: {
              type: "string"
            },
            adminNotes: {
              type: "string"
            }
          },
          example: {
            id: 101,
            approvalStatus: "Approved",
            adminNotes: "Submission reviewed."
          }
        },
        ProjectTotals: {
          type: "object",
          required: ["id", "targetPoints", "earnedPoints", "projectLevel"],
          properties: {
            id: {
              type: "number"
            },
            targetPoints: {
              type: "number"
            },
            earnedPoints: {
              type: "number"
            },
            projectLevel: {
              type: "number"
            }
          },
          example: {
            id: 101,
            targetPoints: 25,
            earnedPoints: 30,
            projectLevel: 1
          }
        },
        RuleDescriptionUpdate: {
          type: "object",
          required: ["description"],
          properties: {
            description: {
              type: "string"
            }
          },
          example: {
            description: "Updated rule description shown in the calculator."
          }
        }
      },
      responses: {
        BadRequest: {
          description: "Request validation failed."
        },
        Unauthorized: {
          description: "Missing or invalid session token."
        },
        Forbidden: {
          description:
            "Authenticated user is not allowed to perform this action."
        },
        NotFound: {
          description: "Requested resource was not found."
        },
        Conflict: {
          description: "Request conflicts with the current resource state."
        },
        ServerError: {
          description: "Unexpected server error."
        }
      }
    }
  },
  apis: [path.join(__dirname, "../routes/*.routes.js")]
});

openapiSpec.paths = mergePaths(openapiSpec.paths, additionalPaths);

const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true
  }
};

module.exports = {
  openapiSpec,
  swaggerUiOptions
};
