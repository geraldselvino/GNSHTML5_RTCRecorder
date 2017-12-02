/**********************************************************
* Copyright (c) 2017, Gerald Selvino 
* <gerald.selvino@protonmail.com> All rights reserved.
*
* This contains the function to record the source stream
* into webm format.
***********************************************************/

/**
* @brief Enums indicating the stream type of the source stream
*/ 
StreamType = {
    AUDIO: "a",
    VIDEO: "v",
    AUDIOVIDEO: "av"
};

/**
* @brief Dictionary to map the StreamType to real mime types
* recognized by WebRTC
*/ 
var Mimes = {
    "a": 'audio/webm; codecs=opus',
    "v": 'video/webm; codecs=vp9',
    "av": 'video/webm; codecs=vp9,opus'
};

/**
* @brief The recorder function
* @param mediastream - The source audio stream. Can be a webm audio file,
* a microphone thru the getUserMedia(), or the remote side audio stream
* of a WebRTC call
* @param config - A structure that contains all the necessary input
* parameters
* @param callbackhandler - the callback function to be called once
* the recording is finished.
*/ 
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
        console.error(exception);
    }
}