# Cadastro de Filmes e Séries — B1&B2 Tv

O catálogo `catalogo-vod.json` separa `movies`, `series` e `kids`.

Cada item deve ter `id`, `title`, `genre`, `official_url`, `playback_type` e `rights_status`.

## Regras

- Usar `external_link` para abrir uma página oficial do serviço. Isso não autoriza player integrado.
- Usar `embedded` apenas quando termos oficiais permitirem incorporação em app de terceiros.
- Nunca copiar automaticamente catálogo, imagens, filmes, episódios ou URLs de terceiros sem licença.
- `rights_status` pode ser `pending`, `external_only` ou `embed_allowed`.
- Não apresentar títulos como disponíveis se a fonte não foi verificada.
- Separar filmes sob demanda de canais lineares de filmes.
- Classificação indicativa e filtro infantil são requisitos antes de disponibilizar conteúdos para crianças.

## Estado

Catálogo vazio até verificação das fontes e licenças. A interface de filtros pode ser testada sem conteúdo.
