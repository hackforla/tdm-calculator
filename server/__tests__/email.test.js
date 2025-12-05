const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const smtpMail = require("./smtp.service");

const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");
const {
  sendVerifyUpdateConfirmation
} = require("../app/services/email.service");
const {
  sendRegistrationConfirmation
} = require("../app/services/email.service");
const {
  sendResetPasswordConfirmation
} = require("../app/services/email.service");
const {
  sendSnapshotSubmissionToDRO
} = require("../app/services/email.service");

const { sendFeedback } = require("../app/services/email.service");

let server;
let originalSmtpSend;

beforeAll(async () => {
  server = await setupServer();

  originalSmtpSend = smtpMail.send; // save original state
  smtpMail.send = jest.fn(async () => ({ statusCode: 202 })); // mocks smtpMail.send
});

beforeEach(() => {
  smtpMail.send.mockClear(); // Clear mock calls before each test
});

afterAll(async () => {
  await teardownServer();
  smtpMail.send = originalSmtpSend; // restore state
});

// POST /email endpoint SUCCESS
describe("POST /emails endpoint with proper body", () => {
  it("should successfully send an email and return a 200 status", async () => {
    const emailData = {
      to: "user@example.com",
      subject: "Test Subject",
      text: "This is a test email",
      html: "<p>This is a test email</p>"
    };

    const response = await request(server).post("/api/emails").send(emailData);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 202
      })
    );
  });
});

describe("email API unit tests", () => {
  // sendVerifyUpdateConfirmation
  it("should call smtpMail.send with the correct parameters for sendVerifyUpdateConfirmation ", async () => {
    const email = "user@example.com";
    const token = "dummyToken";
    const expectedHtml = `<p>Hello, your account has been updated.</p>
              <p>If you did not update your account please notify <a href = "mailto: ladot@lacity.org">ladot@lacity.org</a>.</p>
              <p><a href="${process.env.CLIENT_URL}/confirm/${token}">Verify Account Updates</a></p>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`;

    await sendVerifyUpdateConfirmation(email, token);

    expect(smtpMail.send).toHaveBeenCalledWith(
      {
        to: email,
        subject: "Verify Your Account Updates",
        text: "Verify Your Account Updates",
        html: expectedHtml
      },
      false
    );
  });

  // sendRegistrationConfirmation
  it("sendRegistrationConfirmation", async () => {
    const email = "user@example.com";
    const token = "dummyToken";
    const expectedHtml = `<p>Hello, please click the following link to verify your account.</p>
              <p><a href="${process.env.CLIENT_URL}/confirm/${token}">Verify Me</a></p>
              <p>If you did not create a new account or update your account please notify <a href = "mailto: ladot@lacity.org">ladot@lacity.org</a>.</p>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`;

    await sendRegistrationConfirmation(email, token);

    expect(sgMail.send).toHaveBeenCalledWith(
      {
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: "Verify Your Account",
        text: "Verify your account",
        html: expectedHtml
      },
      false
    );
  });

  // sendResetPasswordConfirmation
  it("sendResetPasswordConfirmation", async () => {
    const email = "user@example.com";
    const token = "dummyToken";
    const expectedHtml = `<p>Hello, please click the following link to reset your password for TDM Calculator.</p>
              <br>
              <p><a href="${process.env.CLIENT_URL}/resetPassword/${token}">Reset Password</a></p>
              <br>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`;

    await sendResetPasswordConfirmation(email, token);

    expect(sgMail.send).toHaveBeenCalledWith(
      {
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: "Confirm Password Reset for TDM Calculator",
        text: "Confirm Password Reset for TDM Calculator",
        html: expectedHtml
      },
      false
    );
  });

  // sendSnapshotSubmissionToDRO
  describe("sendSnapshotSubmissionToDRO", () => {
    it.each([
      {
        droId: 1,
        droEmail: process.env.DRO_CENTRAL_EMAIL,
        droName: "Metro Development Review Office"
      },
      {
        droId: 2,
        droEmail: process.env.DRO_VALLEY_EMAIL,
        droName: "Valley Development Review Office"
      },
      {
        droId: 3,
        droEmail: process.env.DRO_WESTSIDE_EMAIL,
        droName: "West Los Angeles Development Review Office"
      }
    ])(
      "should call sgMail.send with correct parameters for droId $droId",
      async ({ droId, droEmail, droName }) => {
        const projectId = 123;
        const expectedHtml = `<p>Sample Email For Snapshot Submittal Notification</p>
              <br>
              <p>Hello, there's a new snapshot submission. Please click the following link to view the snapshot
              <br>
              <p><a href="${process.env.CLIENT_URL}/calculation/5/${projectId}">Visit Application Snapshot</a></p>
              <br>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`;

        await sendSnapshotSubmissionToDRO(projectId, droId);

        expect(sgMail.send).toHaveBeenCalledWith(
          {
            to: droEmail,
            from: process.env.EMAIL_SENDER,
            subject: `New Snapshot Submission for DRO: ${droName}`,
            text: `New Snapshot Submission for DRO: ${droName}`,
            html: expectedHtml
          },
          false
        );
      }
    );
  });
  // sendFeedback
  it("sendFeedback", async () => {
    const loginId = 99;
    const feedback = {
      name: "Doe, John",
      email: "user@example.com",
      comment: "some comment",
      forwardToWebTeam: true,
      selectedProjectIds: []
    };
    const expectedHtmlStartsWith = `<p><strong>Name:</strong> ${feedback.name}</p>
              <p><strong>Email</strong>: ${feedback.email}</p>
              <p><strong>Comment</strong>: ${feedback.comment}</p>
              <p><strong>Forward To Website Team</strong>: Yes </p>`;

    await sendFeedback(loginId, feedback);

    expect(sgMail.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: process.env.EMAIL_PUBLIC_COMMENT_LA_CITY,
        cc: process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM,
        from: process.env.EMAIL_SENDER,
        subject: `TDM Feedback Submission - ${feedback.name}`,
        text: expect.stringContaining(
          `TDM Feedback Submission - ${feedback.name}`
        ),
        html: expect.stringContaining(expectedHtmlStartsWith)
      }),
      false
    );
  });
});
