import Webcam from 'react-webcam';
import {useCallback, useContext, useRef, useState} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {Display} from '../display/Display.tsx';
import {DisplayRow} from '../controlItemRow/DisplayRow.tsx';
import {Button} from '../button/Button.tsx';
import {ControlPanel} from '../controlPanel/ControlPanel.tsx';
import {ViewContext} from '../context/ViewContext.tsx';
import styles from './CameraPage.module.css';
import {DeviceContext} from '../context/DeviceContext.tsx';

interface Resolution {
    width?: number;
    height?: number;
}

const videoConstraints: MediaTrackConstraintSet = {
    facingMode: 'environment',
    width: {ideal: 3840, max: 4096},
    height: {ideal: 2160, max: 2160}
};

interface FileFormat {
    mime: 'image/webp' | 'image/png' | 'image/jpeg' | undefined;
    ext: string;
}

const jpegFormat: FileFormat = {
    ext: 'jpg',
    mime: 'image/jpeg'
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error('Missing required environment variable: VITE_BACKEND_URL');
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export function CameraPage() {
    const webcamRef = useRef<Webcam>(null);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [resolution, setResolution] = useState<Resolution>({});

    const {setView} = useContext(ViewContext);
    const {params} = useContext(DeviceContext);

    const onUserMedia = (stream: MediaStream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack?.getSettings();
        if (settings?.width && settings.height) {
            setResolution({
                width: settings.width,
                height: settings.height
            });
        }
    };

    const capture = useCallback(async () => {
        const current = webcamRef.current;
        if (current) {
            const {width, height} = resolution;
            const base64Image =
                width && height ? current.getScreenshot({width: width, height: height}) : current.getScreenshot();

            setBlob(base64Image ? await (await fetch(base64Image)).blob() : null);
        }
    }, [webcamRef, resolution]);

    const upload = async () => {
        if (!blob) {
            return;
        }

        setStatus('uploading');
        setUploadProgress(0);

        const name = uuidv4() + '.' + jpegFormat.ext;
        const formData = new FormData();
        formData.append('file', blob, name);

        try {
            await axios.post(backendUrl, formData, {
                timeout: 60000,
                timeoutErrorMessage: '! timeout !',
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(progress);
                }
            });
            setStatus('success');
            setUploadProgress(100);
        } catch {
            setStatus('error');
            setUploadProgress(0);
        }
    };

    return (
        <section className={styles.root}>
            <div
                style={{
                    position: 'relative',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
            >
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat={jpegFormat.mime}
                    screenshotQuality={0.95}
                    videoConstraints={params?.id ? {...videoConstraints, deviceId: params.id} : videoConstraints}
                    onUserMedia={onUserMedia}
                    forceScreenshotSourceSize={true}
                    style={{width: '100%', maxWidth: '600px', height: 'auto'}}
                />
            </div>
            <ControlPanel>
                <DisplayRow>
                    <Display>
                        {resolution.width && resolution.height ? `${resolution.width} x ${resolution.height}` : ''}
                        <br />
                        {blob?.size}
                    </Display>
                    &nbsp;
                    <Display>
                        {
                            {
                                success: 'Success',
                                error: 'Error',
                                uploading: `${uploadProgress}%`,
                                idle: ''
                            }[status]
                        }
                    </Display>
                </DisplayRow>
                <DisplayRow>
                    <Button onClick={() => setView('devices')}>
                        Devices
                        <div>{params?.name ? params.name : 'AUTO'}</div>
                    </Button>
                    <Button onClick={capture}>
                        Capture
                        <br />
                        {jpegFormat.ext.toUpperCase()}
                    </Button>
                    <Button onClick={upload} disabled={!blob || status === 'uploading'}>
                        Upload
                    </Button>
                </DisplayRow>
            </ControlPanel>
        </section>
    );
}
