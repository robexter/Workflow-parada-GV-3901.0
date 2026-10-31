# GV-3901 — Turnaround Control | Protótipo navegável V0.3

**REFERÊNCIA FUNCIONAL CONGELADA: V1.2 • 30/10/2026**  
**STATUS: DEMONSTRAÇÃO COM OCORRÊNCIAS SINTÉTICAS E DOIS NOMES DE OPERADORES FORNECIDOS PELO SOLICITANTE**  
**NÃO UTILIZAR EM OPERAÇÕES, LIBERAÇÕES, MANUTENÇÃO OU DECISÕES DE SEGURANÇA.**

Este pacote apresenta a primeira implementação navegável para avaliação de UX e regras de interação, **sem conexão com sistemas industriais, dados operacionais reais, banco de dados ou servidor de aplicação**.

## Abrir no computador

1. Extraia o arquivo ZIP para uma pasta.
2. Na pasta extraída, execute um servidor HTTP estático (por exemplo, `python -m http.server 8000`).
3. Acesse `http://localhost:8000/index.html` no navegador. Você também pode testar visualmente ao abrir `index.html` diretamente, mas **a instalação e o Service Worker da PWA não funcionam via `file://`**.
4. Em HTTPS ou `localhost`, o botão **Instalar app** aparece no cabeçalho; em navegadores compatíveis ele abre a confirmação de instalação do protótipo, conforme seu suporte a PWA.

Para uma inspeção rápida, há também uma versão HTML independente no arquivo entregue separadamente `GV3901_Protótipo_Visual_DEMO.html`. Essa versão única é navegável, mas não funciona como PWA instalável.

## Instalar como aplicativo — GV-3901 parada

- **Nome exibido na tela inicial e na instalação:** `GV-3901 parada` (manifesto `name` e `short_name` + título de iPhone/iPad).
- **Android (Chrome) e computador (Chrome/Edge):** na versão publicada em **HTTPS** pelo GitHub Pages, clique no botão verde **Instalar app** no topo. Se o navegador oferecer `beforeinstallprompt`, a instalação será solicitada. Caso contrário, o botão exibirá instruções para instalar usando o menu do navegador.
- **iPhone/iPad (Safari):** toque em **Instalar** para ver o guia, depois use **Compartilhar → Adicionar à Tela de Início**.
- **Arquivo aberto por `file://` / HTML independente:** pode ser utilizado para visualizar o design, mas **não é instalável**. Use a PWA completa publicada em HTTPS.
- **Já instalado sob outro nome?** O navegador pode manter o nome anterior em cache; feche, atualize, e se necessário desinstale somente a DEMO antiga e instale novamente. Se tiver registros fictícios que queira preservar, exporte o JSON antes; a reinstalação pode limpar seus dados locais.
- **Atualização:** cache do Service Worker incrementado de `gv3901-demo-v0-1-0` para `gv3901-demo-v0-3-0`. Não altera a referência funcional V1.2 congelada.

### Publicação no GitHub Pages

1. Extraia o ZIP atualizado e envie **o conteúdo da pasta**, não a pasta externa, para a **raiz** do repositório (com `index.html`, `manifest.webmanifest`, `sw.js`, `assets/` juntos).
2. Em **Settings → Pages**, selecione branch `main` e pasta `/(root)`.
3. Acesse o endereço `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`, recarregue a página e clique em **Instalar app**.
4. Não disponibilize conteúdos reais da refinaria em hospedagem pública.

## O que já funciona nesta demonstração

| Seção | Experiência implementada |
|---|---|
| Visão geral | Indicadores, curva, atividades e atalhos com conteúdo fictício |
| Diário | Novo relato, alteração com histórico local, pesquisa e filtro |
| Operações / turnos | Marcos ilustrativos e geração de rascunho editável de passagem |
| Planejamento | Gantt e dependências de exemplo, com baseline B0 DEMO |
| Evolução | Curva S sintética, medição cumulativa editável e 3 cenários ilustrativos |
| SH2 / fornalha | Navegação por 6 fileiras × 32 posições, com status locais de teste |
| Pendências | Cadastro, prioridade, responsável, prazo e conclusão/reabertura |
| Evidências | Cartões demonstrativos sem anexos reais |
| Relatórios | Prévia sintética, imprimir/Salvar como PDF no navegador e exportar HTML |
| Administração | Visão das limitações, trilha local de edições, backup JSON e reinicialização |

Alterações locais podem persistir no navegador por meio de `localStorage`, que **não é armazenamento seguro nem auditável**. Isso foi implementado exclusivamente para exercitar o protótipo; não inserir dados reais ou confidenciais.

## O que NÃO está implementado

- Integração com banco de dados, login, perfis, autenticação ou autorizações.
- Auditoria corporativa ou trilha imutável no servidor.
- Sincronização offline/multidispositivo, resolução de conflitos e cópias de segurança centralizadas.
- Importação do cronograma executivo real e baseline homologada.
- Cálculo certificado de caminho crítico, produtividade, folgas e datas de conclusão.
- Upload de evidências reais, assinaturas, PT/PTT ou liberações.
- Validação de normas/procedimentos industriais ou aprovação para uso em unidade operacional.

A **Curva S e a projeção exibidas são ilustrações matemáticas com dados inventados**. São suficientes para avaliar UX e o comportamento de atualização, mas não equivalem ao motor analítico homologado previsto na especificação V1.2.

## Estrutura do pacote

- `index.html` — interface PWA
- `assets/styles.css` — design responsivo
- `assets/app.js` — JavaScript executável (compilado a partir de TypeScript)
- `src/app.ts` — código-fonte de protótipo, editável
- `manifest.webmanifest`, `sw.js`, `assets/icon-*.png` — recursos PWA
- `tsconfig.json` — configuração de compilação TypeScript
- `tests/smoke.cjs` — testes de renderização lógica sem servidor

A camada de interface deste protótipo foi escrita em **TypeScript sem bibliotecas externas**, para permitir uma entrega executável offline sem instalação de pacotes. **Isso não revoga a arquitetura funcional V1.2 congelada**: a aplicação de produção poderá seguir React + TypeScript com backend/API e banco autorizados, como definido na especificação.

## Atualizar após modificações no código TypeScript

Caso tenha o TypeScript instalado, execute `tsc -p tsconfig.json` no diretório para regenerar `assets/app.js`. Ao publicar nova versão, altere o nome do cache em `sw.js`, para garantir atualização dos recursos. Não coloque esta PWA em hospedagem pública contendo dados reais. GitHub Pages pode ser usado apenas para publicar esta demonstração sintética, mediante sua decisão.

## Tratamento da especificação congelada

A **V1.2 foi preservada separadamente**, em arquivo imutável de referência (DOCX e Markdown originais, com manifesto SHA-256). Este protótipo tem numeração **V0.1-DEMO**, distinta da especificação funcional e incapaz de alterá-la automaticamente.

## Critérios de teste que devem ser executados na homologação futura

1. Sequência completa de registros e passagem de turno.
2. Medição acumulada válida, correção e impedimento de duplicidade.
3. Separação de junta soldada, inspecionada e aceita.
4. Curva S original, revisada, realizada e projeção com dados completos.
5. Revisão de baseline com preservação do plano anterior.
6. Sincronização, recuperação, perfis, auditoria e exportações sob infraestrutura autorizada.
7. Responsividade e acessibilidade nas telas corporativas utilizadas.

Atualização de instalação: 30/10/2026 — V0.3-DEMO.

## V0.3 — Operadores e responsabilidade por relatório

- Operadores selecionáveis: **Robson Almeida** e **Pedro Dantas** (nomes informados pelo solicitante). A escala de revezamento não é presumida.
- **Operações / turnos → Selecionar operador:** define o operador de entrada para novos registros, sem autenticação.
- **Diário → Novo registro:** escolha obrigatória do operador, turno e data operacional; exibição do responsável no histórico e manutenção do valor anterior em correções.
- **Relatórios:** selecione data e período (diurno, noturno, especial ou dia completo), depois **Definir responsável** para identificar o elaborador daquele relatório. A atribuição é armazenada apenas neste navegador.
- **Passagem de turno:** seletores separados para operador que entrega e operador que recebe, incluindo esses nomes no texto copiado. Não é confirmação oficial de recebimento.
- A prévia e a exportação HTML dos relatórios exibem responsável por data/turno e a autoria das ocorrências.
- O backup JSON inclui essas seleções. A especificação V1.2 congelada permanece inalterada.
- Registros já existentes na DEMO com **Operador DEMO** continuam como registros de exemplo e não são atribuídos retrospectivamente a nenhuma pessoa real.
- **ATENÇÃO:** ao publicar em GitHub Pages público, os dois nomes são exibidos na interface a qualquer visitante. Não insira eventos reais nem dados sensíveis.
