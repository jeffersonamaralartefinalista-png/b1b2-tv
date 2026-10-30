# B1&B2 Tv — Levantamento inicial: filmes sob demanda (30/10/2026)

## Objetivo
Criar uma seção de descoberta de filmes, análoga à busca Saimo para canais, sem interferir nos 21 canais homologados.

## Separar três conceitos
- Metadados de filme (título, capa, ano, sinopse): não significam direito de reprodução.
- Disponibilidade legal em plataforma: pode exigir abrir o serviço de origem.
- Reprodução embutida no B1&B2 Tv: exige URL compatível, permissões e validação real no Safari e em Smart TV.

## Fontes candidatas para pesquisa
- Plex: https://watch.plex.tv/pt-BR/on-demand — catálogo gratuito com anúncios; conferir disponibilidade brasileira e se há forma autorizada de incorporação.
- Pluto TV: https://pluto.tv/br/ — pesquisar catálogo sob demanda e possibilidade oficial de integração, sem assumir que existe API pública ou embed.
- Internet Archive: https://archive.org/details/movies — pesquisar títulos com direitos claramente identificados; não presumir domínio público apenas por estarem hospedados.

## Modelo de dados proposto
id, titulo, ano, sinopse, poster, genero, idioma, classificacao, provedor, pagina_oficial, tipo_acesso (externo/iframe/video), url_reproducao, direitos_verificados, safari_testado, smart_tv_testado, status.

## Próximas validações
1. Escolher fonte com catálogo consultável de modo permitido e estável.
2. Identificar filmes com acesso gratuito e condições de incorporação.
3. Validar 3 títulos reais em Safari, sem criar promessas de reprodução não testadas.
4. Prototipar aba Filmes separada da TV ao vivo; preservar V24.

## Pendência paralela dos canais
- 17/21 iniciam no primeiro clique na V28, segundo relato do usuário.
- TV Câmara, TV Brasil, TV Cultura e Cultura Fast exigem segundo Play.
- TV Câmara e TV Brasil também apresentam fullscreen automático.
- Não substituir fontes ou presumir autoplay de iframes sem validação.
