import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        plugins: [react(), tailwindcss()],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },

        optimizeDeps: {
            include: ["@tsparticles/slim"], // importante
        },

        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                },
            },
        },

        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: './src/setupTests.ts',
        },
    };
});