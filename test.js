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




//var name='./uploads/SampleVideo_1280x720_5mb.mp4';

var testFunction=(name)=>{
shelljs.exec('packager-win in='+name+' --dump_stream_info');
shelljs.exec('ffmpeg -i '+name);
};


var script=(name,filename)=>{
    console.log('inside script');
 //   shelljs.exec('ffmpeg -i '+name);

//h264 encoding 

//360p
    shelljs.exec('ffmpeg -i '+name+' -c:a copy -vf "scale=-2:360" -c:v libx264 -profile:v baseline -level:v 3.0 -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 -minrate 600k -maxrate 600k -bufsize 600k -b:v 600k -y ./modVideos/h264_'+filename+'_360p_600.mp4');
//480p
    shelljs.exec('ffmpeg -i '+name+' -c:a copy  -vf "scale=-2:480"  -c:v libx264 -profile:v main -level:v 3.1  -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 -minrate 1000k -maxrate 1000k -bufsize 1000k -b:v 1000k -y ./modVideos/h264_'+filename +'_480p_1000.mp4');
//720p
    shelljs.exec('ffmpeg -i '+name+' -c:a copy -vf "scale=-2:720" -c:v libx264 -profile:v main -level:v 4.0 -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 -minrate 3000k -maxrate 3000k -bufsize 3000k -b:v 3000k -y ./modVideos/h264_'+filename+'_720p_3000.mp4');
//1080p
    shelljs.exec('ffmpeg -i '+name+' -c:a copy -vf "scale=-2:1080" -c:v libx264 -profile:v high -level:v 4.2 -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 -minrate 6000k -maxrate 6000k -bufsize 6000k -b:v 6000k -y ./modVideos/h264_' + filename+ '_1080p_6000.mp4');

//packaging + drm + mpd generation
shelljs.exec(
'packager-win \
  in=./modVideos/h264_'+filename+'_360p_600.mp4,stream=audio,output=./packaged/audio_'+filename+',drm_label=AUDIO \
  in=./modVideos/h264_'+filename+'_360p_600.mp4,stream=video,output=./packaged/360p_'+filename+',drm_label=SD \
  in=./modVideos/h264_'+filename+'_480p_1000.mp4,stream=video,output=./packaged/480p_'+filename+',drm_label=SD \
  in=./modVideos/h264_'+filename+'_720p_3000.mp4,stream=video,output=./packaged/720p_'+filename+',drm_label=HD \
  in=./modVideos/h264_'+filename+'_1080p_6000.mp4,stream=video,output=./packaged/1080p_'+filename+',drm_label=HD \
  --enable_raw_key_encryption \
  --keys label=AUDIO:key_id=f3c5e0361e6654b28f8049c778b23946:key=a4631a153a443df9eed0593043db7519,label=SD:key_id=abba271e8bcf552bbd2e86a434a9a5d9:key=69eaa802a6763af979e8d1940fb88392,label=HD:key_id=6d76f25cb17f5e16b8eaef6bbf582d8e:key=cb541084c99731aef4fff74500c12ead --mpd_output ./manifest/'+filename+'.mpd' 
);

};

// var filename='SampleVideo_1280x720_1mb.mp4';
// shelljs.exec(
//     'packager-win \
//       in=./modVideos/h264_'+filename+'_360p_600.mp4,stream=audio,output=./packaged/audio_'+filename+',drm_label=AUDIO \
//       in=./modVideos/h264_'+filename+'_360p_600.mp4,stream=video,output=./packaged/360p_'+filename+',drm_label=SD \
//       in=./modVideos/h264_'+filename+'_480p_1000.mp4,stream=video,output=./packaged/480p_'+filename+',drm_label=SD \
//       in=./modVideos/h264_'+filename+'_720p_3000.mp4,stream=video,output=./packaged/720p_'+filename+',drm_label=HD \
//       in=./modVideos/h264_'+filename+'_1080p_6000.mp4,stream=video,output=./packaged/1080p_'+filename+',drm_label=HD \
//       --enable_raw_key_encryption \
//       --keys label=AUDIO:key_id=f3c5e0361e6654b28f8049c778b23946:key=a4631a153a443df9eed0593043db7519,label=SD:key_id=abba271e8bcf552bbd2e86a434a9a5d9:key=69eaa802a6763af979e8d1940fb88392,label=HD:key_id=6d76f25cb17f5e16b8eaef6bbf582d8e:key=cb541084c99731aef4fff74500c12ead --mpd_output ./manifest/'+filename+'.mpd' 
//     );



module.exports=script;