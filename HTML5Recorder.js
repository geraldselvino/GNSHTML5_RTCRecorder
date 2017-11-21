/**********************************************************
* Copyright (c) 2017, Gerald Selvino 
* <gerald.selvino@protonmail.com> All rights reserved.
*
* This file contains the function constructor for the
* library's programming interface.
***********************************************************/

/**
* @brief Function constructor containing the configurations
*/
function Config() {
    this.recorder = undefined;
    this.datachunks = [];
    this.stream = undefined;
    this.streamtype = undefined;
}

/**
* @brief The function constructor to instantiate the Html5Recorder
* library
* @param mediastream - The source audio stream. Can be a microphone 
* thru the getUserMedia(), or the remote side audio stream of a 
* WebRTC call
* @param mediastreamtype - The type of stream the mediastream is
*/ 
function Html5Recorder(mediastream, mediastreamtype) {
    this.sessionconfig = new Config();

    if (mediastream)
        this.sessionconfig.stream = mediastream;
    if (mediastreamtype)
        this.sessionconfig.streamtype = mediastreamtype;

    this.onRecord = function(mediablob) {};
}

/**
* @brief Simply the Html5Recorder prototype
*/ 
Html5Recorder.prototype = {
    start: function() {
        StreamRecorder(this.sessionconfig, this.onRecord);
    },
    stop: function() {
        if (this.sessionconfig && this.sessionconfig.recorder)
            this.sessionconfig.recorder.stop();
    },
    setStream: function(mediastream, mediastreamtype) {
        if (mediastream)
            this.sessionconfig.stream = mediastream;
        if (mediastreamtype)
            this.sessionconfig.streamtype = mediastreamtype;
    }
};