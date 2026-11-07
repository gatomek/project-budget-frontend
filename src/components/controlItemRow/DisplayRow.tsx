import type {ReactNode} from "react";
import styles from './DisplayRow.module.css';

export interface DisplayRowProps {
    children: ReactNode;
}

export function DisplayRow({children}: Readonly<DisplayRowProps>) {
    return (
        <div className={styles.root}> {
            children
        }
        </div>
    )
}