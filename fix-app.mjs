import fs from 'node:fs';
const path = 'src/App.tsx';
let s = fs.readFileSync(path, 'utf8');
s = s.replace('./info/Comunicaci\u00f3n CNSSC .pdf', './info/comunicacion-cnssc.pdf');
s = s.replace('./info/ComunicaciÃ³n CNSSC .pdf', './info/comunicacion-cnssc.pdf');
fs.writeFileSync(path, s, 'utf8');
console.log('fixed');
