const request = require("supertest");
const sgMail = require("@sendgrid/mail");

const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");
const {
  sendVerifyUpdateConfirmation
} = require("../app/services/sendgrid-service");
const {
  sendRegistrationConfirmation
} = require("../app/services/sendgrid-service");
const {
  sendResetPasswordConfirmation
} = require("../app/services/sendgrid-service");
const { sendFeedback } = require("../app/services/sendgrid-service");

let server;
let originalSendgrid;

beforeAll(async () => {
  server = await setupServer();

  originalSendgrid = sgMail.send; // save original state
  sgMail.send = jest.fn(async () => ({ statusCode: 202 })); // mocks sgMail.send
});

afterAll(async () => {
  await teardownServer();
  sgMail.send = originalSendgrid; // restore state
});

// POST /email endpoint SUCCESS
describe("POST /email endpoint with proper body", () => {
  it("should successfully send an email and return a 200 status", async () => {
    const emailData = {
      emailTo: "user@example.com",
      emailFrom: "tdm+sendgrid@hackforla.org",
      subject: "Test Subject",
      textBody: "This is a test email",
      htmlBody: "<p>This is a test email</p>"
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
  it("should call sgMail.send with the correct parameters for sendVerifyUpdateConfirmation ", async () => {
    const email = "user@example.com";
    const token = "dummyToken";
    const expectedHtml = `<p>Hello, your account has been updated.</p>
              <p>If you did not update your account please notify <a href = "mailto: ladot@lacity.org">ladot@lacity.org</a>.</p>
              <p><a href="${process.env.CLIENT_URL}/confirm/${token}">Verify Account Updates</a></p>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`;

    await sendVerifyUpdateConfirmation(email, token);

    expect(sgMail.send).toHaveBeenCalledWith(
      {
        to: email,
        from: process.env.EMAIL_SENDER,
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

  // sendFeedback
  it("sendFeedback", async () => {
    const loginId = 99;
    const feedback = {
      name: "John Doe",
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
