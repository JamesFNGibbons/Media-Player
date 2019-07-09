const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');

/**
  * This will hold the electron window
  * so that it can be shutdown at the
  * end.
*/
let win;

app.on('ready', () => {
 
 console.log("Starting Flip Video Display");

 /**
   * Get the resolution of the screen size.
 */
 const width = electron.screen.getPrimaryDisplay().workAreaSize.width;
 const height = electron.screen.getPrimaryDisplay().workAreaSize.height;
        
 win = new BrowserWindow({
    width: width,
    height: height,

    webPreferences: {
        nodeIntergration: true
    }
 });

 /**
   * Auto load the lib directory helpers
   * for the media player.
 */
 const utils = {};
 for(let file in fs.readdirSync(__dirname + '/lib')){
    file = fs.readdirSync(__dirname + './lib')[file];

    /**
      * Check that the file is not a directory.
   */
   if(fs.lstatSync(__dirname + '/lib/' + file).isFile()){
       utils.file = require(__dirname + '/lib/' + file);
   }
 }

 /**
   * Load the media container view.
 */
 win.loadFile("views/container.html");
});
