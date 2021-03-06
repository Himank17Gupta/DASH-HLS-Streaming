console.log('client js called');
var playbutton=document.getElementById('stream');
var player=document.getElementById('player');
// playbutton.addEventListener('click',()=>{
// console.log('clicked');    
// player.innerHTML=<video id="video"
// width="640"
// poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
// controls autoplay></video>});
//var manifestUri ='demovideo.mp4';


function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);




//  player.configure({
//      drm: {
//       clearKeys:{
// //         '4b6cfb0a08f524ac9a15527af43d86a8':'4b6cfb0a08f524ac9a15527af43d86a8',
// //         '4b6cfb0a08f524ac9a15527af43d86a8':'4b6cfb0a08f524ac9a15527af43d86a8',
//         'abba271e8bcf552bbd2e86a434a9a5d9': '69eaa802a6763af979e8d1940fb88390', 
//     '6d76f25cb17f5e16b8eaef6bbf582d8e': 'cb541084c99731aef4fff74500c12ea0',      
//    'f3c5e0361e6654b28f8049c778b23946': 'a4631a153a443df9eed0593043db7510'
        
//        }
      
//      } 
//       });
console.log(player.getConfiguration());
  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);