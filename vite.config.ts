import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import {defineConfig} from 'vite'
import fs from 'node:fs';

const packageVersion = process.env.npm_package_version;
const commitHash = process.env.GITHUB_SHA;

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            quoteStyle: 'single',
            semicolons: false
        }),
        react()
    ],
    define: {
        APP_VERSION: JSON.stringify(packageVersion),
        COMMIT_HASH: JSON.stringify(commitHash)
    },
    server: {
        https: fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')
            ? {
                key: fs.readFileSync('./key.pem'),
                cert: fs.readFileSync('./cert.pem')
            } : undefined
    },
    envDir: './env',
})
