const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );

    this.path = path.join(userDataPath, options.fileName + ".json");
    console.log(userDataPath, "sssss");
    this.data = parseDataFile(this.path, options.defaults);
  }

  get() {
    return this.data;
  }

  set(data) {
    this.data = { ...data };

    console.log(this.path, "this.path+++++++++++++++++");
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    return defaults;
  }
}

module.exports = Store;
