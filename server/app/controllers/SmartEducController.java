package controllers;

import static play.data.Form.form;
import interceptors.UsuarioSmartInterceptor;
import database.SmartEducDatabase;
import models.UsuarioSmart;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import util.Constantes;
import util.Seguranca;
import views.html.index;
import views.html.smarteduc.*;

public class SmartEducController extends Controller{
	
	@Transactional
	public static String getUsuarioSession() {
		return session().get(Constantes.SESSION_USUARIO);
	}
	
	@Transactional
	public static boolean isAutentico() {
		if (getUsuarioSession() == null) {
			return false;
		} else {
			UsuarioSmart us = getUsuarioAutenticado();
			if (us == null) {
				return false;
			}
			return true;
		}
	}
	

	@Transactional
	public static UsuarioSmart getUsuarioAutenticado() {
		try{
			int id = Integer.parseInt(getUsuarioSession());
			if (id == -1) {
				return null;
			} else {
				return SmartEducDatabase.selectUsuarioSmart(id);
			}
		}catch(Exception e){
			return null;
		}
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result index(){
		return ok(index.render());
	}
	
	@Transactional
	public static Result login() {
		return ok(login.render());
	}
	
	@Transactional
	public static Result logar() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			
			if (email == null || senha == null) {
				flash("erro", "Preencha todos os campos");
				return redirect(routes.SmartEducController.login());

			} else {
				UsuarioSmart u = SmartEducDatabase.selectUsuarioSmart(email);

				if (u == null) {
					flash("erro", "Usuário não cadastrado");
					return redirect(routes.SmartEducController.login());
					
				} else if(!u.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					return redirect(routes.SmartEducController.login());
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, u.getId() +"");
					return redirect(routes.SmartEducController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - SmartEducController/login(): "+ e.getMessage());
		}
		flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		return redirect(routes.SmartEducController.login());
	}

}
