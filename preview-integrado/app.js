const player=document.querySelector('#player'),catalog=document.querySelector('#catalog'),search=document.querySelector('#search'),status=document.querySelector('#status'),current=document.querySelector('#current'),category=document.querySelector('#category'),favoritesOnly=document.querySelector('#favorites-only'),count=document.querySelector('#count');
let channels=[],hls=null,saved=[];try{saved=JSON.parse(localStorage.getItem('b1b2-tv-favoritos')||localStorage.getItem('tv-livre-favoritos')||'[]')}catch{}
const favorites=new Set(Array.isArray(saved)?saved:[]);
player.addEventListener('error',()=>status.textContent='Falha na reprodução. Confira sua conexão.');
function safeChannel(c){try{return Boolean(c.id&&c.name&&c.category&&new URL(c.url).protocol==='https:')}catch{return false}}
function play(ch){if(hls){hls.destroy();hls=null}player.pause();player.removeAttribute('src');player.load();current.textContent=ch.name;status.textContent='Carregando transmissão…';
if(player.canPlayType('application/vnd.apple.mpegurl'))player.src=ch.url;
else if(window.Hls?.isSupported()){hls=new Hls();hls.loadSource(ch.url);hls.attachMedia(player);hls.on(Hls.Events.ERROR,(_,d)=>{if(d.fatal){status.textContent='Transmissão indisponível.';hls.destroy();hls=null}})}
else{status.textContent='Navegador sem suporte a HLS.';return}
player.play().then(()=>status.textContent=ch.note||'Reproduzindo').catch(()=>status.textContent='Toque em ▶ para iniciar a reprodução.')}
function render(){const q=search.value.toLocaleLowerCase('pt-BR').trim();catalog.replaceChildren();
const selected=channels.filter(c=>(!q||c.name.toLocaleLowerCase('pt-BR').includes(q))&&(!category.value||c.category===category.value)&&(!favoritesOnly.checked||favorites.has(c.id)));
count.textContent=selected.length+' '+(selected.length===1?'transmissão':'transmissões');
for(const ch of selected){const card=document.createElement('div');card.className='card';const name=document.createElement('strong');name.textContent=ch.name;const desc=document.createElement('span');desc.textContent=ch.category;const row=document.createElement('div');row.className='card-actions';const btn=document.createElement('button');btn.textContent='▶ Assistir';btn.onclick=()=>play(ch);const fav=document.createElement('button');fav.textContent=favorites.has(ch.id)?'★ Favorito':'☆ Favoritar';fav.onclick=()=>{favorites.has(ch.id)?favorites.delete(ch.id):favorites.add(ch.id);localStorage.setItem('b1b2-tv-favoritos',JSON.stringify([...favorites]));render()};row.append(btn,fav);card.append(name,desc,row);catalog.append(card)}
if(!selected.length){const p=document.createElement('p');p.textContent='Nenhuma transmissão encontrada.';catalog.append(p)}}
search.addEventListener('input',render);category.addEventListener('change',render);favoritesOnly.addEventListener('change',render);
fetch('./catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()}).then(data=>{if(!Array.isArray(data))throw Error('Formato inválido');channels=data.filter(safeChannel);for(const item of [...new Set(channels.map(c=>c.category))].sort()){const option=document.createElement('option');option.value=item;option.textContent=item;category.append(option)}render()}).catch(()=>status.textContent='Não foi possível carregar o catálogo.');


/* Navegação espacial para TV: setas percorrem controles visíveis; Enter/OK ativa. */
(function initTvRemote(){
  const selectors='button:not(:disabled), input:not(:disabled), select:not(:disabled), video[controls]';
  function controls(){return [...document.querySelectorAll(selectors)].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0})}
  function move(key){
    const items=controls();if(!items.length)return;
    const active=document.activeElement;
    if(!items.includes(active)){items[0].focus();return}
    const a=active.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2;
    const candidates=items.filter(el=>el!==active).map(el=>{const r=el.getBoundingClientRect(),dx=r.left+r.width/2-ax,dy=r.top+r.height/2-ay;return {el,dx,dy}}).filter(x=>key==='ArrowRight'?x.dx>5:key==='ArrowLeft'?x.dx< -5:key==='ArrowDown'?x.dy>5:x.dy< -5);
    candidates.sort((a,b)=>{const horizontal=key==='ArrowLeft'||key==='ArrowRight';const primary=horizontal?'dx':'dy',cross=horizontal?'dy':'dx';return Math.abs(a[primary])+Math.abs(a[cross])*1.6-(Math.abs(b[primary])+Math.abs(b[cross])*1.6)});
    if(candidates[0]){candidates[0].el.focus({preventScroll:true});candidates[0].el.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'})}
  }
  document.addEventListener('keydown',event=>{
    if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))return;
    const active=document.activeElement;
    if(active?.matches('input,select,video'))return;
    event.preventDefault();move(event.key);
  });
  document.addEventListener('DOMContentLoaded',()=>{document.body.classList.add('tv-remote-ready')});
})();
