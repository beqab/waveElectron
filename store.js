const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );

    this.path = path.join(userDataPath, options.fileName + ".json");
    console.log(userDataPath, "sssss", this.path);
    this.data = parseDataFile(this.path, options.defaults);
  }

  get() {
    console.log(this.data, "this.data****");

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

// Nijara, [06.02.21 04:52]
// "bless fiction fame tell crater maze february fault long maid bring legend"

// Nijara, [06.02.21 04:52]
// SECRET : "bless fiction fame tell crater maze february fault long maid bring legend"

// Desktop wallet :
// 1) Am prazebis washala/shecvla ar unda shegedzlos
// 2) Receive -shi Send button ar chirdeba
// 3) Freezing-shi Staked nacvlad Freezed
// 4) Send - shi Memo amovshalot
// 5) Send by ID > Send
// 6) Freezingis da Setting iconi gadacvale
