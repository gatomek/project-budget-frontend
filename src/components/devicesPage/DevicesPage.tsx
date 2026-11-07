import styles from './DevicePage.module.css';
import {ControlPanel} from '../controlPanel/ControlPanel.tsx';
import {DisplayRow} from '../controlItemRow/DisplayRow.tsx';
import {Button} from '../button/Button.tsx';
import {useContext} from 'react';
import {ViewContext} from '../context/ViewContext.tsx';

export function DevicesPage() {
    const {setView} = useContext(ViewContext);

    return (
        <section className={styles.root}>
            <ControlPanel>
                <DisplayRow>
                    <Button onClick={() => setView('camera')}>Camera</Button>
                </DisplayRow>
            </ControlPanel>
        </section>
    )
}