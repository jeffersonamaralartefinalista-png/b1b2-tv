# Laboratório V45 — contrato de fontes

Versão isolada derivada da V44. V24/V44, main, Lovable e produção preservados.

## Uso

Servir esta pasta por HTTP e abrir `preview-integrado-v45-contrato-fontes.html`. O HTML contém o resolver; `resolver.js` é a origem testável do mesmo código. O teste verifica igualdade entre ambos.

O manifesto é relativo ao HTML e consultado com `cache:no-store`. Publicar ambos juntos na mesma pasta. A revisão é declarada em `revision`; nenhuma URL fixa de commit é usada pelo VOD.

## Contrato

`version:1`, `revision` não vazia e `entries` como objeto. Chave: `tvmaze:SHOW_ID:sTEMPORADA:eEPISODIO`. A entrada exige `tvmazeEpisodeId` numérico igual ao ID retornado pelo TVmaze. Fontes exigem `url` HTTPS sem credenciais, `label`, `format` (`mp4` ou `hls`) e `integrationAllowed:true`, declarado somente após verificação da autorização de integração. Essa flag não substitui a comprovação de uso.

Não há vídeos cadastrados. Nenhum vínculo por nome é inferido e nenhum endereço do Saimo foi importado. O manifesto V41 original permanece intacto; suas entradas por nome, vazias, não foram migradas sem identidade verificada.

MP4 e HLS nativo usam video; HLS em outros navegadores usa a biblioteca HLS.js já carregada no HTML. A troca destrói a instância anterior. Erros permitem trocar manualmente. Não implementa fallback automático nem importador.

Seleção de outro episódio, retorno, busca, troca de modo, escolha de canal e saída cancelam a sessão VOD. A integração original de filmes/iTunes continua sem reprodução e não foi ampliada nesta etapa.

## Validação

`node test-contract.cjs`: 12 verificações passaram, mais compilação dos scripts inline. Fixtures sintéticas em domínio `.invalid`, nunca apresentadas como vídeos. Verificação de contrato não equivale a reprodução homologada.

Pendente: teste visual no navegador, Safari físico, MP4/HLS autorizados, falha/troca entre fontes e disponibilidade do catálogo. Não considerar esta versão homologada para uso familiar antes desses testes.
