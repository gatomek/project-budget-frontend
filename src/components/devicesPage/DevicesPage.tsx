import styles from './DevicePage.module.css';
import {ControlPanel} from '../controlPanel/ControlPanel.tsx';
import {DisplayRow} from '../controlItemRow/DisplayRow.tsx';
import {Button} from '../button/Button.tsx';
import {useContext} from 'react';
import {ViewContext} from '../context/ViewContext.tsx';
import {useMediaDevices} from 'react-media-devices';
import {DeviceContext} from '../context/DeviceContext.tsx';

export function DevicesPage() {
    const {setView} = useContext(ViewContext);
    const {setDeviceParams} = useContext(DeviceContext);

    const {devices} = useMediaDevices({
        constraints: {
            video: true,
            audio: false
        }
    });

    const videoDevices = devices?.filter((d) => d.kind === 'videoinput');

    return (
        <section className={styles.root}>
            <div style={{textAlign: 'left'}}>
                <DisplayRow>
                    {videoDevices?.map((vd) => (
                        <Button
                            key={vd.deviceId}
                            onClick={() => {
                                setDeviceParams({id: vd.deviceId, name: vd.label});
                                setView('camera');
                            }}
                        >
                            {vd.label}
                        </Button>
                    ))}
                    <Button
                        onClick={() => {
                            setDeviceParams({});
                            setView('camera');
                        }}
                    >
                        Clear
                    </Button>
                </DisplayRow>
            </div>

            <ControlPanel>
                <DisplayRow>
                    <Button onClick={() => setView('camera')}>Camera</Button>
                </DisplayRow>
            </ControlPanel>
        </section>
    );
}
