# Application Insights

Application Insights is a Microsoft Azure service that allows
you to collect data from your running applications for purposes
of

- Error and performance logging and reporting
- Collecting anonymized data about Users and Sessions such as
  - Statistics on Client Agent O/S, browser version, screen resolution, etc.
  - Geographic information such as Country
  - Page view statistics
  - React Component usage statistics
- Reporting statistics on custom events within
  the client application, such as:

  - Project Save Operations
  - Button Clicks
  - Other custom events we can make up and
    program to be rased by the client.

  ## Granting User Access to the tdmhackforla Azure account

  The 1Password vault has the credentials for
  the Development Azure account login. This section contains notes for granting a new
  user access to this Azure account.

  Add or Delete Users to Active Directory:
  https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-users-azure-active-directory

  Grant the same users the Owner role to the
  subscription as described here:
  https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/add-change-subscription-administrator

  Have the user log in at portal.azure.com
  with their assigned user name (e.g., JohnDarragh@tdmhackforla.onmicrosoft.com). I think they will be forced ot set their password.
