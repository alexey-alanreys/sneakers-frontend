import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '../dist');

fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('Copied index.html → 404.html');
