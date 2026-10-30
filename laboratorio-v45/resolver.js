/* V45: contrato de fontes isolado; sem descoberta por nome. */
(()=>{'use strict';
const manifestURL=new URL('./manifesto-fontes-v45.json',document.baseURI);
let current=null;
function episodeKey(d){
 if(!Number.isInteger(d.showId)||d.showId<=0||!Number.isInteger(d.season)||d.season<0||!Number.isInteger(d.episode)||d.episode<=0)throw Error('Identidade de episódio inválida');
 return `tvmaze:${d.showId}:s${d.season}:e${d.episode}`;
}
function resolve(data,d){
 if(data.version!==1||typeof data.revision!=='string'||!data.revision||!data.entries||Array.isArray(data.entries)||typeof data.entries!=='object')throw Error('Manifesto incompatível');
 const entry=data.entries[episodeKey(d)];
 if(!entry)return [];
 if(entry.tvmazeEpisodeId!==d.episodeId)throw Error('Identidade do episódio não conferida');
 if(!Array.isArray(entry.sources))throw Error('Lista de fontes inválida');
 const seen=new Set();
 return entry.sources.filter(s=>{
  if(!s||typeof s.url!=='string'||typeof s.label!=='string'||!s.label.trim()||s.integrationAllowed!==true||!['mp4','hls'].includes(s.format))return false;
  let u;try{u=new URL(s.url)}catch{return false}
  if(u.protocol!=='https:'||u.username||u.password||seen.has(u.href))return false;
  seen.add(u.href);return true;
 });
}
function stop(){if(current){current.abort.abort();if(current.hls)current.hls.destroy();if(current.video){current.video.pause();current.video.removeAttribute('src');current.video.load()}current=null}}
async function mount(box,state,detail){
 stop();const session={abort:new AbortController(),video:null,hls:null};current=session;
 try{
  episodeKey(detail);
  const r=await fetch(manifestURL,{cache:'no-store',signal:session.abort.signal});if(!r.ok)throw Error('HTTP '+r.status);
  const data=await r.json();if(current!==session||!box.isConnected)return;
  const sources=resolve(data,detail);
  if(!sources.length){state.textContent='Nenhuma fonte compatível cadastrada para este episódio.';return}
  state.textContent=sources.length+' fonte(s) cadastrada(s) · manifesto '+data.revision;
  const video=document.createElement('video');session.video=video;video.controls=true;video.playsInline=true;video.style.cssText='width:100%;aspect-ratio:16/9;background:black';box.append(video);
  for(const src of sources){const b=document.createElement('button');b.textContent='▶ '+src.label;b.onclick=()=>{
   if(current!==session)return;
   video.pause();if(session.hls){session.hls.destroy();session.hls=null}video.removeAttribute('src');video.load();
   state.textContent='Fonte selecionada: '+src.label;
   if(src.format==='hls'&&!video.canPlayType('application/vnd.apple.mpegurl')){
    if(!window.Hls?.isSupported()){state.textContent='HLS indisponível neste navegador.';return}
    session.hls=new window.Hls();session.hls.attachMedia(video);session.hls.loadSource(src.url);
    session.hls.on(window.Hls.Events.MANIFEST_PARSED,()=>{if(current===session)video.play().catch(()=>{state.textContent='Toque em ▶ para iniciar.'})});
    session.hls.on(window.Hls.Events.ERROR,(_,e)=>{if(e.fatal&&current===session)state.textContent='Falha nesta fonte. Selecione outro servidor.'});
   }else{video.src=src.url;video.load();video.play().catch(()=>{if(current===session)state.textContent='Toque em ▶ para iniciar.'})}
  };box.append(b)}
  video.onerror=()=>{if(current===session)state.textContent='Falha nesta fonte. Selecione outro servidor.'};
 }catch(e){if(e.name!=='AbortError'&&current===session&&box.isConnected)state.textContent='Não foi possível consultar fontes: '+e.message}
}
window.B1B2Sources={episodeKey,resolve,mount,stop};
window.addEventListener('pagehide',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
document.addEventListener('click',e=>{if(e.target.closest?.('#v37-close,#v37-m,#v37-s,.channel'))stop()});
document.getElementById('v37-q')?.addEventListener('input',stop);
})();
