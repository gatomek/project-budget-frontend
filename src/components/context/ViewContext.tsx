import {createContext, type Dispatch, type SetStateAction} from 'react';

export type View = 'camera' | 'devices';

export interface ViewParams {
    view: View;
    setView: Dispatch<SetStateAction<View>>;
}

export const ViewContext = createContext<ViewParams>({
    view: 'camera',
    setView: () => {}
});
