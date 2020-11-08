import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

// gs://sound-bite-277bd/sounds/blob:http:/localhost:3000/dee2a1ea-091b-4405-97cd-8737ce4eb596
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
// https://us-central1-sound-bite-277bd.cloudfunctions.net/SpeechToText?bN=sound-bite-277bd&sAN=sounds/blob:http:/localhost:3000/dee2a1ea-091b-4405-97cd-8737ce4eb596
// https://us-central1-sound-bite-277bd.cloudfunctions.net/SpeechToText?bN=sound-bite-277bd&sAN=sounds/blob:http:/localhost:3000/085d5f12-8b7b-44e0-957e-df063b7a77c5
//gs://sound-bite-277bd/sounds/blob:http:/localhost:3000/085d5f12-8b7b-44e0-957e-df063b7a77c5
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
        console.log("submitting blobURL...");
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
