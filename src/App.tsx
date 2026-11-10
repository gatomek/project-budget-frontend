import './App.css';
import {useState} from 'react';
import {DeviceContext, type DeviceParam} from './components/context/DeviceContext.tsx';

import {createRouter, RouterProvider} from '@tanstack/react-router';

import {routeTree} from './routeTree.gen';

const router = createRouter({routeTree});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const [deviceParams, setDeviceParams] = useState<DeviceParam>();

    return (
        <DeviceContext value={{params: deviceParams, setDeviceParams: setDeviceParams}}>
            <RouterProvider router={router} />
        </DeviceContext>
    );
}

export default App;
