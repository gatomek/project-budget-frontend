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
                <Button onClick={() => {}} disabled={true}>About</Button>
            </header>

            <main className="mx-auto max-w-7xl p-4 py-8">
                <Outlet />
            </main>
        </>
    );
}