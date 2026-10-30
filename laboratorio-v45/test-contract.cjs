const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={URL,window:{addEventListener(){}},document:{baseURI:'https://example.invalid/lab/',addEventListener(){},getElementById(){return null}}};
vm.runInNewContext(fs.readFileSync(__dirname+'/resolver.js','utf8'),context);
const api=context.window.B1B2Sources,d={showId:10,episodeId:101,season:1,episode:1};let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name)}
const source={url:'https://example.invalid/video.mp4',label:'Fixture sintética',format:'mp4',integrationAllowed:true};
function manifest(sources=[source]){return {version:1,revision:'test',entries:{'tvmaze:10:s1:e1':{tvmazeEpisodeId:101,sources}}}}
test('chave estável e namespaced',()=>assert.equal(api.episodeKey(d),'tvmaze:10:s1:e1'));
test('ID de episódio divergente bloqueia',()=>assert.throws(()=>api.resolve(manifest(),{...d,episodeId:102})));
test('episódio diferente não herda fontes',()=>assert.equal(api.resolve(manifest(),{...d,episode:2}).length,0));
test('manifesto vazio válido',()=>assert.equal(api.resolve(JSON.parse(fs.readFileSync(__dirname+'/manifesto-fontes-v45.json')),d).length,0));
test('fonte elegível é retornada',()=>assert.equal(api.resolve(manifest(),d).length,1));
test('duplicatas não aumentam disponibilidade',()=>assert.equal(api.resolve(manifest([source,source]),d).length,1));
test('HTTP, credenciais e fonte sem permissão rejeitados',()=>assert.equal(api.resolve(manifest([{...source,url:'http://example.invalid/v.mp4'},{...source,url:'https://user:secret@example.invalid/v.mp4'},{...source,integrationAllowed:false}]),d).length,0));
test('versão incompatível rejeitada',()=>assert.throws(()=>api.resolve({...manifest(),version:2},d)));
test('temporada inválida rejeitada',()=>assert.throws(()=>api.episodeKey({...d,season:NaN})));
test('atualização de revisão preserva chave',()=>{const m=manifest();m.revision='next';assert.equal(api.resolve(m,d).length,1)});
const html=fs.readFileSync(__dirname+'/preview-integrado-v45-contrato-fontes.html','utf8');
test('HTML não consulta commit antigo',()=>assert.ok(!html.includes('dad984b845c519acf6cf39e46c5d2f216f07736a')));
test('HTML contém o resolver testado',()=>assert.ok(html.includes(fs.readFileSync(__dirname+'/resolver.js','utf8'))));
for(const [,js] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(js);
console.log(passed+' verificações passaram; scripts HTML com sintaxe válida. Não testa reprodução.');
