const path = require("path");
const url = require("url");
const { shell } = require("electron");
const os = require("os");
const fs = require("fs");

const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
} = require("electron");

const store = require("./store");

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    icon: __dirname + "/assets/icon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080/",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}
const newStore = new store({
  fileName: "userKey",
  data: {
    wallets: [],
    currentUser: "",
    password: "",
  },
});

app.on("ready", () => {
  createMainWindow();

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.send("getUser", newStore.get());
  });
  //   Menu.setApplicationMenu(false);
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();

    Menu.setApplicationMenu(null);

    globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
    globalShortcut.register("Ctrl+Shift+I", () => mainWindow.toggleDevTools());
  }
});

ipcMain.on("create", (e, options = {}) => {
  console.log(options, "00000000000000");

  const res = newStore.get();

  console.log(res, "*************************");
  // debugger;

  if (res && res.wallets) {
    newStore.set({ ...res, wallets: [...res.wallets, options] });
  } else {
    newStore.set({ ...res, wallets: [options] });
  }

  console.log("ttt", options);
});

ipcMain.on("changeAccount", (e, options = {}) => {
  console.log(options, "00000000000000");

  const res = newStore.get();

  console.log(res, "*************************");
  // debugger;

  newStore.set({ ...res, currentUser: options.name });

  mainWindow.webContents.send("getUser", newStore.get());
  console.log("ttt", options);
});

ipcMain.on("setPassword", (e, options = {}) => {
  console.log(options, "00000000000000");

  const res = newStore.get();

  console.log(res, "*************************");
  // debugger;

  newStore.set({ ...res, password: options.password });

  mainWindow.webContents.send("getUser", newStore.get());
  console.log("ttt", options);
});

ipcMain.on("authWithPassword", (e, options = {}) => {
  console.log(options, "00000000000000");

  const res = newStore.get();

  console.log(res, "*************************");
  // debugger;

  newStore.set({ ...res, isAuth: true });

  mainWindow.webContents.send("getUser", newStore.get());
  console.log("ttt", options);
});

ipcMain.on("resetWallet", (e, options = {}) => {
  // debugger;

  newStore.set({});

  mainWindow.webContents.send("getUser", newStore.get());
  console.log("ttt", options);
});

ipcMain.on("logout", (e, options = {}) => {
  console.log(options, "00000000000000");
  let storeData = newStore.get();
  newStore.set({ ...storeData, currentUser: "" });
  mainWindow.webContents.send("getUser", newStore.get());
  // mainWindow.reload();
  console.log("ttt", options);
});

ipcMain.on("getFileData", (e) => {
  console.log("options", "00000000000000");

  mainWindow.webContents.send("getUser", newStore.get());

  // console.log("ttt", options);
});

ipcMain.on("exportKeys", (e, options = "ttt") => {
  // session.on("will-download", function (event, item, webContents) {
  //   event.preventDefault();
  //   require("request")(item.getUrl(), function (data) {
  //     require("fs").writeFileSync("/somewhere", data);
  //   });
  // });

  const path2 = path.join(os.homedir(), "pubKey.txt");
  console.log(path2, "path2path2", "pubKey");
  fs.writeFileSync(path2, JSON.stringify(options));
  shell.openItem(path2);
  // const userDataPath = (electron.app || electron.remote.app).getPath("Desktop");
  // console.log(userDataPath, "userDataPathuserDataPath");
  // const setStore = new store({
  //   fileName: "userKay",
  //   data: {},
  // });

  // setStore.set(options);
  // console.log("ttt", options);
  // fs.writeFileSync(this.path, JSON.stringify(this.data));
});
// Stop error
app.allowRendererProcessReuse = true;
