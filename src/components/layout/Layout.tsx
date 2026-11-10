import {Button} from '../button/Button.tsx';
import {Outlet, useNavigate} from '@tanstack/react-router';
import styles from './Layout.module.css';

export function Layout() {
    const navigate = useNavigate();
    return (
        <>
            <header className={styles.root}>
                <Button onClick={() => navigate({to: '/'})}>Home</Button>
                <Button onClick={() => navigate({to: '/settings'})}>Settings</Button>
                <Button onClick={() => undefined} disabled={true}>
                    About
                </Button>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}
