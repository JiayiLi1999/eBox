"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note imports.
var path = require("path");
var fs = require("fs");
// Read in the server information file.
var rawInfo = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
exports.serverInfo = JSON.parse(rawInfo);
console.log("ServerInfo: ", exports.serverInfo);
//# sourceMappingURL=ServerInfo.js.map