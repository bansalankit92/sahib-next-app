import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sahibapp',
  appName: 'sahib-next-app',
  webDir: 'out',
  server: {
		url: 'https://dyaan.vercel.app',
		cleartext: true
	}
};

export default config;
