packager-win in=testvideo.mp4 --dump_stream_info \                          --test
ffmpeg -i testvideo.mp4 \                                                   --test


H264 encoding
360p:

ffmpeg -i original.mp4 -c:a copy \
  -vf "scale=-2:360" \
  -c:v libx264 -profile:v baseline -level:v 3.0 \
  -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 \
  -minrate 600k -maxrate 600k -bufsize 600k -b:v 600k \
  -y h264_baseline_360p_600.mp4

480p:

ffmpeg -i original.mp4 -c:a copy \
  -vf "scale=-2:480" \
  -c:v libx264 -profile:v main -level:v 3.1 \
  -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 \
  -minrate 1000k -maxrate 1000k -bufsize 1000k -b:v 1000k \
  -y h264_main_480p_1000.mp4

720p:

ffmpeg -i original.mp4 -c:a copy \
  -vf "scale=-2:720" \
  -c:v libx264 -profile:v main -level:v 4.0 \
  -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 \
  -minrate 3000k -maxrate 3000k -bufsize 3000k -b:v 3000k \
  -y h264_main_720p_3000.mp4

1080p:

ffmpeg -i original.mp4 -c:a copy \
  -vf "scale=-2:1080" \
  -c:v libx264 -profile:v high -level:v 4.2 \
  -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 \
  -minrate 6000k -maxrate 6000k -bufsize 6000k -b:v 6000k \
  -y h264_high_1080p_6000.mp4


packager-win \
  in={h264_baseline_360p_600.mp4},stream=audio,output={audio.mp4},drm_label=AUDIO \
  in={h264_baseline_360p_600.mp4},stream=video,output={h264_360p.mp4},drm_label=SD \
  in={h264_main_480p_1000.mp4},stream=video,output={h264_480p.mp4},drm_label=SD \
  in={h264_main_720p_3000.mp4},stream=video,output={h264_720p.mp4},drm_label=HD \
  in={h264_high_1080p_6000.mp4},stream=video,output={h264_1080p.mp4},drm_label=HD \
  --enable_raw_key_encryption \
  --keys label=AUDIO:key_id={f3c5e0361e6654b28f8049c778b23946}:key={a4631a153a443df9eed0593043db7519},
         label=SD:key_id={abba271e8bcf552bbd2e86a434a9a5d9}:key={69eaa802a6763af979e8d1940fb88392},
         label=HD:key_id={6d76f25cb17f5e16b8eaef6bbf582d8e}:key={cb541084c99731aef4fff74500c12ead} \
  --mpd_output {h264.mpd}

