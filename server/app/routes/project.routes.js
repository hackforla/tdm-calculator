const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get(
  "/archivedprojects",
  jwtSession.validateUser,
  projectController.getAllArchivedProjects
);
/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: List projects for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Projects were returned.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", jwtSession.validateUser, projectController.getAll);
router.get(
  "/submissions",
  jwtSession.validateUser,
  projectController.getSubmissions
);
router.get(
  "/submissionsadmin",
  jwtSession.validateUser,
  projectController.getSubmissionsAdmin
);
router.get(
  "/submissionsadmin/:projectId",
  jwtSession.validateUser,
  projectController.getSubmissionsAdminByProjectId
);
router.get(
  "/submissionLog/:projectId",
  jwtSession.validateUser,
  projectController.getSubmissionLogByProjectId
);
router.get("/:id", jwtSession.validateUser, projectController.getById);
router.get(
  "/projectShare/:id/",
  jwtSession.validateUser,
  projectController.getByIdWithEmail
);
/**
 * @openapi
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a project for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project was created.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", writeLimiter, jwtSession.validateUser, projectController.post);
router.put(
  "/hide",
  writeLimiter,
  jwtSession.validateUser,
  projectController.hide
);
/**
 * @openapi
 * /projects/trash:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Move projects to or from trash.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ProjectStateChange'
 *               - type: object
 *                 required:
 *                   - trash
 *     responses:
 *       204:
 *         description: Project trash state was updated.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put(
  "/trash",
  writeLimiter,
  jwtSession.validateUser,
  projectController.trash
);
router.put(
  "/snapshot",
  writeLimiter,
  jwtSession.validateUser,
  projectController.snapshot
);
router.put(
  "/submit",
  writeLimiter,
  jwtSession.validateUser,
  projectController.submit
);
router.put(
  "/renameSnapshot",
  writeLimiter,
  jwtSession.validateUser,
  projectController.renameSnapshot
);
router.put(
  "/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.put
);
router.put(
  "/updateCalculationId/:id",
  // writeLimiter,  Do not want a rate limiter on this endpoint
  jwtSession.validateRoles(["isAdmin"]),
  projectController.updateCalculationId
);
router.put(
  "/updateDroId/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateDroId
);
router.put(
  "/updateAdminNotes/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateAdminNotes
);
router.delete(
  "/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.del
);
router.put(
  "/updateTotals/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateTotals
);
router.put(
  "/submissions/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.putSubmission
);
