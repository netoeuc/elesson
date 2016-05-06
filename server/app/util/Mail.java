package util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import play.Logger;

public class Mail {

	public static void sendMail(String para, String assunto, String texto) throws Exception{
		try {
			String mailhost = "smtp.gmail.com";					//smtp.gmail.com
			String port = "465";								//465
			final String user = Constantes.EMAIL_SMARTEDUC;		//email completo
			final String pass = Constantes.PASS_SMARTEDUC;		//email completo
					
			Properties props = new Properties();
			props.put("mail.smtp.host", mailhost);
			props.put("mail.smtp.socketFactory.port", port);
			props.put("mail.smtp.socketFactory.class",
					"javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.port", port);
	 
			Logger.info("Enviando email para " + para);
			
			Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(user,pass);
					}
				});
		
			MimeMessage message = new MimeMessage(session);
			
			message.setFrom(new InternetAddress(user, "Smart Educ"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(para));
			
			message.setSubject(assunto);
						
			String encodingOptions = "text/html; charset=UTF-8";
			message.setHeader("Content-Type", encodingOptions);
			message.setContent(texto, encodingOptions);
 
			Transport.send(message);
 
		} catch (Exception e) {
			// SE DER ERRO NO ENVIO CHECAR SE A PERMISSAO ESTA ATIVADA 
			//https://www.google.com/settings/security/lesssecureapps
			Logger.info("ERRO ao enviar email para: "+para);
			throw e;
		}
		Logger.info(" - enviado");
	}
}
