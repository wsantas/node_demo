/**
 * Created by wsantasiero on 3/7/15.
 */
const fs = require('fs');
fs.watch('target.txt', function () {
    console.log("File 'target.txt' just changed");
})                                                ;
console.log("Now watching target.txt for changes");
