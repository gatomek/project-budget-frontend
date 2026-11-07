import './App.css'
import Webcam from 'react-webcam';
import {useCallback, useRef, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import {Display} from "./components/display/Display.tsx";
import {DisplayRow} from "./components/controlItemRow/DisplayRow.tsx";
import {Button} from "./components/button/Button.tsx";
import {ControlPanel} from "./components/controlPanel/ControlPanel.tsx";

const videoConstraints = {
    facingMode: "environment",
    width: {ideal: 3840, max: 4096},
    height: {ideal: 2160, max: 2160}
};

interface fileFormat {
    mime: "image/webp" | "image/png" | "image/jpeg" | undefined;
    ext: string;
}

const jpegFormat: fileFormat = {
    ext: "jpg",
    mime: "image/jpeg"
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error('Missing required environment variable: VITE_BACKEND_URL');
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

function App() {
    const webcamRef = useRef<Webcam>(null);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [resolution, setResolution] = useState({width: 0, height: 0});

    const capture = useCallback(async () => {
        const current = webcamRef.current;
        if (current) {
            const videoTrack = current.stream?.getVideoTracks()[0];
            const settings = videoTrack?.getSettings();
            if (settings && settings.width && settings.height) {
                setResolution({
                    width: settings?.width ?? 1000,
                    height: settings?.height ?? 1000,
                })
            }

            const base64Image = current.getScreenshot({
                width: settings?.width ?? 0,
                height: settings?.height ?? 0,
            });

            if (base64Image) {
                const blob = await (await fetch(base64Image)).blob();
                setBlob(blob);
            }
        }

    }, [webcamRef]);

    const upload = async () => {
        if (blob == null) {
            return;
        }

        setStatus('uploading');
        setUploadProgress(0);

        const name = uuidv4() + "." + jpegFormat.ext;
        const formData = new FormData();
        formData.append('file', blob, name);
        console.log(`Uploading ${name}: ${blob.type} of size ${blob.size}`)

        try {
            await axios.post(backendUrl, formData, {
                timeout: 60000,
                timeoutErrorMessage: '! timeout !',
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total ?
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(progress);
                }
            })
            setStatus('success')
            setUploadProgress(100);
        } catch {
            setStatus('error')
            setUploadProgress(0);
        }
    };

    return (
        <section id="center">
            <div style={{
                position: 'relative',
                maxWidth: '600px',
                margin: '0 auto',
            }}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat={jpegFormat.mime}
                    screenshotQuality={1}
                    videoConstraints={videoConstraints}
                    style={{width: "100%", maxWidth: "600px", height: "auto"}}
                />
            </div>
            <ControlPanel>
                <DisplayRow>
                    <Display>
                        {resolution.width} x {resolution.height}
                        <br/>
                        {blob?.size}
                    </Display>
                    &nbsp;
                    <Display>
                        {status === 'success' && <div>Success</div>}
                        {status === 'error' && <div>Error</div>}
                        {status === 'uploading' && <div>{uploadProgress}%</div>}
                    </Display>
                </DisplayRow>
                <DisplayRow>
                    <Button onClick={capture}>
                        Capture<br/>{jpegFormat.ext.toUpperCase()}
                    </Button>
                    &nbsp;
                    <Button onClick={upload} disabled={!blob}>
                        Upload
                    </Button>
                </DisplayRow>
            </ControlPanel>
        </section>
    )
}

export default App;
