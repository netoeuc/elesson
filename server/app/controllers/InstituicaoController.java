package controllers;

import static play.data.Form.form;
import models.Instituicao;
import database.InstituicaoDatabase;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import util.Constantes;
import util.Seguranca;

public class InstituicaoController extends Controller{
	
	@Transactional
	public static String getUsuarioSession() {
		return session().get(Constantes.SESSION_USUARIO);
	}
	
	@Transactional
	public static boolean isAutentico() {
		if (getUsuarioSession() == null) {
			return false;
		} else {
			Instituicao i = getUsuarioAutenticado();
			if (i == null) {
				return false;
			}
			return true;
		}
	}
	
	@Transactional
	public static Instituicao getUsuarioAutenticado() {
		try{
			String cnpj = getUsuarioSession();
			if (cnpj == null) {
				return null;
			} else {
				return InstituicaoDatabase.selectInstituicaoByCnpj(cnpj);
			}
		}catch(Exception e){
			return null;
		}
	}
	
	@Transactional
	//@With({ InstituicaoInterceptor.class })
	public static Result index(){
		return ok(views.html.instituicao.index.render());
	}
	
	@Transactional
	public static Result login(){
		return ok(views.html.instituicao.login.render());
	}
	
	@Transactional
	public static Result logoff() {
		session().clear();
		return redirect(routes.InstituicaoController.login());
	}
	
	@Transactional
	public static Result configuracao() {
		// TODO pegar informacoes da instituicao no banco
		return ok(views.html.instituicao.configuracao.render());
	}
	
	@Transactional
	public static Result professores() {
		try{
			String cnpj = getUsuarioSession();
			if(cnpj != null){
				// TODO pegar lista de professores de acordo com o cnpj no banco e passar como parametro pra pagina
				return ok(views.html.instituicao.professores.render());
			}
			return ok(views.html.instituicao.professores.render());
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/professores(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	public static Result alunos() {
		try{
			String cnpj = getUsuarioSession();
			if(cnpj != null){
				// TODO pegar lista de alunos de acordo com o cnpj no banco e passar como parametro pra pagina
				return ok(views.html.instituicao.alunos.render());
			}
			return ok(views.html.instituicao.alunos.render());
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/alunos(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			
			if (email == null || senha == null) {
				flash("erro", "Preencha todos os campos");
				return redirect(routes.InstituicaoController.login());

			} else {
				Instituicao i = InstituicaoDatabase.selectInstituicaoByEmail(email);

				if (i == null || i.getStatus() == Constantes.STATUS_REMOVIDO) {
					flash("erro", "Usuário não cadastrado");
					return redirect(routes.InstituicaoController.login());
					
				}else if(i.getStatus() == Constantes.STATUS_AGUARDANDO){
					flash("erro", "Confirme seu email no link que te enviamos");
					return redirect(routes.InstituicaoController.login());
					
				} else if(!i.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					return redirect(routes.InstituicaoController.login());
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, i.getCnpj());
					return redirect(routes.InstituicaoController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/login(): "+ e.getMessage());
		}
		flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		return redirect(routes.InstituicaoController.login());
	}
}
