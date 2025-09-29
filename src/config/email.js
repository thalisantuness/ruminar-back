require('dotenv').config();

const nodemailer = require('nodemailer');

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar e-mail de boas-vindas
async function enviarEmailBoasVindas(destinatario, nomeUsuario) {
  try {
    const mailOptions = {
      from: {
        name: 'Ruminar Leite',
        address: process.env.EMAIL_USER
      },
      to: destinatario,
      subject: 'Bem-vindo ao Ruminar Leite! 🐄',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .content h2 {
              color: #4CAF50;
              margin-top: 0;
            }
            .feature-list {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .feature-item {
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .feature-item:last-child {
              border-bottom: none;
            }
            .feature-icon {
              color: #4CAF50;
              font-weight: bold;
              margin-right: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐄 Bem-vindo ao Ruminar Leite!</h1>
          </div>
          
          <div class="content">
            <h2>Olá, ${nomeUsuario}!</h2>
            
            <p>É com grande satisfação que damos as boas-vindas ao <strong>Ruminar Leite</strong>, seu novo aliado na gestão nutricional do rebanho leiteiro!</p>
            
            <p>Você agora tem acesso a uma ferramenta completa para:</p>
            
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon">📚</span>
                <strong>Gerenciar sua livraria de alimentos</strong> - Cadastre e organize todos os alimentos disponíveis
              </div>
              <div class="feature-item">
                <span class="feature-icon">🥛</span>
                <strong>Criar dietas personalizadas</strong> - Formule dietas base e específicas para sua propriedade
              </div>
              <div class="feature-item">
                <span class="feature-icon">💰</span>
                <strong>Calcular custos</strong> - Saiba exatamente quanto cada dieta vai custar
              </div>
              <div class="feature-item">
                <span class="feature-icon">💧</span>
                <strong>Hidratar dietas</strong> - Calcule a quantidade ideal de água necessária
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎓</span>
                <strong>Aprender com tutoriais</strong> - Acesse vídeos explicativos sobre nutrição e uso do app
              </div>
            </div>

            <p><strong>Dicas para começar:</strong></p>
            <ol>
              <li>Assista aos vídeos tutoriais disponíveis no app</li>
              <li>Cadastre os alimentos da sua propriedade na Livraria</li>
              <li>Comece criando uma dieta base</li>
              <li>Personalize para as necessidades do seu rebanho</li>
            </ol>

            <p style="margin-top: 30px;">
              <strong>Importante:</strong> O resultado produtivo é baseado no manejo nutricional como um todo. 
              Utilize o aplicativo como ferramenta de apoio na tomada de decisões.
            </p>

            <div style="text-align: center;">
              <p style="font-size: 18px; color: #4CAF50; font-weight: bold; margin-top: 30px;">
                Bons resultados! 🚀
              </p>
            </div>
          </div>

          <div class="footer">
            <p>Este é um e-mail automático. Por favor, não responda.</p>
            <p><strong>Ruminar Leite</strong> - Gestão Nutricional Inteligente</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Bem-vindo ao Ruminar Leite!

        Olá, ${nomeUsuario}!

        É com grande satisfação que damos as boas-vindas ao Ruminar Leite, seu novo aliado na gestão nutricional do rebanho leiteiro!

        Você agora tem acesso a uma ferramenta completa para:
        
        - Gerenciar sua livraria de alimentos
        - Criar dietas personalizadas
        - Calcular custos
        - Hidratar dietas
        - Aprender com tutoriais

        Dicas para começar:
        1. Assista aos vídeos tutoriais disponíveis no app
        2. Cadastre os alimentos da sua propriedade na Livraria
        3. Comece criando uma dieta base
        4. Personalize para as necessidades do seu rebanho

        Bons resultados!

        Ruminar Leite - Gestão Nutricional Inteligente
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail de boas-vindas enviado com sucesso:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar e-mail de boas-vindas:', error);
    return { success: false, error: error.message };
  }
}

// Verificar se a configuração de e-mail está correta
async function verificarConfiguracaoEmail() {
  try {
    await transporter.verify();
    console.log('✅ Servidor de e-mail está pronto para enviar mensagens');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração do servidor de e-mail:', error);
    return false;
  }
}

module.exports = {
  enviarEmailBoasVindas,
  verificarConfiguracaoEmail,
  transporter
};
