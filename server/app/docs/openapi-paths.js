const authenticated = [{ bearerAuth: [] }, { cookieAuth: [] }];

const ref = name => ({
  $ref: `#/components/schemas/${name}`
});

const jsonBody = schema => ({
  required: true,
  content: {
    "application/json": {
      schema
    }
  }
});

const parameter = (name, type = "integer") => ({
  in: "path",
  name,
  required: true,
  schema: {
    type
  }
});

const success = description => ({
  description
});

const errors = (...codes) =>
  codes.reduce(
    (responses, code) => ({
      ...responses,
      [code]: {
        $ref: `#/components/responses/${codeToResponseName[code]}`
      }
    }),
    {}
  );

const codeToResponseName = {
  400: "BadRequest",
  401: "Unauthorized",
  403: "Forbidden",
  404: "NotFound",
  409: "Conflict",
  500: "ServerError"
};

const commonAuthErrors = errors(401, 500);
const forbiddenAuthErrors = errors(401, 403, 500);

module.exports = {
  "/about": {
    get: {
      tags: ["About"],
      summary: "Get About page content.",
      responses: {
        200: success("About page content was returned."),
        ...errors(500)
      }
    },
    post: {
      tags: ["About"],
      summary: "Replace About page content.",
      security: authenticated,
      requestBody: jsonBody(ref("About")),
      responses: {
        201: success("About page content was saved."),
        ...errors(400, 401, 403, 500)
      }
    }
  },
  "/accounts/{id}/roles": {
    put: {
      tags: ["Accounts"],
      summary: "Update account role flags.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("AccountRole")),
      responses: {
        200: success("Account roles were updated."),
        ...errors(400, 401, 403, 500)
      }
    }
  },
  "/accounts/resendConfirmationEmail": {
    post: {
      tags: ["Accounts"],
      summary: "Resend an account confirmation email.",
      requestBody: jsonBody(ref("AccountConfirmEmail")),
      responses: {
        200: success("Confirmation email request was processed."),
        ...errors(400, 500)
      }
    }
  },
  "/accounts/confirmRegister": {
    post: {
      tags: ["Accounts"],
      summary: "Confirm account registration with a token.",
      requestBody: jsonBody(ref("AccountConfirmRegister")),
      responses: {
        200: success("Registration confirmation was processed."),
        ...errors(400, 401, 500)
      }
    }
  },
  "/accounts/forgotPassword": {
    post: {
      tags: ["Accounts"],
      summary: "Request a password reset email.",
      requestBody: jsonBody(ref("AccountForgotPassword")),
      responses: {
        200: success("Password reset request was processed."),
        ...errors(400, 500)
      }
    }
  },
  "/accounts/resetPassword": {
    post: {
      tags: ["Accounts"],
      summary: "Reset a password with a reset token.",
      requestBody: jsonBody(ref("AccountReset")),
      responses: {
        200: success("Password reset was processed."),
        ...errors(400, 500)
      }
    }
  },
  "/accounts/logout": {
    get: {
      tags: ["Accounts"],
      summary: "Log out and clear the JWT cookie.",
      responses: {
        200: success("Logout completed."),
        ...errors(500)
      }
    }
  },
  "/accounts/updateaccount": {
    put: {
      tags: ["Accounts"],
      summary: "Update the authenticated user's account profile.",
      security: authenticated,
      requestBody: jsonBody(ref("AccountUpdateAccount")),
      responses: {
        200: success("Account profile was updated."),
        ...errors(400, 401, 500)
      }
    }
  },
  "/accounts/{id}/archiveaccount": {
    put: {
      tags: ["Accounts"],
      summary: "Archive an account.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Account was archived."),
        ...errors(400, 401, 403, 500)
      }
    }
  },
  "/accounts/{id}/unarchiveaccount": {
    put: {
      tags: ["Accounts"],
      summary: "Unarchive an account.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Account was unarchived."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/accounts/archivedaccounts": {
    get: {
      tags: ["Accounts"],
      summary: "List archived accounts.",
      security: authenticated,
      responses: {
        200: success("Archived accounts were returned."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/accounts/droLogins": {
    get: {
      tags: ["Accounts"],
      summary: "List DRO user accounts.",
      security: authenticated,
      responses: {
        200: success("DRO user accounts were returned."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/accounts/cleanup-inactive": {
    delete: {
      tags: ["Accounts"],
      summary: "Delete inactive accounts eligible for cleanup.",
      security: authenticated,
      responses: {
        200: success("Inactive account cleanup completed."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/accounts/{id}/deleteaccount": {
    delete: {
      tags: ["Accounts"],
      summary: "Delete an account.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Account was deleted."),
        ...errors(400, 401, 403, 500)
      }
    }
  },
  "/calculations/includeRules/{id}": {
    get: {
      tags: ["Calculations"],
      summary: "Get one calculation with its rules.",
      parameters: [parameter("id")],
      responses: {
        200: success("Calculation with rules was returned."),
        ...errors(404, 500)
      }
    }
  },
  "/calculations/includeRules": {
    get: {
      tags: ["Calculations"],
      summary: "List calculations with their rules.",
      responses: {
        200: success("Calculations with rules were returned."),
        ...errors(500)
      }
    }
  },
  "/calculations/{id}": {
    get: {
      tags: ["Calculations"],
      summary: "Get one calculation.",
      parameters: [parameter("id")],
      responses: {
        200: success("Calculation was returned."),
        ...errors(404, 500)
      }
    }
  },
  "/calculations/updateDescription/{id}": {
    put: {
      tags: ["Calculations"],
      summary: "Update a calculation rule description.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("RuleDescriptionUpdate")),
      responses: {
        200: success("Rule description was updated."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/configs": {
    get: {
      tags: ["Configs"],
      summary: "List configuration values.",
      responses: {
        200: success("Configuration values were returned."),
        ...errors(500)
      }
    },
    post: {
      tags: ["Configs"],
      summary: "Create a configuration value.",
      security: authenticated,
      requestBody: jsonBody(ref("Config")),
      responses: {
        201: success("Configuration value was created."),
        ...commonAuthErrors
      }
    }
  },
  "/configs/{code}": {
    get: {
      tags: ["Configs"],
      summary: "Get one configuration value by code.",
      parameters: [parameter("code", "string")],
      responses: {
        200: success("Configuration value was returned."),
        ...errors(500)
      }
    },
    put: {
      tags: ["Configs"],
      summary: "Update a configuration value.",
      security: authenticated,
      parameters: [parameter("code", "string")],
      requestBody: jsonBody(ref("Config")),
      responses: {
        200: success("Configuration value was updated."),
        ...commonAuthErrors
      }
    },
    delete: {
      tags: ["Configs"],
      summary: "Delete a configuration value.",
      security: authenticated,
      parameters: [parameter("code", "string")],
      responses: {
        200: success("Configuration value was deleted."),
        ...commonAuthErrors
      }
    }
  },
  "/debug/memory": {
    get: {
      tags: ["Debug"],
      summary: "Get Node process memory usage.",
      responses: {
        200: {
          description: "Memory usage was returned.",
          content: {
            "application/json": {
              schema: ref("MemoryUsage")
            }
          }
        },
        ...errors(500)
      }
    }
  },
  "/dro/{id}": {
    get: {
      tags: ["DRO"],
      summary: "Get one Development Review Office entry.",
      parameters: [parameter("id")],
      responses: {
        200: success("DRO entry was returned."),
        ...errors(404, 500)
      }
    },
    put: {
      tags: ["DRO"],
      summary: "Update a Development Review Office entry.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("Dro")),
      responses: {
        204: success("DRO entry was updated."),
        ...errors(401, 403, 404, 500)
      }
    },
    delete: {
      tags: ["DRO"],
      summary: "Delete a Development Review Office entry.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        204: success("DRO entry was deleted."),
        ...errors(401, 403, 404, 500)
      }
    }
  },
  "/dro": {
    get: {
      tags: ["DRO"],
      summary: "List Development Review Office entries.",
      responses: {
        200: success("DRO entries were returned."),
        ...errors(500)
      }
    }
  },
  "/emails": {
    post: {
      tags: ["Emails"],
      summary: "Send an email.",
      security: authenticated,
      requestBody: jsonBody(ref("Email")),
      responses: {
        202: success("Email was accepted for sending."),
        ...errors(400, 401, 403, 404, 500)
      }
    }
  },
  "/faqcategories": {
    get: {
      tags: ["FAQ Categories"],
      summary: "List FAQ categories and FAQs.",
      responses: {
        200: success("FAQ categories were returned."),
        ...errors(500)
      }
    },
    post: {
      tags: ["FAQ Categories"],
      summary: "Replace FAQ categories and FAQs.",
      security: authenticated,
      requestBody: jsonBody(ref("FaqCategory")),
      responses: {
        201: success("FAQ categories were saved."),
        ...errors(400, 401, 403, 500)
      }
    }
  },
  "/projects/archivedprojects": {
    get: {
      tags: ["Projects"],
      summary: "List archived projects.",
      security: authenticated,
      responses: {
        200: success("Archived projects were returned."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/projects/submissions": {
    get: {
      tags: ["Projects"],
      summary: "List submitted projects for the authenticated user.",
      security: authenticated,
      responses: {
        200: success("Submitted projects were returned."),
        ...commonAuthErrors
      }
    }
  },
  "/projects/submissionsadmin": {
    get: {
      tags: ["Projects"],
      summary: "List submitted projects for admin review.",
      security: authenticated,
      responses: {
        200: success("Submitted projects were returned."),
        ...commonAuthErrors
      }
    }
  },
  "/projects/submissionsadmin/{projectId}": {
    get: {
      tags: ["Projects"],
      summary: "Get one submitted project for admin review.",
      security: authenticated,
      parameters: [parameter("projectId")],
      responses: {
        200: success("Submitted project was returned."),
        ...commonAuthErrors
      }
    }
  },
  "/projects/submissionLog/{projectId}": {
    get: {
      tags: ["Projects"],
      summary: "Get a project's submission log.",
      security: authenticated,
      parameters: [parameter("projectId")],
      responses: {
        200: success("Submission log was returned."),
        ...commonAuthErrors
      }
    }
  },
  "/projects/projectShare/{id}": {
    get: {
      tags: ["Projects"],
      summary: "Get a shared project by id for the authenticated user's email.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Shared project was returned."),
        ...errors(401, 404, 500)
      }
    }
  },
  "/projects/hide": {
    put: {
      tags: ["Projects"],
      summary: "Update hidden state for projects.",
      security: authenticated,
      requestBody: jsonBody({
        allOf: [
          ref("ProjectStateChange"),
          {
            type: "object",
            required: ["hide"]
          }
        ]
      }),
      responses: {
        204: success("Project hidden state was updated."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/projects/snapshot": {
    put: {
      tags: ["Projects"],
      summary: "Create a project snapshot.",
      security: authenticated,
      requestBody: jsonBody(ref("ProjectSnapshot")),
      responses: {
        204: success("Project snapshot was created."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/projects/submit": {
    put: {
      tags: ["Projects"],
      summary: "Submit a project.",
      security: authenticated,
      requestBody: jsonBody(ref("ProjectIdBody")),
      responses: {
        204: success("Project was submitted."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/projects/renameSnapshot": {
    put: {
      tags: ["Projects"],
      summary: "Rename a project snapshot.",
      security: authenticated,
      requestBody: jsonBody(ref("ProjectSnapshot")),
      responses: {
        204: success("Project snapshot was renamed."),
        ...errors(401, 403, 500)
      }
    }
  },
  "/projects/{id}": {
    get: {
      tags: ["Projects"],
      summary: "Get one project.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Project was returned."),
        ...errors(401, 404, 500)
      }
    },
    put: {
      tags: ["Projects"],
      summary: "Update a project.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("Project")),
      responses: {
        204: success("Project was updated."),
        ...errors(401, 403, 404, 500)
      }
    },
    delete: {
      tags: ["Projects"],
      summary: "Delete a project.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        204: success("Project was deleted."),
        ...errors(401, 403, 404, 500)
      }
    }
  },
  "/projects/updateCalculationId/{id}": {
    put: {
      tags: ["Projects"],
      summary: "Update a project's calculation selection.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("ProjectCalculationUpdate")),
      responses: {
        204: success("Project calculation selection was updated."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/projects/updateDroId/{id}": {
    put: {
      tags: ["Projects"],
      summary: "Update a project's DRO assignment.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("ProjectDroUpdate")),
      responses: {
        204: success("Project DRO assignment was updated."),
        ...commonAuthErrors
      }
    }
  },
  "/projects/updateAdminNotes/{id}": {
    put: {
      tags: ["Projects"],
      summary: "Update project admin notes.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("ProjectAdminNotes")),
      responses: {
        204: success("Project admin notes were updated."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/projects/updateTotals/{id}": {
    put: {
      tags: ["Projects"],
      summary: "Update stored project total fields.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("ProjectTotals")),
      responses: {
        200: success("Project totals were updated."),
        ...forbiddenAuthErrors
      }
    }
  },
  "/projects/submissions/{id}": {
    put: {
      tags: ["Projects"],
      summary: "Update submission metadata for a project.",
      security: authenticated,
      parameters: [parameter("id")],
      requestBody: jsonBody(ref("ProjectSubmission")),
      responses: {
        204: success("Project submission metadata was updated."),
        ...commonAuthErrors
      }
    }
  },
  "/projectShare/{id}": {
    get: {
      tags: ["Project Share"],
      summary: "Get one project share record.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        200: success("Project share record was returned."),
        ...errors(401, 404, 500)
      }
    },
    delete: {
      tags: ["Project Share"],
      summary: "Delete one project share record.",
      security: authenticated,
      parameters: [parameter("id")],
      responses: {
        204: success("Project share record was deleted."),
        ...errors(401, 404, 500)
      }
    }
  },
  "/projectShare/projectId/{projectId}": {
    get: {
      tags: ["Project Share"],
      summary: "List share records for one project.",
      security: authenticated,
      parameters: [parameter("projectId")],
      responses: {
        200: success("Project share records were returned."),
        ...errors(401, 404, 500)
      }
    }
  },
  "/projectShare": {
    post: {
      tags: ["Project Share"],
      summary: "Share a project with an email address.",
      security: authenticated,
      requestBody: jsonBody(ref("ProjectShare")),
      responses: {
        201: success("Project share record was created."),
        ...errors(400, 401, 500)
      }
    }
  }
};
