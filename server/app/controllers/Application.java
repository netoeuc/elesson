package controllers;

import static play.data.Form.form;
import play.Logger;
import play.data.DynamicForm;
import play.mvc.*;
import util.Constantes;
import util.Mail;

public class Application extends Controller {
	  
    public static Result index() {
        return ok(views.html.index.render());
    }
    
    public static Result enviarEmail() {
    	try{
    		DynamicForm dynamicForm = form().bindFromRequest();
			String name = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String phone = dynamicForm.get("phone") == null || dynamicForm.get("phone").trim().isEmpty()? null : dynamicForm.get("phone");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email");
			String message = dynamicForm.get("message") == null || dynamicForm.get("message").trim().isEmpty()? null : dynamicForm.get("message");
			
			if(name == null || email == null || message  == null){
				flash("erro", "Preencha todos os campos.");
			}else{
				Mail.sendMail(Constantes.EMAIL_SMARTEDUC, "Contato Smart Educ", views.html.email.render(name, phone, email, message).toString());
				flash("ok", "Mensagem enviada.");
			}
    	}catch(Exception e){
			Logger.error("ERRO - Application/enviarEmail(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao enviar o email. Tente novamente mais tarde.");
		}
    	
        return redirect(routes.Application.index());
    }
  
}
