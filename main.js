'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const execFile = require('child_process').execFile
const path = require("path")
const dialog = electron.dialog

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
   app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  
  dialog.showOpenDialog({
      title: "Save To",
      properties: ['openDirectory']
    }, function (out) {
    
    if(out.length > 0){
      
      var out = path.resolve(out[0], 'test.asar');
      execFile("./node_modules/asar/bin/asar", ['pack', `${__dirname}/dir/`, out], function (error, stdout, stderr) {
        if (error) return dialog.showErrorBox("Error", error);
        console.log(stderr);
      });
      
      }else{
        dialog.showErrorBox("Error", "Please select to directory to save the asar package")
      }
  });
  
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
