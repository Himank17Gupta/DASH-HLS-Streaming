const express = require('express');
const app = express();
const fs=require('fs');
const port = 4000;
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization","Accept-Ranges:bytes");
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  next();
});
app.get('/', (req, res) => res.sendFile(__dirname+'/client.html'));

app.use('/users',require('./controllers/upload'));
app.get('/stream',(req,res)=>{
  console.log('stream called' );
  var stat = fs.statSync(__dirname+'/manifest/SampleVideo_1280x720_5mb.mp4.mpd');
  var total = stat.size;
  console.log('ALL: ' + total);
  res.header('Content-Length', total, 'Content-Type','video/mp4' );
  //fs.createReadStream(__dirname+'/manifest/SampleVideo_1280x720_5mb.mp4.mpd').pipe(res);
  
    res.sendFile(__dirname+'/manifest/SampleVideo_1280x720_5mb.mp4.mpd');
});

app.use((req,res,next)=>{
    res.send('You typed Something Invalid...No Resource Found');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))