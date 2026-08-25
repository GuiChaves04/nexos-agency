# Nexos Digital Intelligence

Site desenvolvido em **Next.js** com **Tailwind CSS**.

## Como Rodar o Site Localmente
1. Você precisará instalar o [Node.js](https://nodejs.org/) na sua máquina.
2. Após instalar, abra o terminal nesta pasta (`nexos-agency`) e rode:
   ```bash
   npm install
   npm run dev
   ```
3. O site estará disponível em `http://localhost:3000`.

## Como Publicar de Graça na Vercel
1. Crie uma conta no [GitHub](https://github.com/) e suba esta pasta como um novo repositório.
2. Acesse a [Vercel](https://vercel.com/), crie uma conta gratuita e clique em "Add New Project".
3. Importe o repositório do GitHub. A Vercel vai compilar e colocar o site no ar (com HTTPS e domínio gratuito).

## Configuração do Make.com (Motor de IA e WhatsApp)

Para que o formulário funcione de forma 100% gratuita na nuvem e envie a mensagem no seu WhatsApp:
1. Crie uma conta gratuita em [Make.com](https://www.make.com/).
2. Crie um novo **Cenário** e adicione o módulo **Webhooks -> Custom Webhook**.
3. Copie a URL gerada pelo Make.
4. No arquivo `src/app/page.tsx` do site, procure por `const webhookUrl = "..."` (linha 39) e substitua pela sua URL do Make.
5. A lógica de automação será dividida em dois cenários simples:
   - **Cenário 1 (Recepção)**: Webhook recebe os dados -> Consulta o Google Calendar -> Dispara mensagem de WhatsApp (API Oficial) para o seu número perguntando se aprova.
   - **Cenário 2 (Aprovação)**: Recebe a sua resposta via WhatsApp -> Reserva o evento no Google Calendar -> Dispara a mensagem VIP de confirmação para o cliente.
