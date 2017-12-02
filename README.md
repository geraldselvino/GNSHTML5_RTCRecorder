GNSHTML5_RTCRecorder
==========================

No plugin, pure HTML5 audio & video recorder for WebRTC media streams. A very lightweight client-side js that can capture and record the audio and video streams of WebRTC sessions into a webm format.

Requirement
===========
Modern browser with HTML5 and EcmaScript 5-6 support

Sample usage
============

```html
<!-- Include the js files in your html in the following order-->
<script type="text/javascript" src="StreamRecorder.js"></script>
<script type="text/javascript" src="HTML5Recorder.js"></script>
```

```javascript
//Instantiate the transcriptionist object
var myrtcrecorder = new Html5Recorder(/*your source stream here*/,/*the stream type here*/);
//Note: You can leave the source stream then you can set it 
//via myrtcrecorder.setStream(mystream, mystreamtype)
//
//e.g. of source streams
//--From the microphone--
//navigator.getUserMedia = navigator.getUserMedia ||
//                         navigator.webkitGetUserMedia ||
//                         navigator.mozGetUserMedia;
//
//var streamchannels = {
//    audio: true,
//    video: true
//};
//
//var myrtcrecorder = new Html5Recorder();
//navigator.getUserMedia(streamchannels,
//                       function(stream) {
//                           myrtcrecorder.setStream(stream, StreamType.AUDIO);
//                           myrtcrecorder.start();
//                       },
//                       function(err) { 
//                           console.error(err); 
//                       }
//                      );
//
//window.setTimeOut(function() {
//    myrtcrecorder.stop();
//}, 10000)
//
//myrtcrecorder.onRecord = function(mediablob) {
//    var a = document.createElement('a');
//    a.target = '_blank';
//    a.innerHTML = 'Play Recording';
//    a.href = URL.createObjectURL(mediablob);
//    document.getElementById('mydiv').appendChild(a);
//}
//
//--From remote WebRTC stream--
//this depends on your implementation but basically just get 
//the stream from the RTP/SRTP channels then pass that in the parameter

myrtcrecorder.start(); //This will start the audio recording for the source stream

myrtcrecorder.stop(); //This will stop the audio recording

myrtcrecorder.onRecord = function(mediablob) {
    //This is the event handler that will be called once the recording is done.
    //Add your logic to make use of the media recording
} 
```

**Please check the test web page (test.html) for working sample**
