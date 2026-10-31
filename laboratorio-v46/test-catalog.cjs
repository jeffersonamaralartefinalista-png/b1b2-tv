const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={URL,window:{addEventListener(){}},document:{baseURI:'https://example.invalid/lab/',addEventListener(){},getElementById(){return null}}};
vm.runInNewContext(fs.readFileSync(__dirname+'/resolver.js','utf8'),ctx);
const api=ctx.window.B1B2Sources,m=JSON.parse(fs.readFileSync(__dirname+'/manifesto-fontes-v46.json'));
let n=0;function test(name,fn){fn();console.log('PASS '+name);n++}
const ep={catalogKey:'open:morevna:pepper-carrot:ep3',type:'episode',seriesId:'morevna:pepper-carrot-motion-comic',episode:3};
test('3 obras com identidades próprias e direitos documentados',()=>{assert.equal(Object.keys(m.entries).length,3);for(const [key,e]of Object.entries(m.entries)){assert.equal('open:'+e.contentId,key);assert.ok(e.rights.evidenceUrl);assert.ok(e.sources.length)}});
test('episódio 3 resolve sem inventar TVmaze',()=>assert.ok(api.resolve(m,ep).length));
test('episódio 4 não pode receber vídeo do episódio 3',()=>assert.throws(()=>api.resolve(m,{...ep,episode:4})));
test('série divergente bloqueada',()=>assert.throws(()=>api.resolve(m,{...ep,seriesId:'outra-serie'})));
test('filme não pode ser tratado como episódio',()=>assert.throws(()=>api.resolve(m,{catalogKey:'open:blender:wing-it-2023',type:'episode'})));
test('licença ausente bloqueia fonte aberta',()=>{const d=structuredClone(m);delete d.entries[ep.catalogKey].rights;assert.throws(()=>api.resolve(d,ep))});
test('sem permissão explícita, fonte não é retornada',()=>{const d=structuredClone(m);for(const s of d.entries[ep.catalogKey].sources)s.integrationAllowed=false;assert.equal(api.resolve(d,ep).length,0)});
test('IDs TVmaze antigos mantêm verificação estrita',()=>{const d={version:1,revision:'test',entries:{'tvmaze:10:s1:e1':{tvmazeEpisodeId:101,sources:[]}}};assert.equal(api.resolve(d,{showId:10,episodeId:101,season:1,episode:1}).length,0);assert.throws(()=>api.resolve(d,{showId:10,episodeId:102,season:1,episode:1}))});
test('duplicatas não viram servidores extras',()=>{const d=structuredClone(m),s=d.entries[ep.catalogKey].sources[0];d.entries[ep.catalogKey].sources=[s,s];assert.equal(api.resolve(d,ep).length,1)});
test('HTTPS obrigatório e sem credenciais',()=>{const d=structuredClone(m);d.entries[ep.catalogKey].sources[0].url='http://example.invalid/a.mp4';assert.equal(api.resolve(d,ep).length,0)});
test('versão incompatível não é aceita',()=>assert.throws(()=>api.resolve({...m,version:2},ep)));
test('resolver e HTML publicados são iguais',()=>{const html=fs.readFileSync(__dirname+'/index.html','utf8');assert.ok(html.includes(fs.readFileSync(__dirname+'/resolver.js','utf8')));assert.equal(html,fs.readFileSync(__dirname+'/preview-integrado-v46-catalogo.html','utf8'));for(const [,js]of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(js)});
console.log(n+' verificações passaram. Reprodução exige teste no navegador.');
