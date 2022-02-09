import React from "react";

const UserContext = React.createContext({
  account: null,
  updateAccount: () => {}
});

export default UserContext;
