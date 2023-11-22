// env variables for testing
process.env.TEST_ENV = "true";

process.env.PORT = "5002";
process.env.NODE_OPTIONS = "--trace-deprecation";

process.env.JWT_SECRET_KEY = "testingSecretKey";

process.env.CLIENT_URL = "http://localhost:3001";
process.env.SERVER_URL = "http://localhost:5002";

process.env.SENDGRID_API_KEY = "SG.testAPIkey";
process.env.EMAIL_SENDER = "tdm+sendgrid@test.org";
process.env.EMAIL_PUBLIC_COMMENT_LA_CITY =
  "tdm+devpubliccommentplanning@test.org";
process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM = "tdm+devpubliccomment@test.org";

process.env.APPLICATIONINSIGHTS_CONNECTION_STRING =
  "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus.livediagnostics.monitor.azure.com/";

process.env.SECURITY_ADMIN_EMAIL = "securityadmin@dispostable.com";
process.env.SECURITY_ADMIN_PASSWORD = "Dogfood1!";
process.env.ADMIN_EMAIL = "ladot@dispostable.com";
process.env.ADMIN_PASSWORD = "Dogfood1!";

process.env.SQL_SERVER_NAME = "localhost";
process.env.SQL_SERVER_PORT = "1434";
process.env.SQL_DATABASE_NAME = "tdmtestdb";
process.env.SQL_USER_NAME = "sa";
process.env.SQL_PASSWORD = "TestPassw0rd";
process.env.SQL_ENCRYPT = "false";
