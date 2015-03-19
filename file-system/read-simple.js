/**
 * Created by wsantasiero on 3/8/15.
 */
const fs = require('fs');
fs.readFile('target.txt', function(err, data){
    if(err){
        throw err;
    }
    console.log(data.toString());
});
