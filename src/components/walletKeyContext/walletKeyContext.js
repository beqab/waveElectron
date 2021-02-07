import React, { createContext } from "react";
const { ipcRenderer } = require("electron");
import axios from "axios";

export const WalletKeyContext = createContext();

const walletKeyProvider = (props) => {
  const [userKey, setUserKey] = React.useState(null);

  React.useEffect(() => {
    console.log("eeffff");
    ipcRenderer.on("getUser", (e, val) => {
      console.log(e, val, "pppppppppppppppppppppppp");
      // debugger;
      // axios
      //   .post("http://51.255.211.135:8181/wallet/sign-in", {
      //     secret: val?.secret,
      //   })
      //   .then((res) => {
      //     console.log("geeshvaa-------------");
      //   });
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
