import fs from 'node:fs';
const file = 'src/App.tsx';
let text = fs.readFileSync(file, 'utf8');
text = text.replace("import colegioVedruna from './imagenes/Colegio/3 (2).png'", "import colegioVedruna from './imagenes/Colegio/3.png'");
fs.writeFileSync(file, text, 'utf8');
console.log('updated');
