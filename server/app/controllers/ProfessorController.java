package controllers;

import static play.data.Form.form;
import interceptors.ProfessorInterceptor;

import java.util.HashMap;

import models.Professor;
import database.ProfessorDatabase;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import util.Constantes;
import util.Seguranca;

public class ProfessorController extends Controller{
	
	@Transactional
	public static HashMap<String, String> getUsuarioSession() {
		if(session().get(Constantes.SESSION_USUARIO) == null
		|| session().get(Constantes.SESSION_CNPJINST) == null){
			return null;
		}
		HashMap<String, String> map = new HashMap<String, String>();
		map.put(Constantes.SESSION_USUARIO, session().get(Constantes.SESSION_USUARIO));
		map.put(Constantes.SESSION_CNPJINST, session().get(Constantes.SESSION_CNPJINST));
		return map;
	}
	
	@Transactional
	public static boolean isAutentico() {
		if (getUsuarioSession() == null) {
			return false;
		} else {
			Professor p = getUsuarioAutenticado();
			if (p == null) {
				return false;
			}
			return true;
		}
	}
	
	@Transactional
	public static Professor getUsuarioAutenticado() {
		try{
			HashMap<String, String> session = getUsuarioSession();
			if (session == null) {
				return null;
			} else {
				return ProfessorDatabase.selectProfessor(session.get(Constantes.SESSION_USUARIO), session.get(Constantes.SESSION_CNPJINST));
			}
		}catch(Exception e){
			return null;
		}
	}
	
	@Transactional
	//@With({ ProfessorInterceptor.class })
	public static Result index(){
		return ok(views.html.professor.index.render());
	}
	
	public static Result login(){
		return ok(views.html.professor.login.render());
	}
	
	@Transactional
	public static Result logoff() {
		session().clear();
		return redirect(routes.ProfessorController.login());
	}
	
	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpjInst = dynamicForm.get("inst") == null || dynamicForm.get("inst").trim().isEmpty()? null : dynamicForm.get("inst").toLowerCase();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			
			if (cnpjInst == null || email == null || senha == null) {
				flash("erro", "Preencha todos os campos");
				return redirect(routes.ProfessorController.login());

			} else {
				Professor p = ProfessorDatabase.selectProfessor(email, cnpjInst);

				if (p == null || p.getStatus() == Constantes.STATUS_REMOVIDO) {
					flash("erro", "Usuário não cadastrado");
					return redirect(routes.ProfessorController.login());
					
				}else if(p.getStatus() == Constantes.STATUS_AGUARDANDO){
					flash("erro", "Confirme seu email no link que te enviamos");
					return redirect(routes.ProfessorController.login());
					
				} else if(!p.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					return redirect(routes.ProfessorController.login());
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, p.getEmail());
					session().put(Constantes.SESSION_CNPJINST, p.getCnpjInst());
					return redirect(routes.ProfessorController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/login(): "+ e.getMessage());
		}
		flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		return redirect(routes.ProfessorController.login());
	}
	
	@Transactional
	//@With({ ProfessorInterceptor.class })
	public static Result alunos(){
		return ok(views.html.professor.alunos.render());
	}
	
	@Transactional
	//@With({ ProfessorInterceptor.class })
	public static Result salas(){
		return ok(views.html.professor.salas.render());
	}
	
	@Transactional
	//@With({ ProfessorInterceptor.class })
	public static Result questoes(){
		return ok(views.html.professor.questoes.render());
	}
}
