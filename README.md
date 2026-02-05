# Hello World - Next.js (EasyPanel / Hostinger)

Projeto Next.js mínimo para rodar no **EasyPanel** na Hostinger.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy no EasyPanel (Hostinger) — inclusive modo caixa/box

Funciona no EasyPanel instalado no VPS da Hostinger (template “caixa”/box com EasyPanel pré-instalado).

### Passo a passo

1. **Crie um projeto** no EasyPanel e adicione um serviço do tipo **App** (não use template de outro app; use “App” e seu próprio código).

2. **Source**  
   Conecte o repositório Git/GitHub deste projeto.

3. **Build**  
   Na aba **Build**, escolha **Dockerfile** e deixe o caminho como `Dockerfile` (raiz do repositório). Depois clique em **Deploy** e espere o build terminar.

4. **Domains & Proxy (obrigatório para o domínio funcionar)**  
   - Abra a aba **Domains & Proxy** do serviço.
   - Adicione um domínio (ex.: o que o EasyPanel sugere, tipo `n8n-fila-teste10.cr61qk.easypanel.host`, ou o seu próprio).
   - **Defina a porta do proxy como `3000`.**  
     Essa é a porta em que o Next.js escuta dentro do container. Se a porta do proxy não for **3000**, o EasyPanel não encaminha o tráfego para o app e o domínio fica em branco ou com erro.

5. Salve e aguarde o deploy. Acesse o domínio (HTTPS) que você configurou.

### Se ainda não rodar

- **Logs**: na aba **Logs** do serviço, veja se o container sobe sem erro e se aparece algo como “Ready on http://0.0.0.0:3000”.
- **Porta do proxy**: confirme de novo em **Domains & Proxy** que está **3000**.
- **Reinício**: altere algo (ex.: uma variável de ambiente), salve e dê **Deploy** de novo.

### Variáveis de ambiente (opcional)

Na aba **Environment** pode definir, por exemplo:

- `NODE_ENV=production` (já definido no Dockerfile)

## Estrutura

- `app/` – App Router (Next.js 14)
- `next.config.js` – `output: 'standalone'` para imagem Docker enxuta
- `Dockerfile` – build multi-stage para produção

## Requisitos

- Node.js 18+
- Para EasyPanel: servidor com pelo menos 2 GB RAM (recomendação da documentação)
