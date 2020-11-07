import MicRecorder from 'mic-recorder-to-mp3';
import React, { Component } from 'react'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Mic extends Component {

    constructor(props) {
        super(props);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        this.state = {
            isRecording: false,
            isPaused: false,
            isBlocked: false,
            blobURL: ''
        };
    }



    startRecording = () => {
        if (this.state.isBlocked) {
            console.log("Please give permission for the microphone to record audio.");
        } else {
            Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true });
                })
                .catch(e => console.error(e));
        }
    };

    stopRecording = () => {
        this.setState({ isRecording: false });
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                this.setState({
                    blobURL: blobURL,
                    isRecording: false
                });
            })
            .catch(e => console.log(e));
    };

    submitRecording = () => {
        this.props.setBlobURL(this.state.blobURL);
        this.setState({ blobURL: '' })
    }

    checkPermissionForAudio = () => {
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia =
                    // navigator.getUserMedia ||
                    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(
                        new Error("getUserMedia is not implemented in this browser")
                    );
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                this.setState({ isBlocked: false });
            })
            .catch(err => {
                this.setState({ isBlocked: true });
                console.log("Please give permission for the microphone to record audio.");
                console.log(err.name + ": " + err.message);
            });
    };

    componentDidMount() {
        this.checkPermissionForAudio();
    }

    render() {
        const { isRecording, isBlocked, blobURL } = this.state;
        return (
            <React.Fragment>
                <button
                    onClick={this.startRecording}
                    disabled={isBlocked || isRecording}
                >
                    Record
            </button>
                <button
                    onClick={this.stopRecording}
                    disabled={isBlocked || !isRecording}
                >
                    Stop
            </button>

                <button
                    onClick={this.submitRecording}
                    disabled={isBlocked || isRecording || blobURL === ''}
                >
                    Submit
            </button>
                <audio
                    ref="audioSource"
                    controls="controls"
                    src={this.state.blobURL || ""}
                />
            </React.Fragment>
        );
    }
}

