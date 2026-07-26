import fs from 'node:fs';
import path from 'node:path';

const targets = ['src', 'index.html'];
const patterns = [
  ['Ã¡', 'á'],
  ['Ã©', 'é'],
  ['Ã­', 'í'],
  ['Ã³', 'ó'],
  ['Ãº', 'ú'],
  ['Ã±', 'ñ'],
  ['Ã', 'Á'],
  ['Ã‰', 'É'],
  ['Ã', 'Í'],
  ['Ã', 'Ó'],
  ['Ã', 'Ú'],
  ['Ã¼', 'ü'],
  ['Ãœ', 'Ü'],
  ['Ã¶', 'ö'],
  ['Ã„', 'Ä'],
  ['Ã–', 'Ö'],
  ['â€™', '’'],
  ['â€œ', '“'],
  ['â€', '”'],
  ['Â', ''],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist'].includes(entry.name)) continue;
      walk(full);
    } else if (/\.(ts|tsx|js|jsx|html|css|json|md|txt)$/.test(entry.name)) {
      const original = fs.readFileSync(full, 'utf8');
      let next = original;
      if (/[Ãâ]/.test(next)) {
        next = Buffer.from(next, 'latin1').toString('utf8');
      }
      for (const [from, to] of patterns) {
        next = next.split(from).join(to);
      }
      if (next !== original) {
        fs.writeFileSync(full, next, 'utf8');
        console.log('fixed', full);
      }
    }
  }
}

for (const target of targets) {
  if (fs.existsSync(target)) {
    if (fs.statSync(target).isDirectory()) {
      walk(target);
    } else {
      const original = fs.readFileSync(target, 'utf8');
      let next = original;
      if (/[Ãâ]/.test(next)) {
        next = Buffer.from(next, 'latin1').toString('utf8');
      }
      for (const [from, to] of patterns) {
        next = next.split(from).join(to);
      }
      if (next !== original) {
        fs.writeFileSync(target, next, 'utf8');
        console.log('fixed', target);
      }
    }
  }
}
