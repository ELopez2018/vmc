const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageLockPath = path.join(projectRoot, 'package-lock.json');
const versionFilePath = path.join(projectRoot, 'src', 'environments', 'version.ts');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function bumpPatch(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) {
    throw new Error(`Formato de version no soportado: ${version}. Use semver simple, por ejemplo 1.2.3`);
  }

  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]) + 1;

  return `${major}.${minor}.${patch}`;
}

function updateVersionFile(version) {
  const content = `export const APP_VERSION = '${version}';\n`;
  fs.writeFileSync(versionFilePath, content, 'utf8');
}

function main() {
  const pkg = readJson(packageJsonPath);
  const oldVersion = pkg.version;
  const newVersion = bumpPatch(oldVersion);

  pkg.version = newVersion;
  writeJson(packageJsonPath, pkg);

  if (fs.existsSync(packageLockPath)) {
    const lock = readJson(packageLockPath);
    lock.version = newVersion;

    if (lock.packages && lock.packages['']) {
      lock.packages[''].version = newVersion;
    }

    writeJson(packageLockPath, lock);
  }

  updateVersionFile(newVersion);

  console.log(`Version actualizada: ${oldVersion} -> ${newVersion}`);
}

main();
