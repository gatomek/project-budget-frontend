import './App.css'
import Webcam from 'react-webcam';
import {useCallback, useRef, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

function App() {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState<UploadStatus>('idle');

    const capture = useCallback(() => {
        const current = webcamRef.current;
        if (current) {
            const base64Image = current.getScreenshot();
            setImgSrc(base64Image);
        }

    }, [webcamRef]);

    const upload = async () => {
        if (imgSrc == null) {
            return;
        }

        setStatus('uploading');
        setUploadProgress(0);

        const blob = await (await fetch(imgSrc)).blob();
        const name = uuidv4() + ".png";
        const formData = new FormData();
        formData.append('file', blob, name);
        console.log(`Uploading ${name}: ${blob.type} of size ${blob.size}`)

        try {
            await axios.post("http://localhost:8080/receipt", formData, {
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
    }


    const download = useCallback(() => {
        if (imgSrc == null) {
            return;
        }

        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'webcam-picture.png';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }, [imgSrc]);

    const remove = useCallback(() => {
        setImgSrc(null);
    }, []);

    return (
        <section id="center">
            <Webcam
                ref={webcamRef}
                audio={false}
                height={720}
                width={1280}
                style={{maxWidth: "100%", height: "auto"}}
                screenshotFormat={"image/png"}
                screenshotQuality={1}
                videoConstraints={videoConstraints}
            />
            <div>
                <button onClick={capture}>Capture Photo</button>
                &nbsp;
            </div>
            <div style={{width: "100%", height: "150px"}}>
                {imgSrc &&
                    <>
                        <div>
                            <img src={imgSrc} alt="img" height={"150px"}
                                 style={{border: "solid 1px gray", height: "150px"}}/>
                        </div>
                        <div>
                            <button onClick={() => remove()}>Remove</button>
                            &nbsp;
                            <button onClick={() => download()}>Download</button>
                            &nbsp;
                            <button onClick={upload}>Upload</button>
                        </div>
                    </>
                }
                {status === 'success' &&
                    <div>Success</div>
                }
                {status === 'error' &&
                    <div>Error</div>
                }
                {status === 'uploading' &&
                    <div>Progress: {uploadProgress}%</div>
                }
            </div>
        </section>
    )
}

export default App;
