# Laboratório V46 — primeiro catálogo aberto

Derivado do HEAD V45 `deb4bffc6cc7960a81fc52670b272afe61d17afc`. Somente arquivos nesta nova pasta foram adicionados. V24, V45, PR #6, main e canais existentes preservados.

Preview privado separado: https://b1b2-v46-catalogo-aberto.jeff-amaral1717.chatgpt.site

## Obras completas

| Obra | Ano | Duração | Idioma | Licença |
|---|---|---|---|---|
| Wing It! | 2023 | 3min58s | Sem diálogos; trilha e efeitos | CC BY 4.0, Blender Foundation |
| Pepper & Carrot Motion Comic — Ep. 3: The Secret Ingredients | 2022 | 3min25s | Inglês | CC BY-SA 4.0, Morevna Project / David Revoy |
| Pepper & Carrot Motion Comic — Ep. 4: Stroke of Genius | 2022 | 3min35s | Inglês | CC BY-SA 4.0, Morevna Project / David Revoy |

Wing It! é curta-metragem completo, não longa nem trailer. Os episódios são adaptações animadas oficiais do webcomic; a numeração 3 e 4 foi preservada e nenhuma temporada foi inventada. Não há dublagem PT-BR validada.

## Fontes e direitos

Wing It!: MP4 480p e 1080p da API pública do Blender Video, com download habilitado. Licença: https://studio.blender.org/projects/wing-it/pages/licensing/ ; publicação: https://studio.blender.org/blog/wing-it-premiere/

Pepper & Carrot: MP4 em mirrors públicos do Internet Archive. O upload do mirror não é apresentado como oficial. Títulos, datas, numeração e licença foram confrontados com o produtor e seus repositórios oficiais:

- https://morevnaproject.org/2022/10/28/pepper-carrot-episode-3/
- https://morevnaproject.org/2022/11/27/peppercarrot-episode-4/
- https://morevnaproject.org/2022/11/27/sources-of-peppercarrot-episodes-3-4-and-5/
- https://gitlab.com/OpenSourceAnimation/pepper-and-carrot-ep03
- https://gitlab.com/OpenSourceAnimation/pepper-and-carrot-ep04
- https://archive.org/details/pepper-carrot-episode-3-the-secret-ingredients-english
- https://archive.org/details/pepper-carrot-episode-4-stroke-of-genius-1080p

As atribuições e links de licença aparecem dentro do app. Vídeos sem edição, créditos preservados. CC BY-SA aplica-se às obras e a adaptações delas; a aplicação não está sendo declarada como obra derivada dos vídeos. Nenhuma marca da Blender é usada como marca do B1&B2.

## Implementação mínima

O catálogo local preenche os mesmos cards e detalhes de filmes/séries da V45. A busca externa de fichas continua disponível quando não há correspondência no catálogo local; ela não ganha fontes por semelhança de nome. Os resultados externos continuam sem garantia de vídeo.

O resolver existente ganhou identificação `open:` para obras que não possuem TVmaze verificado e mantém a verificação anterior de `tvmazeEpisodeId`. Tipo, ID da obra, série e número do episódio precisam coincidir. Novas fontes exigem autorização explícita e documentação de licença. O manifesto continua na versão 1, com revisão própria V46 e metadados adicionais.

Não há player externo, iframe VOD ou extração de YouTube. MP4 usa o elemento HTML5 existente. A troca de qualidade do filme reaproveita o mesmo vídeo e reinicia a reprodução, como no seletor da V45. Não há fallback automático. Cada episódio tem uma fonte validada; não foram inventados servidores alternativos.

## Executar e testar

Servir esta pasta por HTTP e abrir `index.html`. HTML e manifesto precisam permanecer juntos. `preview-integrado-v46-catalogo.html` contém a mesma interface, com o resolver incorporado; `resolver.js` é sua origem testável.

`node laboratorio-v46/test-catalog.cjs` — valida identidade, licença, deduplicação, HTTPS e compatibilidade com o caminho TVmaze anterior. `node laboratorio-v45/test-contract.cjs` — regressão do contrato original, inalterado.

## Limitações

Catálogo pequeno de obras curtas abertas. Não resolve longas comerciais populares nem séries de plataformas pagas. Safari/iPhone e Smart TVs físicas não foram testados. A estabilidade dos hosts públicos não tem SLA. MP4 no Internet Archive não retornou CORS no teste de cabeçalhos, mas reproduziu no elemento de vídeo sem `crossorigin`; não presumir acesso a frames por canvas ou fetch autenticado.

Não foi implementado importador ou sincronização automática. PeerTube fornece APIs e IDs para uma futura atualização controlada; licenças e arquivos precisam ser revalidados antes de qualquer expansão. As fontes originais consultadas também tiveram falhas: o arquivo Nextcloud do Morevna retornou 503 e a instância Touhoppai não respondeu com API utilizável nesta sessão. Por isso esses endereços não foram cadastrados como servidores funcionais.

Sem merge. Homologação visual e de áudio no iPhone do proprietário permanece pendente.
