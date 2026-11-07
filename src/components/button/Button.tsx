import type {ReactNode} from "react";
import styles from './Button.module.css';

export interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export function Button({children, disabled, onClick}: Readonly<ButtonProps>) {
    return (
        <button className={styles.root}
                disabled={disabled}
                onClick={onClick}> {
            children
        }
        </button>
    )
}