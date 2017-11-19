StreamType = {
    AUDIO: 1,
    VIDEO: 2,
    AUDIOVIDEO: 3
};

var Mimes = [
    { AUDIO: 'audio/webm; codecs=opus' },
    { VIDEO: 'video/webm; codecs=vp9' },
    { AUDIOVIDEO: 'video/webm; codecs=vp9,opus' }
];

function StreamRecorder(config, callbackhandler) {
    if (!config.stream) {
        config.recorder = undefined;
        config.datachunks = [];
        return;
    }

    try {
        config.recorder = new MediaRecorder(config.stream);
        config.recorder.ondataavailable = function(e) {
            if (config.recorder.state == 'recording') {
                config.datachunks.push(e.data);
            }
        };

        config.recorder.start(500);

        config.recorder.onstop = function() {
            if (config.datachunks.length > 0 && config.recorder.state == 'inactive') {
                var blob = new Blob(config.datachunks, { type: Mimes[config.streamtype] });
                callbackhandler(blob);
            }

            config.datachunks = [];
            config.recorder = undefined;
        };

        config.recorder.onerror = function(e) {
            config.datachunks = [];
            config.recorder = undefined;
            console.error(e);
        };
    } catch(exception) {
        config.recorder = undefined;
        config.datachunks = [];
        console.error(exception)
    }
}