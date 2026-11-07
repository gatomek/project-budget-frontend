import type {ReactNode} from "react";
import styles from './Display.module.css';

export interface DisplayProps {
    children: ReactNode;
}

export function Display({children}: Readonly<DisplayProps>) {
    return (
        <div className={styles.root}>
            <div>{
                children
            }</div>
        </div>
    )
}
