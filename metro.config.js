import { getDefaultConfig } from 'expo/metro-config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@screens': path.resolve(__dirname, 'src/screens'),
  '@store': path.resolve(__dirname, 'src/store'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@database': path.resolve(__dirname, 'src/database'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@navigation': path.resolve(__dirname, 'src/navigation'),
  '@styles': path.resolve(__dirname, 'src/styles'),
  '@assets': path.resolve(__dirname, 'src/assets'),
};

config.watchFolders = [
  path.resolve(__dirname, 'src'),
];

export default config;