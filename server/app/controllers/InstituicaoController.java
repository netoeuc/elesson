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
import util.AdminJson;
import play.mvc.With;
import util.Constantes;
import util.Mail;
import util.Seguranca;

public class InstituicaoController extends Controller{
	
	@Transactional
	public static String getUsuarioSession() {
		return session().get(Constantes.SESSION_COD_INSTTEAC);
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
	public static Result esqueceuSenha() {
		int template = 0; /* 0: formulario, 1: mensagem de confirmacao */
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String cnpj = dynamicForm.get("i") == null || dynamicForm.get("i").trim().isEmpty()? null : dynamicForm.get("i");
			String email = dynamicForm.get("e") == null || dynamicForm.get("e").trim().isEmpty()? null : dynamicForm.get("e");

			if(session().get(Constantes.SESSION_COD_INSTTEACFOR) != null && email != null && cnpj != null){
				Instituicao i = InstituicaoDatabase.selectInstituicaoEncrypt(cnpj, email);
				if(i != null && i.getStatus() == Constantes.STATUS_ATIVO && 
					session().get(Constantes.SESSION_COD_INSTTEACFOR).equals(Seguranca.encryptString(i.getCnpj()))){
					
					String senha = Seguranca.gerarSenha(6);
					Mail.sendMail(i.getEmail(), "Alteração de Senha", views.html.instituicao.email.render(i, senha, request().host(), 2).toString());
					i.setSenha(senha);
					JPA.em().merge(i);
					
					session().clear();
					template = 1;
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/esqueceuSenha(): "+ e.getMessage());
		}
		return ok(views.html.instituicao.esqueceuSenha.render(template));
	}
	
	@Transactional
	public static Result lembrarSenha() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();

			if(email == null){
				flash("erro", "Informe seu email");
			}else{
				Instituicao i = InstituicaoDatabase.selectInstituicaoByEmail(email);
				if(i == null){
					flash("erro", "Email não cadastrado");
				}else{
					Mail.sendMail(email, "Você esqueceu a senha?", views.html.instituicao.email.render(i, "", request().host(), 4).toString());
					session().put(Constantes.SESSION_COD_INSTTEACFOR, Seguranca.encryptString(i.getCnpj()));
					flash("erro", "Confirme o lembrete no seu email");
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/lembrarSenha(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao enviar. Tente novamente mais tarde");
		}
		return redirect(routes.InstituicaoController.esqueceuSenha());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result configuracao() {
		Instituicao i = getUsuarioAutenticado();
		return ok(views.html.instituicao.configuracao.render(i));
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result editar() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String telefone = dynamicForm.get("phone") == null || dynamicForm.get("phone").replace(")", "").replace("(", "").replace("-", "").trim().isEmpty()? null : dynamicForm.get("phone").replace(")", "").replace("(", "").replace("-", "");
			String endereco = dynamicForm.get("address") == null || dynamicForm.get("address").trim().isEmpty()? null : dynamicForm.get("address");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : dynamicForm.get("password");
			String senhaConfirme = dynamicForm.get("confirmpassword") == null || dynamicForm.get("confirmpassword").trim().isEmpty()? null : dynamicForm.get("confirmpassword");

			boolean isEditado = false;
			Instituicao i = getUsuarioAutenticado();
			if(i != null){
				
				if (nome == null || telefone == null || endereco == null || email == null) {				
					flash("erro", "Preencha todos os campos");
				}else if(senha != null && senha.length() < 6){
					flash("erro", "Senha deve conter no mínimo 6 caracteres");
				}else if(senha != null && (senhaConfirme == null || !senha.equals(senhaConfirme))){
					flash("erro", "Senhas não conferem");
				}else if(telefone.length() < 10 || telefone.length() > 11){
					flash("erro", "Telefone deve conter 10 ou 11 dígitos");
				}else{
					if(!i.getNome().equals(nome)){
						i.setNome(nome); 
						isEditado = true;
					}
					if(!i.getTelefone().equals(telefone)){
						i.setTelefone(telefone); 
						isEditado = true;
					}
					if(!i.getEndereco().equals(endereco)){
						i.setEndereco(endereco);
						isEditado = true;
					}
					if(senha != null){
						i.setSenha(senha);
						isEditado = true;
					}
					if(!i.getEmail().equals(email)){
						Instituicao ie = InstituicaoDatabase.selectInstituicaoByEmail(email);
						if(ie == null){
							i.setEmail(email);
							Mail.sendMail(email, "Alteração de Email", views.html.instituicao.email.render(i, "", request().host(), 1).toString());
							i.setStatus(Constantes.STATUS_AGUARDANDO);
							flash("erro", "Confirme a alteração do seu email");
							session().clear();
							isEditado = true;
						}else{
							flash("erro", "Email já cadastrado");
							isEditado = false;
						}
					}
					
					if(isEditado){
						JPA.em().merge(i);
						flash("ok", nome+" editado");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editar(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.InstituicaoController.configuracao());
	}
	
	@Transactional
	public static Result ativar() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("i");
			String email = dynamicForm.get("e");
	
			Instituicao i = InstituicaoDatabase.selectInstituicaoEncrypt(cnpj, email);
	
			if (i != null && i.getStatus() == Constantes.STATUS_AGUARDANDO) {
				i.setStatus(Constantes.STATUS_ATIVO);
				JPA.em().merge(i);

				session().clear();
				session().put(Constantes.SESSION_USUARIO, i.getEmail());
				session().put(Constantes.SESSION_COD_INSTTEAC, i.getCnpj());
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
				List<Professor> po = ProfessorDatabase.selectProfessoresByCnpjInst(cnpj);
				return ok(views.html.instituicao.professores.render(po));
			}
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
			
			Instituicao i = getUsuarioAutenticado();
			// pegar lista de alunos de acordo com o cnpj no banco e passar como parametro pra pagina
			List<Aluno> al = AlunoDatabase.selectAlunosByCnpjInst(i.getCnpj());
			List<Professor> po = ProfessorDatabase.selectProfessoresByCnpjInst(i.getCnpj());
			return ok(views.html.instituicao.alunos.render(isSingle,al,po));
			
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
						Professor novoP = new Professor(i.getCnpj(), nome, email, senha, Constantes.STATUS_AGUARDANDO);
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
						Aluno novoA = new Aluno(i.getCnpj(), idProfessor, email, nome, senha, Constantes.STATUS_AGUARDANDO);
						Mail.sendMail(email, "Bem-vindo, "+nome+"!", 
						views.html.aluno.email.render(i, idProfessor+"", nome, email, senha, request().host(), 0).toString());
						
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
	@With({ InstituicaoInterceptor.class })
	public static Result removerProfessor() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			long idProfessor = dynamicForm.get("cod") == null? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if(idProfessor != -1){
				Professor p = ProfessorDatabase.selectProfessorById(idProfessor);
				if(p != null){
					p.setStatus(Constantes.STATUS_REMOVIDO);
					JPA.em().merge(p);
					flash("ok", p.getNome()+" Removido");
				}
			}else{
				flash("erro", "Informe o Id do professor");
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/removerProfessor(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao remover. Tente novamente mais tarde");
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result removerAluno() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int idAluno = dynamicForm.get("cod") == null? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if(idAluno != -1){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);
				if(a != null){
					a.setStatus(Constantes.STATUS_REMOVIDO);
					JPA.em().merge(a);
					flash("ok", a.getNome()+" Removido");
				}
			}else{
				flash("erro", "Informe o Id do aluno");
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/removerAluno(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao remover. Tente novamente mais tarde");
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("password"));
						
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
					session().put(Constantes.SESSION_USUARIO, i.getEmail());
					session().put(Constantes.SESSION_COD_INSTTEAC, i.getCnpj());
					return redirect(routes.InstituicaoController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/login(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		}
		
		return redirect(routes.InstituicaoController.login());
	}
	
	@Transactional
	public static Result teste(){
		try {
			return ok(AdminJson.getObject(AlunoDatabase.selectAlunosByProfessorByCnpjInst("123123"), "alunosPorProfessor"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ok("");
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result formEditarProfessor() {
		try {
			Instituicao i = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest();
			int codigo = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));
			if(codigo == -1){
				Logger.error("ERRO - InstituicaoController/formEditarProfessor(): CODE is null");
			}else{
				Professor p = ProfessorDatabase.selectProfessor(codigo, i.getCnpj());
				return ok(views.html.instituicao.ajax.formEditarProfessor.render(p));
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/formEditarProfessor(): "+ e.getMessage());
		}
		return ok("Ocorreu um erro ao editar. Tente novamente mais tarde");
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result editarProfessor() {
		try {
			Instituicao i = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			int cod = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));
			boolean generate = dynamicForm.get("generate") == null || dynamicForm.get("generate").trim().isEmpty()? false : true;

			boolean isEditado = false;
			boolean isSenhaAlterada = false;
			boolean isEmailAlterado = false;
			String senha = null;
			
			if (nome == null || email == null || cod == -1) {				
				flash("erro", "Preencha todos os campos");
			}else{
				Professor p = ProfessorDatabase.selectProfessor(cod, i.getCnpj());
				if(p != null){
					if(!p.getNome().equals(nome)){
						p.setNome(nome); 
						isEditado = true;
					}
					if(generate){
						senha = Seguranca.gerarSenha(6);
						p.setSenha(senha); 
						isEditado = true;
						isSenhaAlterada = true;
					}
					if(!p.getEmail().equals(email)){
						Professor pe = ProfessorDatabase.selectProfessor(email, i.getCnpj());
						if(pe == null){
							p.setEmail(email);
							p.setStatus(Constantes.STATUS_AGUARDANDO);
							isEditado = true;
							isEmailAlterado = true;
						}else{
							flash("erro", "Email já cadastrado");
							isEditado = false;
							isSenhaAlterada = false;
							isEmailAlterado = false;
						}
					}
						
					if(isEmailAlterado && !isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email", views.html.professor.email.render(i, nome, email, "", request().host(), 1).toString());
					}else if(!isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Senha", views.html.professor.email.render(i, nome,"",senha, request().host(), 2).toString());
					}else if(isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email e Senha", views.html.professor.email.render(i, nome,email,senha, request().host(), 3).toString());
					}
					
					if(isEditado){
						JPA.em().merge(p);
						flash("ok", nome+" editado");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editarProfessor(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result formEditarAluno() {
		try {
			Instituicao i = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest();
			int codA = dynamicForm.get("codA") == null || dynamicForm.get("codA").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("codA"));
			int codP = dynamicForm.get("codP") == null || dynamicForm.get("codP").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("codP"));

			if(codA == -1 || codP == -1){
				Logger.error("ERRO - InstituicaoController/formEditarAluno(): CODE is null");
			}else{
				Aluno a = AlunoDatabase.selectAluno(codA, codP, i.getCnpj());
				return ok(views.html.instituicao.ajax.formEditarAluno.render(a));
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/formEditarAluno(): "+ e.getMessage());
		}
		return ok("Ocorreu um erro ao editar. Tente novamente mais tarde");
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result editarAluno() {
		try {
			Instituicao i = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			int codA = dynamicForm.get("codA") == null || dynamicForm.get("codA").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("codA"));
			int codP = dynamicForm.get("codP") == null || dynamicForm.get("codP").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("codP"));

			boolean generate = dynamicForm.get("generate") == null || dynamicForm.get("generate").trim().isEmpty()? false : true;

			boolean isEditado = false;
			boolean isSenhaAlterada = false;
			boolean isEmailAlterado = false;
			String senha = null;
			
			if (nome == null || email == null || codA == -1 || codP == -1) {				
				flash("erro", "Preencha todos os campos");
			}else{
				Aluno a = AlunoDatabase.selectAluno(codA, codP, i.getCnpj());
				if(a != null){
					if(!a.getNome().equals(nome)){
						a.setNome(nome); 
						isEditado = true;
					}
					if(generate){
						senha = Seguranca.gerarSenha(6);
						a.setSenha(senha); 
						isEditado = true;
						isSenhaAlterada = true;
					}
					if(!a.getEmail().equals(email)){
						Aluno ae = AlunoDatabase.selectAluno(email, i.getCnpj());
						if(ae == null){
							a.setEmail(email);
							a.setStatus(Constantes.STATUS_AGUARDANDO);
							isEditado = true;
							isEmailAlterado = true;
						}else{
							flash("erro", "Email já cadastrado");
							isEditado = false;
							isSenhaAlterada = false;
							isEmailAlterado = false;
						}
					}
						
					if(isEmailAlterado && !isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email", views.html.aluno.email.render(i, codP+"", nome, email, "", request().host(), 1).toString());
					}else if(!isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Senha", views.html.aluno.email.render(i, codP+"",nome,"",senha, request().host(), 2).toString());
					}else if(isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email e Senha", views.html.aluno.email.render(i, codP+"", nome,email,senha, request().host(), 3).toString());
					}
					
					if(isEditado){
						JPA.em().merge(a);
						flash("ok", nome+" editado");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editarAluno(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.InstituicaoController.index());
	}
}
