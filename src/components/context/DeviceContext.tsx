import {createContext, type Dispatch, type SetStateAction} from 'react';

export interface DeviceParam {
    id?: string;
    name?: string;
}

export interface DeviceContextParams {
    params?: DeviceParam;
    setDeviceParams: Dispatch<SetStateAction<undefined | DeviceParam>>;
}

export const DeviceContext = createContext<DeviceContextParams>({
    setDeviceParams: () => {}
});
