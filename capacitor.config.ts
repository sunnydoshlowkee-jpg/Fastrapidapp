import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fastrapid.app',
  appName: 'Fast Rapid',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    // Native HTTP bypasses browser CORS in the Android WebView
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
