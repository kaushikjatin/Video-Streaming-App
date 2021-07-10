const ffmpeg = require('ffmpeg-static')
const genThumbnail = require('simple-thumbnail')


const generateThumbnail = (source,destination)=>{
    var error=null;
    genThumbnail(source, destination, '250x?',{path:ffmpeg,seek:'00:00:05.00'})
    .then(() => {console.log('done!')})
    .catch(err=>{console.log(err)});
}

module.exports={generateThumbnail};