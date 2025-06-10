import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		host: true, // or '0.0.0.0'
		port: 3000,
		proxy: {
			"/api": {
				target: "https://busy-analytics-server.s3.us-east-1.amazonaws.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
