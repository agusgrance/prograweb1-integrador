var normalizedPath = require("path").join(__dirname, "");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (file!='index.js' && file.substr(-3)=='.js') {
    exports[file.substr(0, file.length-3)] = require("./" + file);
  }
});
