"use strict";

const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  let win = new BrowserWindow({
    width: 600,
    height: 800,
    maximizable: false,
    show: false,
    title: "PlaztiPics",
  });

  win.loadFile("src/renderer/index.html");

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
    app.quit();
  });
});
