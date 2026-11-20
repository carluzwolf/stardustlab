# Starlyn Infinite - Site do Karlu

Site estático (HTML + CSS + JS puro). Sem build, sem dependências.

## Subir no GitHub + Vercel
1. Coloque todo o conteúdo desta pasta na RAIZ do repositório (index.html fica na raiz).
2. No Vercel: "Add New Project" > escolha o repositório > Framework Preset: **Other** > Deploy.

## O que editar
- `js/products.js`: preços, textos dos 3 modelos, links de compra (`buyUrl`), Instagram, e-mail e WhatsApp.
- Textos provisórios: `index.html` (seção Starlyn Infinite), `sobre.html` e `karlu.html`.
- Cores: variáveis no topo de `css/style.css` (`--pink`).

## Páginas
- `index.html` Início | `sobre.html` Starlyn Infinite | `karlu.html` Projeto Karlu | `produto.html?v=v1|v2|v3` anúncio | `galeria.html` Galeria (20 imagens em `assets/galeria/`).

## Galeria e Google Imagens
- As imagens ficam escritas direto no HTML (`<img>` com `alt`, `title`, `width`/`height`), sem JavaScript, para o Google conseguir ler.
- `galeria.html` tem dados estruturados (ImageGallery/ImageObject) e o `sitemap.xml` lista as imagens de cada página.
- Para trocar ou acrescentar imagens: coloque o arquivo `.webp` em `assets/galeria/`, crie um `<figure class="gi">` em `galeria.html` e inclua a imagem no `sitemap.xml`.
