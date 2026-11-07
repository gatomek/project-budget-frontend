import './App.css';
import {CameraPage} from "./components/cameraPage/CameraPage.tsx";
import {useState} from 'react';
import {type View, ViewContext} from './components/context/ViewContext.tsx';
import {DevicesPage} from './components/devicesPage/DevicesPage.tsx';

function App() {
    const [view, setView] = useState<View>("camera");

    return (
        <ViewContext value={{view, setView}}>{
                {
                    'camera': <CameraPage />,
                    'devices': <DevicesPage />
                }[view]
            }
        </ViewContext>
    );
}

export default App;
