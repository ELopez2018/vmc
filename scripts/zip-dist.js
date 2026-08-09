const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const PROJECT_NAME = 'vmc';
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const VERSION = packageJson.version;

// 📌 carpeta REAL generada por Angular
const DIST_PATH = path.resolve(__dirname, '..', 'dist', 'vmc', 'browser');

// 📦 zip de salida
const ZIP_PATH = path.resolve(__dirname, '..', 'dist', 'vmc', `${PROJECT_NAME}-v${VERSION}.zip`);

if (!fs.existsSync(DIST_PATH)) {
  console.error('❌ No existe la carpeta dist compilada:', DIST_PATH);
  process.exit(1);
}

const output = fs.createWriteStream(ZIP_PATH);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);

// 👉 zippear TODO el contenido de browser (no crear carpeta extra)
archive.directory(DIST_PATH, false);

archive.finalize();

output.on('close', () => {
  console.log(`✅ ZIP creado: ${ZIP_PATH}`);

  // 🔥 borrar carpeta browser después del zip
  fs.rmSync(DIST_PATH, { recursive: true, force: true });
  console.log('🧹 Carpeta browser eliminada');
});

archive.on('error', err => {
  console.error('❌ Error al crear el ZIP:', err);
  process.exit(1);
});
