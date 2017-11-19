function Config() {
    this.recorder = undefined;
    this.datachunks = [];
    this.stream = undefined;
    this.streamtype = undefined;
}

function Html5Recorder(mediastream, mediastreamtype) {
    this.sessionconfig = new Config();

    if (mediastream)
        this.sessionconfig.stream = mediastream;
    if (mediastreamtype)
        this.sessionconfig.streamtype = mediastreamtype;

    this.onRecord = function(mediablob){};
}

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