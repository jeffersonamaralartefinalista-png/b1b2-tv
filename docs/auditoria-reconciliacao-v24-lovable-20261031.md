# B1&B2 Tv — Reconciliação V24 × Lovable (31/10/2026)

## Base de comparação
- V24: `preview-integrado-v24.html` na `main` (21 canais).
- Lovable: projeto `f976d46f-27d9-4657-bcd5-272ed7fe012a`.
- Arquivos lidos diretamente: `src/catalog/channels.ts`, `src/catalog/tested.ts`, `src/catalog/provider.ts`, `src/catalog/types.ts`, `src/components/TVBrowser.tsx`, `src/player/Player.tsx`.

## Diferenças comprovadas
1. V24 contém **21** canais; `channels.ts` do Lovable tem **7** registros (6 homologados e 1 pendente); `tested.ts` mantém **15** fontes testadas fora do player. Há uma sobreposição nominal Bob Esponja e divergências de rótulos (iCarly / Nickelodeon iCarly, South Park / Comedy Central South Park).
2. `provider.ts` permite reproduzir apenas `CHANNELS`; `TESTED_AWAITING_RIGHTS` não entra no player.
3. `TVBrowser.tsx` renderiza `testedAwaitingRights()` como `locked: true` e abre modal de direitos, não um vídeo.
4. V24 usa player HTML5/HLS nativo do Safari ou hls.js; Lovable usa componente React `Player.tsx`, com suporte HLS nativo/hls.js, mas não foi validada equivalência visual e funcional no iPhone.
5. Cultura Fast: V24 classifica em TV; Lovable registra como `infantil`. Usuário aprovou mudar para `tv-aberta`.
6. Rótulo de navegação `TV` deve virar **TV Aberta**, mantendo identificador interno `tv`.

## Ações seguras pendentes
- Corrigir `Cultura Fast` para `tv-aberta` em `src/catalog/channels.ts`.
- Corrigir apenas o rótulo `TV` para `TV Aberta` em `TVBrowser.tsx`.
- Comparar um a um os 21 nomes, categorias, fontes, logotipos e estado do player; manter as fontes originais intactas e evitar duplicações.
- Separar **homologação técnica de vídeo/áudio** de **autorização de incorporação**. O teste pessoal no Safari não comprova direito de disponibilização em site/PWA. Não desbloquear automaticamente fontes com permissão não verificada.
- Testar em preview isolado antes de qualquer publicação de PWA.

## Bloqueio atual
O Lovable respondeu **workspace out of credits** na tentativa de edição. Nenhuma alteração foi feita no projeto Lovable por esta auditoria. Este relatório no GitHub não sincroniza automaticamente os arquivos React do Lovable.

## Preservação
Sem alterações em `main`, V24, V45, V46, V47, V48, produção, fontes ou dados do Lovable.
