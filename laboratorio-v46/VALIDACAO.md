# Evidências — V46

Data: 30/10/2026 (Brasília). Chrome remoto. Safari e TVs físicas não disponíveis nesta execução.

## Reprodução real

Sem alterar `currentTime`, sem acelerar o vídeo e sem simular mídia. Valores lidos dos elementos HTML5.

| Obra | Teste direto anterior à integração | Teste interno no app | Resultado |
|---|---|---|---|
| Wing It! | 480p chegou a `ended=true`, 237,916667s | 1080p: 77,446331s; 1920px; `paused=false`; sem erro reportado | Início e continuidade interna confirmados; curta completo disponível |
| Pepper & Carrot Ep. 3 | 161,143444s de 205,056s observados | 65,43049s; 1920px; `paused=false`; `muted=false`; sem erro reportado | Início e mais de 60s internos confirmados |
| Pepper & Carrot Ep. 4 | 141,294785s de 215,041667s observados | 86,349775s; 1920px; `paused=false`; `muted=false`; sem erro reportado | Início e mais de 60s internos confirmados |

As imagens mostraram os personagens e cenas correspondentes às obras. A seleção permaneceu dentro do B1&B2, sem iframe VOD, redirecionamento, YouTube ou player de terceiro.

Foi testada troca de Wing It! de 1080p para 480p: o mesmo elemento de vídeo carregou a segunda fonte, avançando a 12,110851s e mudando a largura decodificada de 1920 para 854px. A troca reinicia do começo; não é troca adaptativa contínua.

Foi testada seleção do episódio 3, seguida do 4. Título, duração e arquivo mudaram; só um vídeo VOD permaneceu montado. Ao voltar aos resultados, o player foi removido (zero vídeos em `#v38-player`) e o catálogo da série reapareceu.

## HTTP e codecs

GET parcial de 1024 bytes, com Origin de teste, retornou 206 e Content-Type `video/mp4` nas três fontes principais. Wing It! retornou `Access-Control-Allow-Origin: *`; os mirrors dos episódios não retornaram esse cabeçalho. O elemento `<video>` sem atributo `crossorigin` reproduziu os episódios no app. Isso não certifica canvas, fetch de segmentos ou todos os domínios.

A API de metadados do Blender Video e as APIs dos episódios na Film Freedom documentam H.264 + AAC, 48kHz. As APIs da Film Freedom foram consultadas para conferir metadados/licença e um caminho futuro de atualização; seus feeds HLS não foram adicionados ou homologados. O laboratório publicado usa MP4.

Não houve teste de audição humana nesta interface de automação; existência de faixa de áudio e estado não silenciado não certificam volume percebido ou sincronismo em todos os dispositivos. Conferência auditiva no iPhone permanece na homologação.

## Identidades e regressão

- 12 verificações originais da V45 passaram, sem editar seus arquivos.
- 12 verificações novas passaram: erro de episódio/série/tipo, ausência de licença, fonte sem permissão, HTTPS, duplicatas, versão e compatibilidade TVmaze.
- Scripts inline compilados sem erro de sintaxe.
- Resolver publicado no HTML coincide com a origem testada.
- `index.html` e o HTML de preview V46 são iguais.
- Script original dos 21 canais é idêntico byte a byte ao da V45. Nenhum canal foi reconfigurado.
- V24 e pasta V45 sem diferenças contra o HEAD de origem.

## Preview e limites

Preview privado publicado separadamente: https://b1b2-v46-catalogo-aberto.jeff-amaral1717.chatgpt.site

A interface publicada foi aberta e confirmou o catálogo preenchido. As medições de 60s acima foram feitas na cópia local do mesmo HTML/manifesto antes da publicação. Não se atribuem esses tempos ao domínio publicado.

As verificações negativas do contrato não simulam um teste real de falha de CDN. Não houve indisponibilidade observada nas fontes integradas durante os trechos medidos; fallback automático e resistência a longas interrupções não foram implementados ou testados.

Sem garantia de SLA, sem catálogo comercial popular, sem dublagem brasileira validada e sem homologação Safari/Smart TV. Nenhum merge.
