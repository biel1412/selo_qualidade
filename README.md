# Selo de Qualidade

Gerador de certificados para os colaboradores que atingiram **100% de qualidade** no mês.
O site roda direto no **GitHub Pages**: é HTML, CSS e JavaScript, sem servidor, e tudo é processado no navegador.

## Funcionalidades

- **24 modelos de certificado**, em 8 estilos: Clássico, Luxo, Moderno, Faixa, Geométrico, Ondas, Minimalista e Listras.
- **Campos editáveis:** nome do inspetor, cargo, mensagem, título, subtítulo, empresa, setor e logotipo.
- **Assinatura:** digitada (4 estilos de letra), desenhada com o dedo ou o mouse, ou enviada como imagem.
- **12 mensagens padrão** prontas, e você pode salvar as suas.
  - As variáveis `{nome}`, `{mes}`, `{ano}`, `{empresa}`, `{setor}` e `{inspetor}` são preenchidas automaticamente.
- **Vários colaboradores de uma vez:** coloque um nome por linha e gere um PDF com uma página por pessoa.
- **Exportação** em PDF (A4 paisagem), PNG em alta resolução, ou impressão.
- As configurações ficam salvas no navegador.

## Como publicar no GitHub Pages

1. Abra o repositório no GitHub e vá em **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.
4. Em cerca de 1 minuto o site fica disponível em `https://biel1412.github.io/selo_qualidade/`.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Estrutura

```
index.html          página principal
css/style.css       estilos da interface e dos certificados
js/templates.js     os 24 modelos (cores, layouts, selo 100%)
js/app.js           formulário, assinatura, mensagens e exportação
js/vendor/          html2canvas e jsPDF (usados para gerar PNG/PDF)
```

### Como adicionar um novo modelo

Em `js/templates.js`, acrescente uma linha na lista `RAW` com um `id`, um nome, um dos layouts existentes e as cores.
