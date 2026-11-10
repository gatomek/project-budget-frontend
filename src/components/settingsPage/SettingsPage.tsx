import styles from './SettingsPage.module.css';
import {ControlPanel} from '../controlPanel/ControlPanel.tsx';
import {DisplayRow} from '../displayRow/DisplayRow.tsx';
import {Button} from '../button/Button.tsx';
import {useContext} from 'react';
import {useMediaDevices} from 'react-media-devices';
import {DeviceContext} from '../context/DeviceContext.tsx';
import {useNavigate} from '@tanstack/react-router';

export function SettingsPage() {
    const {setDeviceParams} = useContext(DeviceContext);
    const navigate = useNavigate();

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
                            }}
                        >
                            {vd.label}
                        </Button>
                    ))}
                    <Button
                        onClick={() => {
                            setDeviceParams({});
                        }}
                    >
                        Auto
                    </Button>
                </DisplayRow>
            </div>

            <ControlPanel>
                <DisplayRow>
                    <Button onClick={() => navigate({to: '/'})}>Save</Button>
                </DisplayRow>
            </ControlPanel>
        </section>
    );
}
