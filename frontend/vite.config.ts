import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import fs from 'node:fs';

const commitHash = process.env.GITHUB_SHA;

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
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
