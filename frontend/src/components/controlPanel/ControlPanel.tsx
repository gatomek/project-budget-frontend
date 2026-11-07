import type {ReactNode} from "react";
import styles from './ControlPanel.module.css';

export interface ControlPanelProps {
    children: ReactNode;
}

export function ControlPanel({children}: Readonly<ControlPanelProps>) {
    return (
        <div className={styles.root}>{
            children
        }
        </div>
    )
}
