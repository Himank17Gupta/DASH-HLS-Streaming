const shelljs=require('shelljs');
//const exec = require('child_process').exec;
// var yourscript = exec(script,
//        (error, stdout, stderr) => {
//             console.log(stdout);
//             console.log(stderr);
//             if (error !== null) {
//                 console.log(`exec error: ${error}`);
//             }
//         });

var name='./uploads/SampleVideo_1280x720_1mb.mp4';
((name)=>{
shelljs.exec('packager-win in='+name+' --dump_stream_info');
shelljs.exec('ffmpeg -i '+name);
})(name);
console.log('after script');