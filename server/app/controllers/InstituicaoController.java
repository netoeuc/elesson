package controllers;

import static play.data.Form.form;

import java.util.List;

import models.Aluno;
import models.Instituicao;
import models.Professor;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import database.ProfessorDatabase;
import interceptors.InstituicaoInterceptor;
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
	@With({ InstituicaoInterceptor.class })
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
	@With({ InstituicaoInterceptor.class })
	public static Result configuracao() {
		// TODO pegar informacoes da instituicao no banco
		return ok(views.html.instituicao.configuracao.render());
	}
	
	@Transactional
	public static Result ativar() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("i");
			String email = dynamicForm.get("e");
	
			Instituicao i = InstituicaoDatabase.selectInstituicaoMD5(cnpj, email);
	
			if (i != null && i.getStatus() == Constantes.STATUS_AGUARDANDO) {
				i.setStatus(Constantes.STATUS_ATIVO);
				JPA.em().merge(i);

				session().clear();
				session().put(Constantes.SESSION_USUARIO, i.getEmail());
				session().put(Constantes.SESSION_CNPJINST, i.getCnpj());
				return redirect(routes.InstituicaoController.index());
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/ativar(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao ativar a conta. Tente novamente mais tarde");
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result professores() {
		try{
			String cnpj = getUsuarioSession();
			if(cnpj != null){
				List<Professor> po = ProfessorDatabase.selectProfessorByCnpjInst(cnpj);
				return ok(views.html.instituicao.professores.render(po));
			}
			//return ok(views.html.instituicao.professores.render());
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/professores(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result alunos() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			boolean isSingle = dynamicForm.get("is") == null || dynamicForm.get("is").trim().isEmpty()? true : Boolean.parseBoolean(dynamicForm.get("is"));
			
			String cnpj = getUsuarioSession();
			if(cnpj != null){
				// pegar lista de alunos de acordo com o cnpj no banco e passar como parametro pra pagina
				List<Aluno> al = AlunoDatabase.selectAlunoByCnpjInst(cnpj);
				List<Professor> po = ProfessorDatabase.selectProfessorByCnpjInst(cnpj);
				return ok(views.html.instituicao.alunos.render(isSingle,al,po));
			}
			//return ok(views.html.instituicao.alunos.render(isSingle));
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/alunos(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.index());
	}
		
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result cadastrarProfessor(){
		try{
			Instituicao i = InstituicaoController.getUsuarioAutenticado();
			if(i != null){
				DynamicForm dynamicForm = form().bindFromRequest();
				String nome = dynamicForm.get("nome") == null || dynamicForm.get("nome").trim().isEmpty()? null : dynamicForm.get("nome");
				String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email");
				
				if(nome == null || email == null){
					flash("erro", "Preencha todos os campos");
				}else{
					Professor p = ProfessorDatabase.selectProfessor(email, i.getCnpj());
					if(p != null){
						flash("erro", "Este email já está cadastrado");
					}else{
						String senha = Seguranca.gerarSenha(6);
						Professor novoP = new Professor(i.getCnpj(), nome, email, Seguranca.md5(senha), Constantes.STATUS_AGUARDANDO);
						Mail.sendMail(email, "Bem-vindo, "+nome+"!", 
								views.html.professor.email.render(i, nome, email, senha, request().host(), 0).toString());
						
						JPA.em().persist(novoP);
					}
				}
			}else{
				return redirect(routes.InstituicaoController.login());
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/cadastrarProfessor(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.professores());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result cadastrarAluno(){
		try{
			Instituicao i = InstituicaoController.getUsuarioAutenticado();
			if(i != null){
				DynamicForm dynamicForm = form().bindFromRequest();
				String nome = dynamicForm.get("nome") == null || dynamicForm.get("nome").trim().isEmpty()? null : dynamicForm.get("nome");
				String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email");
				int idProfessor = dynamicForm.get("teacher") == null? -1 : Integer.parseInt(dynamicForm.get("teacher"));
				
				if(nome == null || email == null || idProfessor == -1){
					flash("erro", "Preencha todos os campos");
				}else{
					Aluno a = AlunoDatabase.selectAluno(email, i.getCnpj());
					if(a != null){
						flash("erro", "Este email já está cadastrado");
					}else{
					String senha = Seguranca.gerarSenha(6);
					Aluno novoA = new Aluno(i.getCnpj(), idProfessor, email, nome, Seguranca.md5(senha), Constantes.STATUS_AGUARDANDO);
					Mail.sendMail(email, "Bem-vindo, "+nome+"!", 
								views.html.professor.email.render(i, email, nome, senha, request().host(), 0).toString());
						
						JPA.em().persist(novoA);
					}
				}
			}else{
				return redirect(routes.InstituicaoController.login());
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/cadastrarAluno(): "+ e.getMessage());
		}
		return redirect(routes.InstituicaoController.alunos());
	}
	
	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			
			if (email == null || senha == null) {
				flash("erro", "Preencha todos os campos");

			} else {
				Instituicao i = InstituicaoDatabase.selectInstituicaoByEmail(email);

				if (i == null || i.getStatus() == Constantes.STATUS_REMOVIDO) {
					flash("erro", "Usuário não cadastrado");
					
				}else if(i.getStatus() == Constantes.STATUS_AGUARDANDO){
					flash("erro", "Confirme seu email no link que te enviamos");
					
				} else if(!i.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, i.getCnpj());
					return redirect(routes.InstituicaoController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/login(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		}
		
		return redirect(routes.InstituicaoController.login());
	}
}
