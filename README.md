# Club Kids . Cluby Pride / Vita's House

Landing page de divulgação (one-page) da edição **Cluby Pride . Vita's House** da Club Kids Goiânia. Estética de cartaz de revista em preto e branco, grão pesado e a estrela vermelha como único acento de cor.

- **Quando:** sábado, 20 de junho de 2026, portas às 22h
- **Onde:** Vernissage Club, Praça do Cruzeiro, Setor Sul, Goiânia
- **Headliner:** Vita (turnê Vita's House)
- **Ingressos:** Shotgun (`shotgun.live/pt-br/events/clubypride`)
- **Stack:** HTML + Vite + CSS puro + JS vanilla (zero dependências em runtime)
- **Lighthouse:** Performance 97, Acessibilidade 100, Boas práticas 100, SEO 100

## Como rodar

```bash
cd site
npm install
npm run dev      # desenvolvimento, http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # conferência do build
```

## Deploy (GitHub Pages)

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`): todo push na branch `main` builda e publica no GitHub Pages.

- O site fica em `https://vittorccf.github.io/clubkids/`.
- O `vite.config.js` usa `base: '/clubkids/'` no build (subpasta do Pages) e `/` em desenvolvimento.
- As imagens são referenciadas por caminho relativo (`./img/...`), respeitando o `base`.

Para validar o build localmente como no Pages, sirva o `dist/` dentro de uma pasta `clubkids/`:

```bash
mkdir -p _ghtest/clubkids && cp -r dist/* _ghtest/clubkids/
cd _ghtest && python -m http.server 8901
# abra http://localhost:8901/clubkids/
```

## Identidade visual

**Conceito:** a casa da Vita em preto e branco. Cartaz de revista cult escaneado, grão pesado, alto contraste. A única cor que pulsa é a estrela vermelha do K.

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
Hero (com flyer oficial e contador) . Marquee . Manifesto . Vita (headliner) . Onde . Ingressos . Edições anteriores . Links . Rodapé.

## Conteúdo e fontes

Todos os dados foram confirmados na página oficial de ingressos da Shotgun (slug `clubypride`, produtor CLUBKIDS) e em matérias sobre a Vita. A bio da Vita vem de PapelPop, Blog Música Boa, FFW e Música Instantânea.

**Pontos a confirmar com a produção (não confirmados publicamente):**
- Classificação etária (a página do evento não informa idade mínima, então o site não exibe "18+").
- O termo "Javran" aparece no flyer; o papel não foi confirmado, então entra apenas como crédito no rodapé.
- Valores e lotes podem mudar na Shotgun.

## Reprocessar imagens

`build_assets.py` recorta a estrela, otimiza as fotos e o flyer, e gera a imagem OpenGraph em preto e branco a partir de `../references`. Requer Python e Pillow (`pip install pillow`).

## Imagens

- `img/flyer.jpg`: cartaz oficial da edição (usado no hero).
- `img/vita.jpg`: retrato editorial da Vita (seção headliner).
- `img/star-red.webp`: estrela do logo (acento).
- `img/01..09`: fotos de edições anteriores (galeria).
- `og.jpg`: imagem de compartilhamento 1200x630.
