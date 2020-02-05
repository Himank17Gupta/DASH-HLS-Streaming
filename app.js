const express = require('express');
const app = express();
const port = 4000;
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => res.sendFile(__dirname+'/client.html'));

app.use('/users',require('./controllers/upload'));

app.use((req,res,next)=>{
    res.send('You typed Something Invalid...No Resource Found');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))