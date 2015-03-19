/**
 * Created by wsantasiero on 3/7/15.
 */
const
    fs = require('fs'),
    filename = process.argv[2];
if(!filename){
    throw Error("A file to watch must be specified!");
}
fs.watch(filename, function () {
    console.log("File 'target.txt' just changed");
})                                                ;
console.log("Now watching "+filename+" for changes");
