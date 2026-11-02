import './App.css'
import Webcam from 'react-webcam';
import {useCallback, useRef, useState} from "react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const current = webcamRef.current;
    if (current) {
      const base64Image = current.getScreenshot();
      setImgSrc(base64Image);
    }

  }, [webcamRef]);

  const download = useCallback(() => {
    if(imgSrc == null) {
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
        <button onClick={capture}>Capture Photo</button>
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
                  <button disabled>Save</button>
                </div>
              </>
          }
        </div>
      </section>
  )
}

export default App;
