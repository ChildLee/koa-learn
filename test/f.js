var MemoryFileSystem = require("memory-fs");
var fs = new MemoryFileSystem(); // Optionally pass a javascript object

fs.mkdirpSync("/a/test/dir");
fs.writeFileSync("/a/test/dir/file.txt", "Hello World");
console.log(fs.readFileSync('/a/test/dir/file.txt')) // returns Buffer("Hello World")


fs.readdirSync("/a/test"); // returns ["dir"]
fs.statSync("/a/test/dir").isDirectory(); // returns true
fs.rmdirSync("/a/test/dir");

fs.mkdirpSync("C:\\use\\windows\\style\\paths");