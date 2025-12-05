const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { sendSnapshotSubmissionToDRO } = require("./email.service");
const { sanitizeHtml } = require("../../middleware/sanitize-html");

const getAll = async loginId => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    const response = await request.execute("Project_SelectAll");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getById = async (loginId, id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Project_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const getByIdWithEmail = async (id, email) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("email", mssql.NVarChar, email);
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Project_SelectByIdWithSharedEmail");
    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const post = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("name", mssql.NVarChar, item.name); // 200
    request.input("address", mssql.NVarChar, item.address); // 200
    request.input("description", mssql.NVarChar, item.description); // max
    request.input("formInputs", mssql.NVarChar, item.formInputs); // max
    request.input("targetPoints", mssql.Int, item.targetPoints);
    request.input("earnedPoints", mssql.Int, item.earnedPoints);
    request.input("projectLevel", mssql.Int, item.projectLevel);
    request.input("loginId", mssql.Int, item.loginId);
    request.input("calculationId", mssql.Int, item.calculationId);
    request.output("id", mssql.Int, null);
    const response = await request.execute("Project_Insert");
    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("name", mssql.NVarChar, item.name); // 200
    request.input("address", mssql.NVarChar, item.address); // 200
    request.input("description", mssql.NVarChar, item.description); // max
    request.input("formInputs", mssql.NVarChar, item.formInputs); // max
    request.input("targetPoints", mssql.Int, item.targetPoints);
    request.input("earnedPoints", mssql.Int, item.earnedPoints);
    request.input("projectLevel", mssql.Int, item.projectLevel);
    request.input("loginId", mssql.Int, item.loginId);
    request.input("calculationId", mssql.Int, item.calculationId);
    request.input("id", mssql.Int, item.id);
    await request.execute("Project_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async (loginId, id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("loginId", mssql.Int, loginId);
    request.input("id", mssql.Int, id);
    await request.execute("Project_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

const hide = async (ids, hide, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("id", mssql.Int);

    ids.forEach(id => {
      tvp.rows.add(id);
    });

    request.input("ids", tvp);
    request.input("hide", hide ? 1 : 0);
    request.input("loginId", loginId);
    const response = await request.execute("Project_Hide");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const trash = async (ids, trash, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("id", mssql.Int);

    ids.forEach(id => {
      tvp.rows.add(id);
    });

    request.input("ids", tvp);
    request.input("trash", trash);
    request.input("loginId", loginId);
    const response = await request.execute("Project_Trash");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const snapshot = async (id, loginId, name) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("id", id);
    request.input("loginId", loginId);
    request.input("name", name);

    const response = await request.execute("Project_Snapshot");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const submit = async (id, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("id", id);
    request.input("loginId", loginId);

    const response = await request.execute("Project_Submit");

    if (response.returnValue === 0) {
      //submission succeeded
      const project = await getById(loginId, id);
      if (project && project.droId) {
        //project is assigned to a DRO
        await sendSnapshotSubmissionToDRO(id, project.droId);
      }
    }
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const renameSnapshot = async (id, loginId, name) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("id", id);
    request.input("loginId", loginId);
    request.input("name", name);

    const response = await request.execute("Project_Rename");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const getAllArchivedProjects = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Project_SelectAllArchived");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const updateDroId = async (id, droId, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("id", mssql.Int, id);
    if (droId === null) {
      request.input("droId", mssql.Int, null); // Correctly pass NULL for droId
    } else {
      request.input("droId", mssql.Int, droId); // Pass the actual droId value if it's not null
    }
    request.input("LoginId", mssql.Int, loginId);

    const response = await request.execute("Project_UpdateDroId");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const updateAdminNotes = async (id, adminNotes, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();
    //Admin notes are rich text content that can contain HTML. Sanitized with DomPurify
    // Reference Decision Records https://github.com/hackforla/tdm-calculator/wiki/Decision-Records
    const sanitizedAdminNotes = sanitizeHtml(adminNotes);
    request.input("id", mssql.Int, id);
    request.input("adminNotes", mssql.NVarChar(mssql.MAX), sanitizedAdminNotes);
    request.input("LoginId", mssql.Int, loginId);

    const response = await request.execute("Project_UpdateAdminNotes");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const updateTotals = async (
  id,
  targetPoints,
  earnedPoints,
  projectLevel,
  loginId
) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    request.input("targetPoints", mssql.Int, targetPoints);
    request.input("earnedPoints", mssql.Int, earnedPoints);
    request.input("projectLevel", mssql.Int, projectLevel);
    request.input("LoginId", mssql.Int, loginId);

    const response = await request.execute("Project_UpdateTotals");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const getSubmissions = async loginId => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    const response = await request.execute("ProjectSubmission_SelectByLoginId");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getSubmissionsAdmin = async (loginId, projectId = null) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    if (projectId) request.input("projectId", mssql.Int, projectId);
    const response = await request.execute("ProjectSubmission_SelectAdmin");
    if (projectId) {
      if (response.recordset && response.recordset.length > 0) {
        return response.recordset[0];
      } else {
        return null;
      }
    }
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const putSubmission = async (loginId, item) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("projectId", mssql.Int, item.id);
    request.input("loginId", mssql.Int, loginId);
    request.input("droId", mssql.Int, item.droId);
    request.input("adminNotes", mssql.NVarChar, item.adminNotes); // max
    request.input("dateModifiedAdmin", mssql.DateTime2, item.dateModifiedAdmin);
    request.input("loginIdAssigned", mssql.Int, item.loginIdAssigned);
    request.input("dateAssigned", mssql.DateTime2, item.dateAssigned);
    request.input("invoiceStatusId", mssql.Int, item.invoiceStatusId);
    request.input("dateInvoicePaid", mssql.DateTime2, item.dateInvoicePaid);
    request.input("onHold", mssql.Bit, item.onHold);
    request.input("approvalStatusId", mssql.Int, item.approvalStatusId);
    request.input("dateCoO", mssql.DateTime2, item.dateCoO);

    await request.execute("ProjectSubmission_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const getSubmissionLog = async (loginId, projectId) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("ProjectId", mssql.Int, projectId);
    request.input("LoginId", mssql.Int, loginId);
    const response = await request.execute("ProjectLog_SelectByProjectId");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  getById,
  getByIdWithEmail,
  post,
  put,
  del,
  hide,
  trash,
  submit,
  snapshot,
  updateDroId,
  updateAdminNotes,
  renameSnapshot,
  getAllArchivedProjects,
  updateTotals,
  getSubmissions,
  getSubmissionsAdmin,
  putSubmission,
  getSubmissionLog
};
