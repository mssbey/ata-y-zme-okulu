import fs from 'node:fs';
import ts from 'typescript';
import crypto from 'node:crypto';
const files=['src/data/site.ts','src/components/ui.tsx','src/components/Layout.tsx',...fs.readdirSync('src/pages').filter(f=>f.endsWith('.tsx')&&f!=='Admin.tsx').map(f=>'src/pages/'+f)];
const old=JSON.parse(fs.readFileSync('src/content/catalog.json','utf8'));
const keyFor=value=>'text_'+crypto.createHash('sha256').update(value).digest('hex').slice(0,16);
const humanProps=new Set(['eyebrow','lead','title','text','message','placeholder','alt','aria-label']);
for(const file of files){let source=fs.readFileSync(file,'utf8');const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);const edits=[];
function walk(n){
 if(ts.isTypeNode(n)||ts.isImportDeclaration(n))return;
 if(ts.isCallExpression(n)&&n.expression.getText(ast)==='contentText'){
  const value=n.arguments[1]?.text;
  if(value!==undefined&&(!/[\p{L}\p{N}]/u.test(value)||value==='0'||/^M\d/.test(value))){const jsx=ts.isJsxExpression(n.parent);edits.push({start:n.getStart(ast),end:n.end,text:JSON.stringify(value)});}
  return;
 }
 if(ts.isStringLiteral(n)){
  const p=n.parent;const attr=ts.isJsxAttribute(p)?p.name.getText(ast):'';
  const call=ts.isCallExpression(p)?p.expression.getText(ast):'';
  if((attr&&humanProps.has(attr)&&n.text)||(call==='usePageMeta'&&p.arguments[0]===n&&n.text)||(call==='whatsapp'&&n.text))edits.push({start:n.getStart(ast),end:n.end,text:(attr?'{':'')+`contentText('${keyFor(n.text)}', ${JSON.stringify(n.text)})`+(attr?'}':'')});
 }
 ts.forEachChild(n,walk);
}
walk(ast);for(const e of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,e.start)+e.text+source.slice(e.end);fs.writeFileSync(file,source);}
// Match category labels in the filter and gallery data.
let gallery=fs.readFileSync('src/pages/Gallery.tsx','utf8').replace(", 'Tesis']",`, contentText('${keyFor('Tesis')}', "Tesis")]`);fs.writeFileSync('src/pages/Gallery.tsx',gallery);
const mappings={brand:['Genel içerik','Layout','Contact'],nav:['Layout'],programs:['Programs','ProgramDetail','Home','Enrollment','Contact','Layout'],stats:['Home'],values:['Home','About'],pathway:['Home','Programs'],ageStages:['ProgramDetail'],enrollmentSteps:['Enrollment'],equipment:['Enrollment'],advice:['Enrollment'],faqGroups:['Faq','Home'],gallery:['Gallery']};
const entries=new Map();const faqSchema=[];const imageUsage={};
for(const file of files){const source=fs.readFileSync(file,'utf8');const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);const page=file.split('/').pop().replace(/\.tsx?$/,'');
function walk(n){if(ts.isCallExpression(n)&&n.expression.getText(ast)==='contentText'){
 const key=n.arguments[0]?.text,value=n.arguments[1]?.text;if(key&&value!==undefined){let variable='';let a=n;while(a){if(ts.isVariableDeclaration(a)){variable=a.name.getText(ast);break;}a=a.parent;}
 const groups=file.includes('/data/')?(mappings[variable]??['Genel içerik']):[page];const e=entries.get(key)??{key,value,groups:[],locations:[]};for(const g of groups)if(!e.groups.includes(g))e.groups.push(g);e.locations.push({file,variable});entries.set(key,e);}return;}
 if(ts.isPropertyAssignment(n)&&n.name.getText(ast)==='image'&&ts.isStringLiteral(n.initializer)){imageUsage[n.initializer.text]??=[];imageUsage[n.initializer.text].push(page);}
 if(ts.isJsxAttribute(n)&&n.name.getText(ast)==='name'&&n.initializer&&ts.isStringLiteral(n.initializer)){const name=n.initializer.text;if(fs.existsSync('public/img/'+name+'.webp')){imageUsage[name]??=[];imageUsage[name].push(page);}}
 if(file.endsWith('site.ts')&&ts.isObjectLiteralExpression(n)){
 const props=Object.fromEntries(n.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(ast),p.initializer]));
 if(props.q&&props.a){let category=n.parent;while(category&&!ts.isObjectLiteralExpression(category))category=category.parent;const title=category?.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast)==='title')?.initializer;faqSchema.push({q:props.q.arguments[0].text,a:props.a.arguments[0].text,category:title.arguments[0].text});}
 }
 ts.forEachChild(n,walk);
}walk(ast);}
fs.writeFileSync('src/content/catalog.json',JSON.stringify([...entries.values()],null,2));fs.writeFileSync('src/content/faq-schema.json',JSON.stringify(faqSchema,null,2));fs.writeFileSync('src/content/image-usage.json',JSON.stringify(imageUsage,null,2));console.log(JSON.stringify({texts:entries.size,faqPairs:faqSchema.length,removed:old.filter(e=>!entries.has(e.key)).map(e=>e.value)}));
