# Hello World - Next.js (EasyPanel / Hostinger)

Projeto Next.js mínimo para rodar no **EasyPanel** na Hostinger.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy no EasyPanel (Hostinger)

1. **Crie um projeto** no EasyPanel e adicione um serviço do tipo **App**.

2. **Conecte o repositório**  
   Configure a origem (Git/GitHub) com o repositório deste projeto.

3. **Método de build**  
   Na aba **Build**:
   - **Dockerfile**: escolha "Dockerfile" e use o caminho `Dockerfile` (raiz do repositório).
   - **Nixpacks**: também funciona; o EasyPanel detecta Node.js e faz o build automaticamente.

4. **Porta**  
   O app expõe a porta **3000**. No EasyPanel, use essa porta no serviço.

5. **Deploy**  
   Clique em **Deploy**. O app ficará disponível na URL pública gerada pelo EasyPanel.

### Variáveis de ambiente (opcional)

Na aba **Environment** do serviço você pode definir, por exemplo:

- `NODE_ENV=production` (já definido no Dockerfile)

## Estrutura

- `app/` – App Router (Next.js 14)
- `next.config.js` – `output: 'standalone'` para imagem Docker enxuta
- `Dockerfile` – build multi-stage para produção

## Requisitos

- Node.js 18+
- Para EasyPanel: servidor com pelo menos 2 GB RAM (recomendação da documentação)
