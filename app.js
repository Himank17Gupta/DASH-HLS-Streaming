const express = require('express');
const app = express();
const fs=require('fs');
const cors=require('cors');
const port = 4000;
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {


res.header("Access-Control-Allow-Origin", "*");
  
// if(req.headers.range){
//     console.log('range in headers');
//     var range = req.headers.range;
//     var parts = range.replace(/bytes=/, "").split("-");
//     var partialstart = parts[0];
//     var partialend = parts[1];
//     console.log(partialstart,partialend);
//     var path= __dirname+'/manifest/SampleVideo_1280x720_1mb.mp4.mpd'
//     var stat = fs.statSync(path);
//     var total = stat.size;
//     var start = parseInt(partialstart, 10);
//     var end = partialend ? parseInt(partialend, 10) : total-1;
//     var chunksize = (end-start)+1;
//     console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

//     res.set('Content-Type', 'audio/video/mp4');
//     res.set('Accept-Ranges', 'bytes');
//     res.set('Content-Range', 'bytes ' + start + '-' + end + '/' + total);
//     res.set('Content-Length', range.end - range.start + 1);
//   path=__dirname+req.url;
 
//   res.sendFile(__dirname+'/manifest/SampleVideo_1280x720_1mb.mp4.mpd');
//  console.log(req.url);
  
//}  
  
  next();
});


app.get('/', (req, res) => res.sendFile(__dirname+'/client.html'));


app.use('/users',require('./controllers/upload'));


app.get('/*',(req,res)=>{

  console.log('stream called' );

  console.log(req.headers);
  var path= __dirname+'/manifest/SampleVideo_1280x720_5mb.mp4.mpd'
  var stat = fs.statSync(path);
  var total = stat.size;

  if(req.headers.range){
    console.log('range in headers');
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];
    console.log(partialstart,partialend);
  
    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    res.set('Content-Type', 'audio/video/mp4');
    res.set('Accept-Ranges', 'bytes');
    res.set('Content-Range', 'bytes ' + start + '-' + end + '/' + total);
    res.set('Content-Length', range.end - range.start + 1);
    //  var file = fs.createReadStream(path, {start, end});
    //  file.pipe(res);
    res.sendFile(__dirname+req.url);
  } 
else{
  //console.log('ALL: ' + total);
  res.set('Content-Length', total );
  res.sendFile(path);
}

});

app.use((req,res,next)=>{
    res.send('You typed Something Invalid...No Resource Found');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))