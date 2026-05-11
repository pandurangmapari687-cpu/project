const fs=require('fs');
const s=fs.readFileSync('./routes/admin.js','utf8');
const lines=s.split(/\r?\n/);
let braces=0, parens=0, brackets=0;
for (let i=0;i<lines.length;i++){
  const line=lines[i];
  for (let j=0;j<line.length;j++){
    const c=line[j];
    if (c=='{') braces++; if (c=='}') braces--;
    if (c=='(') parens++; if (c==')') parens--;
    if (c=='[') brackets++; if (c==']') brackets--;
  }
  if (braces>0 || parens>0 || brackets>0){
    // record last line where any is >0
    var lastLine=i+1; var b=braces,p=parens,br=brackets;
  }
}
console.log('final counts -> braces',braces,'parens',parens,'brackets',brackets);
if (typeof lastLine!=='undefined') console.log('last line where any >0:', lastLine, '\n--- context ---\n', lines.slice(Math.max(0,lastLine-5), lastLine+5).join('\n'));
else console.log('no imbalance detected per-line');
