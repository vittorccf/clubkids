# Club Kids . Cluby Pride / Vita's House

Landing page de divulgação (one-page) da edição **Cluby Pride + Vita's House** da Club Kids Goiânia. Estética de cartaz de revista em preto e branco, grão pesado e a estrela vermelha como único acento de cor.

- **Quando:** sexta-feira, 3 de julho de 2026, das 22h às 06h
- **Onde:** Vernissage Club, Praça do Cruzeiro, 121, Setor Sul, Goiânia GO
- **Atração principal:** Vita (turnê Vita's House) . **Headliner:** Rafael Rosa
- **Classificação:** 18+
- **Ingressos:** Shotgun (`shotgun.live/events/clubypride`)
- **Stack:** HTML + Vite + CSS puro + JS vanilla (zero dependências em runtime)

## Como rodar

```bash
cd site
npm install
npm run dev      # desenvolvimento, http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # conferência do build
```

## Estrutura do projeto

```
site/
├─ index.html              # marcação da one-page (fonte de verdade do conteúdo e dos links)
├─ vite.config.js          # configuração do build (base, outDir)
├─ public/                 # arquivos servidos como estão (não passam pelo bundler)
│  ├─ img/                 # flyer, retrato da Vita, estrela, Jim Beam, galeria
│  ├─ og.jpg               # imagem de compartilhamento 1200x630
│  ├─ favicon.png · apple-touch-icon.png
│  ├─ CNAME                # domínio custom do GitHub Pages
│  ├─ robots.txt · sitemap.xml
├─ src/
│  ├─ main.js              # entrypoint: importa estilos e orquestra as interações
│  ├─ config.js            # fonte única dos valores que o JS consome (data, parâmetros)
│  ├─ modules/             # uma responsabilidade por arquivo
│  │  ├─ countdown.js      # contador regressivo até a abertura dos portões
│  │  ├─ scroll-reveal.js  # animação de entrada ao rolar (IntersectionObserver)
│  │  └─ sticky-nav.js     # fundo da nav ao rolar
│  └─ styles/              # CSS em camadas (Vite concatena no build)
│     ├─ index.css         # orquestra os imports na ordem da cascata
│     ├─ tokens.css        # design tokens (cores, fontes, escala)
│     ├─ base.css          # reset, elementos globais, acessibilidade, textura
│     ├─ utilities.css     # classes reaproveitáveis (botões, reveal, cabeçalhos)
│     └─ sections.css      # estilos de cada bloco da página
└─ tools/
   └─ build_assets.py      # geração/otimização dos assets (dev only, requer Pillow)
```

### Decisões de arquitetura

- **JS vanilla em módulos de responsabilidade única.** Cada interação vive em um
  arquivo de `src/modules/`, com JSDoc. O `main.js` apenas amarra as peças. Não há
  framework porque uma landing estática não justifica o custo: zero dependências em
  runtime mantém o site leve e simples de manter.
- **HTML é a fonte de verdade dos links.** As URLs (ingressos, Instagram, Maps,
  Linktree) ficam direto nos `href`. Assim funcionam sem JS e são indexáveis
  (progressive enhancement). O JS cuida só de comportamento, nunca reescreve links.
- **CSS em camadas + design tokens.** Toda cor/fonte/espaçamento nasce de variáveis
  em `tokens.css`. Trocar a identidade visual = mexer só nos tokens.
- **Acessibilidade e movimento.** Skip-link, foco visível, `prefers-reduced-motion`
  respeitado (animações desligadas e reveal imediato).

## Deploy (GitHub Pages)

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`): todo push
na branch `main` builda e publica no GitHub Pages.

- O site é servido no domínio próprio **festaclubkids.com.br** (`public/CNAME`), por
  isso `vite.config.js` usa `base: '/'`.
- Para o domínio resolver, os registros DNS precisam apontar para os IPs do GitHub
  Pages (`185.199.108–111.153`) no painel do registrador.

## Identidade visual

**Conceito:** a casa da Vita em preto e branco. Cartaz de revista cult escaneado,
grão pesado, alto contraste. A única cor que pulsa é a estrela vermelha do logo.

| Token | HEX | Uso |
|-------|-----|-----|
| `--bg` / `--bg-2` | `#0B0B0B` / `#161616` | superfícies |
| `--ink` / `--muted` | `#F4F2EC` / `#9A968C` | texto |
| `--red` | `#E8193F` | estrela e detalhes gráficos (acento único) |
| `--red-text` | `#FF3355` | vermelho para texto pequeno (contraste AA) |

- **Display/cartaz:** Playfair Display
- **Texto/UI:** Inter
- **Fotos:** sempre em grayscale, com grão e vinheta globais.

### Seções
Hero (flyer + contador) . Marquee . Manifesto . Vita + line-up . Onde . Ingressos .
Edições anteriores . Links . Patrocínio (Jim Beam) . Rodapé.

## Conteúdo e fontes

Os dados do evento (line-up, local, classificação, manifesto, bio da Vita) vêm do
briefing oficial preenchido pela produção (Coletivo Clubkids e La Princess Mila) e
da página de ingressos na Shotgun. Nada sobre a Club Kids/Vita é inventado.

## Rastreamento

Meta Pixel instalado no `<head>` do `index.html` (evento `PageView` automático), com
fallback `<noscript>` no início do `<body>`.

## Reprocessar imagens

`tools/build_assets.py` recorta a estrela, otimiza fotos e flyer, e gera a imagem
OpenGraph e os favicons em preto e branco a partir de `../references`. Requer Python
e Pillow (`pip install pillow`). Rode a partir da raiz do projeto:

```bash
python tools/build_assets.py
```
