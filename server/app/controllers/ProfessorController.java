package controllers;

import static play.data.Form.form;
import interceptors.InstituicaoInterceptor;
import interceptors.ProfessorInterceptor;

import java.util.HashMap;
import java.util.List;

import models.Aluno;
import models.Instituicao;
import models.Professor;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import database.ProfessorDatabase;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import util.Constantes;
import util.Mail;
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
	@With({ ProfessorInterceptor.class })
	public static Result index(){
		Professor p = getUsuarioAutenticado();
		return ok(views.html.professor.index.render(p));
	}
	
	@Transactional
	public static Result login(){
		List<Instituicao> li = InstituicaoDatabase.selectInstituicao();
		return ok(views.html.professor.login.render(li));
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

			} else {
				Professor p = ProfessorDatabase.selectProfessor(email, cnpjInst);

				if (p == null || p.getStatus() == Constantes.STATUS_REMOVIDO) {
					flash("erro", "Usuário não cadastrado");
					
				}else if(p.getStatus() == Constantes.STATUS_AGUARDANDO){
					flash("erro", "Confirme seu email no link que te enviamos");
					
				} else if(!p.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, p.getEmail());
					session().put(Constantes.SESSION_CNPJINST, p.getCnpjInst());
					return redirect(routes.ProfessorController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/logar(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");

		}
		return redirect(routes.ProfessorController.login());
	}
	
	@Transactional
	public static Result ativar() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("i");
			String email = dynamicForm.get("e");
	
			Professor p = ProfessorDatabase.selectProfessorMD5(cnpj, email);
	
			if (p != null && p.getStatus() == Constantes.STATUS_AGUARDANDO) {
				p.setStatus(Constantes.STATUS_ATIVO);
				JPA.em().merge(p);

				session().clear();
				session().put(Constantes.SESSION_USUARIO, p.getEmail());
				session().put(Constantes.SESSION_CNPJINST, p.getCnpjInst());
				return redirect(routes.ProfessorController.index());
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/ativar(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao ativar a conta. Tente novamente mais tarde");
		}
		return redirect(routes.ProfessorController.index());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result configuracao() {
		Professor p = getUsuarioAutenticado();
		return ok(views.html.professor.configuracao.render(p));
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result editar() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			String senhaConfirme = dynamicForm.get("confirmpassword") == null || dynamicForm.get("confirmpassword").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("confirmpassword"));

			boolean isEditado = false;
			Professor p = getUsuarioAutenticado();
			if(p != null){
				
				if (nome == null || email == null) {				
					flash("erro", "Preencha todos os campos");
				}else if(senha != null && (senhaConfirme == null || !senha.equals(senhaConfirme))){
					flash("erro", "Senhas não conferem");
				}else{
					if(!p.getNome().equals(nome)){
						p.setNome(nome); 
						isEditado = true;
					}
					if(senha != null){
						p.setSenha(senha);
						isEditado = true;
					}
					if(!p.getEmail().equals(email)){
						Professor pe = ProfessorDatabase.selectProfessor(email, p.getCnpjInst());
						Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(p.getCnpjInst());
						if(pe == null){
							p.setEmail(email);
							Mail.sendMail(email, "Alteração de Email", views.html.professor.email.render(i, "","","", request().host(), 1).toString());
							p.setStatus(Constantes.STATUS_AGUARDANDO);
							flash("erro", "Confirme a alteração do seu email");
							session().clear();
							isEditado = true;
						}else{
							flash("erro", "Email já cadastrado");
							isEditado = false;
						}
					}
					
					if(isEditado){
						JPA.em().merge(p);
						flash("ok", nome+" Editado");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/editar(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.ProfessorController.configuracao());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result alunos(){
		try{
			Professor p = getUsuarioAutenticado();
			if(p != null){
				List<Aluno> al = AlunoDatabase.selectAlunoByProfessorId(p.getId());
				return ok(views.html.professor.alunos.render(al));
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/alunos(): "+ e.getMessage());
		}
		System.out.println("Entrou 2");
		return redirect(routes.ProfessorController.index());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result salas(){
		return ok(views.html.professor.salas.render());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result questoes(){
		return ok(views.html.professor.questoes.render());
	}
}
