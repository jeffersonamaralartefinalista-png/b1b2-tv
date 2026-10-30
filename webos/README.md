# B1&B2 Tv — LG webOS (desenvolvimento)

Este diretório é um esqueleto de empacotamento para instalação de testes em LG webOS, **não é um IPK pronto**.

## Preparação

1. Confirmar modelo e versão do webOS da televisão.
2. Instalar o app oficial **Developer Mode** na LG, ativar o modo de desenvolvedor e habilitar o Key Server conforme o guia oficial da LG.
3. Instalar o **webOS CLI** compatível no computador de desenvolvimento.
4. Preparar uma pasta de pacote contendo `appinfo.json` na raiz, `index.html`, `app.js`, `tv-theme.css`, `catalog.json`, `manifest.webmanifest`, `sw.js` e os ícones PNG exigidos (`icon.png`, `largeIcon.png`).
5. Empacotar com `ares-package <pasta>` e instalar com `ares-install --device <nome-do-dispositivo> <arquivo.ipk>`.
6. Abrir com `ares-launch --device <nome-do-dispositivo> com.b1b2tv.familiar`.

## Atenção

- A publicação no GitHub Pages **não é necessária** para abrir o app empacotado; o HTML é local.
- As transmissões dependem de conexão e compatibilidade com o player do webOS; catálogo inicial é demonstrativo.
- O ícone atual do projeto é SVG: é preciso criar os arquivos PNG antes de gerar um IPK.
- A interface e as setas precisam ser validadas na LG real.
- Não distribuir canais sem autorização de incorporação.

Guia oficial LG: https://webostv.developer.lge.com/develop/getting-started/developer-mode-app
