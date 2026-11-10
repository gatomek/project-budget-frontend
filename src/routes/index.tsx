import {createFileRoute} from '@tanstack/react-router';
import {MainPage} from '../components/mainPage/MainPage.tsx';

export const Route = createFileRoute('/')({
    component: MainPage
});
