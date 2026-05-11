const fs = require('fs');
const s = fs.readFileSync('./routes/admin.js','utf8');
let braces=0, parens=0, brackets=0;
let single=0,double=0,backtick=0;
let inSingle=false,inDouble=false,inBack=false,inLineComment=false,inBlockComment=false;
for (let i=0;i<s.length;i++){
  const c=s[i];
  const n=s[i+1]||'';
  if (inLineComment){ if (c==='\n') inLineComment=false; continue; }
  if (inBlockComment){ if (c==='*'&&n=='/') { inBlockComment=false; i++; } continue; }
  if (!inSingle && !inDouble && !inBack){
    if (c==='/' && n=='/') { inLineComment=true; i++; continue; }
    if (c==='/' && n=='*') { inBlockComment=true; i++; continue; }
  }
  if (!inDouble && !inBack && c==="'") { inSingle=!inSingle; single++; continue; }
  if (!inSingle && !inBack && c==='"') { inDouble=!inDouble; double++; continue; }
  if (!inSingle && !inDouble && c==='`') { inBack=!inBack; backtick++; continue; }
  if (!inSingle && !inDouble && !inBack){
    if (c=='{') braces++;
    if (c=='}') braces--;
    if (c=='(') parens++;
    if (c==')') parens--;
    if (c=='[') brackets++;
    if (c==']') brackets--;
  }
}
console.log('braces',braces,'parens',parens,'brackets',brackets);
console.log('singleQuotesToggles',single,'doubleQuotesToggles',double,'backticksToggles',backtick);
console.log('inSingle',inSingle,'inDouble',inDouble,'inBack',inBack,'inBlockComment',inBlockComment,'inLineComment',inLineComment);
