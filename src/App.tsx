import './App.css';
import {CameraPage} from './components/cameraPage/CameraPage.tsx';
import {useState} from 'react';
import {type View, ViewContext} from './components/context/ViewContext.tsx';
import {DevicesPage} from './components/devicesPage/DevicesPage.tsx';
import {DeviceContext, type DeviceParam} from './components/context/DeviceContext.tsx';

function App() {
    const [view, setView] = useState<View>('camera');
    const [deviceParams, setDeviceParams] = useState<DeviceParam>();

    return (
        <ViewContext value={{view, setView}}>
            <DeviceContext value={{params: deviceParams, setDeviceParams: setDeviceParams}}>
                {
                    {
                        camera: <CameraPage />,
                        devices: <DevicesPage />
                    }[view]
                }
            </DeviceContext>
        </ViewContext>
    );
}

export default App;
