"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const { devTools } = require("./devtools");
const url = require("url");
const path = require("path");

if (process.env.NODE_ENV === "development") {
  devTools();
}

function createWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    maximizable: false,
    show: false,
    title: "PlaztiPics",
    webPreferences: {
      preload: path.join(__dirname, "/renderer/preload.js"),
    },
  });

  win.loadFile("renderer/index.html");

  win.once("ready-to-show", () => {
    win.show();
  });

  // win.on("move", () => {
  //   let position = win.getPosition();
  //   console.log("Position: ", position);
  // });

  win.on("closed", () => {
    win = null;
    app.quit();
  });
}

function getFileName(event, fileSrc) {
  let fileName = path.basename(fileSrc);

  return fileName;
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("image:fileName", getFileName);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
