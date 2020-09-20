import React, { createContext } from "react";
const { ipcRenderer } = require("electron");

export const WalletKeyContext = createContext();

const walletKeyProvider = (props) => {
  const [userKey, setUserKey] = React.useState(null);

  React.useEffect(() => {
    console.log("eeffff");
    ipcRenderer.on("getUser", (e, val) => {
      console.log(e, val, "esetttt");
      setUserKey(val);
    });
  }, []);

  return (
    <WalletKeyContext.Provider value={{ userKey, setUserKey }}>
      {props.children}
    </WalletKeyContext.Provider>
  );
};

export default walletKeyProvider;
