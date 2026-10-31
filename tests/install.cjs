const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.join(__dirname,'..');
const m=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
assert.strictEqual(m.name,'GV-3901 parada');assert.strictEqual(m.short_name,'GV-3901 parada');
assert(m.icons.some(x=>x.purpose==='maskable'));assert(m.display==='standalone');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('apple-mobile-web-app-title" content="GV-3901 parada"'));
const source=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const handlers={},app={innerHTML:''};let prompted=0;let setted='';
const doc={getElementById:(id)=>id==='app'?app:null,querySelector:()=>null,addEventListener:()=>{},body:{classList:{toggle:()=>{}},appendChild:()=>{}},createElement:()=>({remove:()=>{}})};
const w={addEventListener:(event,fn)=>{handlers[event]=fn},scrollTo:()=>{},setTimeout:()=>0,matchMedia:()=>({matches:false,addEventListener:()=>{}}),print:()=>{}};
const ctx={Date,Math,JSON,Array,String,Number,Object,Boolean,Set,Map,Blob,URL,console,window:w,localStorage:{getItem:()=>null,setItem:(k,v)=>{setted=v}},navigator:{userAgent:'Android',platform:'',maxTouchPoints:0},location:{protocol:'https:',hostname:'demo.example',hash:''},document:doc,setTimeout:()=>0,clearTimeout:()=>{},confirm:()=>true};
vm.createContext(ctx);vm.runInContext(source,ctx);
assert(app.innerHTML.includes('data-action="install"'));assert(app.innerHTML.includes('GV-3901 parada'));
// On browsers with no deferred prompt, explain manual installation.
vm.runInContext("actionRouter('install',{})",ctx);
assert(app.innerHTML.includes('Instalar GV-3901 parada'));
assert(app.innerHTML.includes('Adicionar à tela inicial'));
// On browsers that dispatch beforeinstallprompt, open native installation dialog.
handlers.beforeinstallprompt({preventDefault:()=>{},prompt:()=>{prompted++;return Promise.resolve()},userChoice:Promise.resolve({outcome:'accepted'})});
vm.runInContext("actionRouter('install',{})",ctx);
setTimeout(()=>{assert.strictEqual(prompted,1);handlers.appinstalled();assert(!app.innerHTML.includes('class="btn btn-install install-top-btn"'));console.log('OK — manifesto, botão sempre visível em navegador, instruções manuais e evento nativo de instalação.')},0);
