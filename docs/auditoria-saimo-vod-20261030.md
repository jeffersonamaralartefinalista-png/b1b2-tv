# B1&B2 Tv — Auditoria Saimo VOD (30/10/2026)

## Evidência documental
Fonte: https://github.com/gabrielsaimo/SaimoPlayer
- O README descreve um espelho VOD publicado em https://saimo-filmes.pages.dev/.
- A pasta vod/ contém índices, filmes, séries, destaques, fichas, gêneros e IDs TMDB.
- O catálogo é gerado por scripts (gerar_vod.py e integrações), sem embutir todos os filmes no aplicativo.
- O README menciona scripts para verificar qualidade e indisponibilidade de fontes VOD.
- A documentação alerta sobre direitos autorais e distribuição.

Fonte: https://github.com/gabrielsaimo/Saimo-TV
- O aplicativo web lê listas remotas e permite fontes personalizadas.
- README recente menciona domínios alternativos filmes-saimo.pages.dev / canais-saimo.pages.dev; verificar qual está vigente antes de integrar.

## Decisão de arquitetura
- Catálogo Saimo: referência de organização e possível fonte de descoberta de metadados, condicionada à licença/condições de uso.
- Reprodução: nenhuma URL de filme comercial será importada sem comprovação de autorização para distribuição/incorporação.
- V24 permanece oficial; V29 (Internet Archive) descartada como catálogo-alvo.
- Não há catálogo de filmes homologado nem prova de que filmes comerciais recentes possam ser reproduzidos sem anúncios no B1&B2 Tv.

## Pipeline proposto
Descoberta de títulos -> normalização por TMDB -> deduplicação -> verificação de licença e fonte -> testes técnicos automáticos -> revisão de casos inconclusivos -> publicação somente dos aprovados.

## Próximo passo verificável
Inspecionar apenas o formato público do índice VOD e a licença de reutilização, sem copiar playlists de filmes comerciais; criar prova de conceito com dados de demonstração autorizados e sem tocar na V24.
