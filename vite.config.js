import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/old-antique/",
  plugins: [react()],
    build: {
    sourcemap: true       // يمكّنك من رؤية ملفات .map جنب ملفات JS
  }
});
/*
الروتين للتحديثات
git add .
git commit -m "وصف التغييرات"
git push origin main
npm run build
npm run deploy
*/
