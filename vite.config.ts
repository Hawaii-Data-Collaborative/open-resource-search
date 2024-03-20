import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

console.log('process.env.VITE_DEPLOYMENT_TARGET=%s', process.env.VITE_DEPLOYMENT_TARGET)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_DEPLOYMENT_TARGET === 'beta' ? '/auw211' : '/'
})
