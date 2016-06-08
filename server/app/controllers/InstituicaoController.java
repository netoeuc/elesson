package controllers;

import static play.data.Form.form;

import java.util.List;

import models.Aluno;
import models.Instituicao;
import models.Licenca;
import models.Professor;
import models.Questao;
import models.Resposta;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import database.ProfessorDatabase;
import database.QuestaoDatabase;
import database.RespostaDatabase;
import interceptors.InstituicaoInterceptor;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import util.Constantes;
import util.ELicencaUtil;
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
		try {
			Instituicao i = getUsuarioAutenticado();
			int qntAlunos = i.getAlunos().size();
			int qntProfessores = i.getProfessores().size();
			int qntQuestoes = i.getQuestoes().size();
			Licenca l = ELicencaUtil.getLicenca(i.getLicenca());
			
			int statusLicenca = ELicencaUtil.getStatusLicenca(i.getLicenca(), qntAlunos);
			
			return ok(views.html.instituicao.index.render(i, qntAlunos, qntProfessores, qntQuestoes, statusLicenca, l));
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/index(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.logoff());
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
					Mail.sendMail(i.getEmail(), "Change password", views.html.instituicao.email.render(i, senha, request().host(), 2).toString());
					i.setSenha(senha);
					JPA.em().merge(i);

					session().clear();
					template = 1;
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/esqueceuSenha(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return ok(views.html.instituicao.esqueceuSenha.render(template));
	}

	@Transactional
	public static Result lembrarSenha() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();

			if(email == null){
				flash("erro", "Please enter your email");
			}else{
				Instituicao i = InstituicaoDatabase.selectInstituicaoByEmail(email);
				if(i == null){
					flash("erro", "Email doesn't exist");
				}else{
					Mail.sendMail(email, "Forgot your password?", views.html.instituicao.email.render(i, "", request().host(), 4).toString());
					session().put(Constantes.SESSION_COD_INSTTEACFOR, Seguranca.encryptString(i.getCnpj()));
					flash("erro", "Please confirm your email through the email we sent to you");
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/lembrarSenha(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Please try again later");
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
	public static Result mostrarProfessor(){
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int id = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if(id != -1){
				Professor p = ProfessorDatabase.selectProfessorById(id);
				
				if(p != null){
					int qntAlunos = ProfessorDatabase.selectCountAlunos(p.getId());
					int qntQuestoes = RespostaDatabase.selectTotalRespostasByProfessor(p.getId());
					int pontuacaoAlunos = AlunoDatabase.selectSomaPontuacaoByProfessorId(p.getId());
					List<Aluno> la = AlunoDatabase.selectAlunosOrderPontuacaoByProfessor(p.getId());
					
					return ok(views.html.instituicao.ajax.mostrarProfessor.render(qntAlunos, qntQuestoes, pontuacaoAlunos, la));
				}
			}
			flash("erro", "Teacher code is invalid");

		}catch(Exception e){
			e.printStackTrace();
			Logger.error("ERRO - InstituicaoController/mostrarProfessor(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Please try again later");
		}
		return badRequest("erro");
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result mostrarAluno(){
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int id = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if(id != -1){
				Instituicao i = getUsuarioAutenticado();
				Aluno a = AlunoDatabase.selectAlunoById(id);				
				if(a != null || a.getCnpjInst().equals(i.getCnpj())){
					
					int[] pontosPorLevel = AlunoDatabase.selectSomaPontuacaoPorLevelByAluno(id);
					
					int qntQuestoes = RespostaDatabase.selectTotalRespostasByAluno(a.getId());
					
					return ok(views.html.aluno.mostrarAluno.render(a,pontosPorLevel[0],pontosPorLevel[1],pontosPorLevel[2],pontosPorLevel[3],qntQuestoes));
				}
			}
			flash("erro", "Teacher code is invalid");

		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/mostrarAluno(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Please try again later");
		}
		return badRequest("erro");
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
					flash("erro", "Please fill out all the field");
				}else if(senha != null && senha.length() < 6){
					flash("erro", "Please enter a password with a minimum of 6 characters ");
				}else if(senha != null && (senhaConfirme == null || !senha.equals(senhaConfirme))){
					flash("erro", "Passwords don't match");
				}else if(telefone.length() < 10 || telefone.length() > 11){
					flash("erro", "Please enter a telephone number with 10 or 11 digits");
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
							Mail.sendMail(email, "Change password", views.html.instituicao.email.render(i, "", request().host(), 1).toString());
							i.setStatus(Constantes.STATUS_AGUARDANDO);
							flash("erro", "Confirm your email modification");
							session().clear();
							isEditado = true;
						}else{
							flash("erro", "Email already exists");
							isEditado = false;
						}
					}

					if(isEditado){
						JPA.em().merge(i);
						flash("ok", nome+" edited");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editar(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
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
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.index());
	}

	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result professores() {
		try{
			Instituicao i= getUsuarioAutenticado();
			if(i != null){
				return ok(views.html.instituicao.professores.render(i.getProfessores()));
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/professores(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.index());
	}

	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result alunos() {
		try{			
			Instituicao i = getUsuarioAutenticado();
			return ok(views.html.instituicao.alunos.render(0,i.getAlunos(),i.getProfessores()));
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/alunos(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.index());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result alunosByTeacher() {
		try{			
			Instituicao i = getUsuarioAutenticado();
			return ok(views.html.instituicao.alunos.render(1,i.getAlunos(),i.getProfessores()));
			
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/alunosByTeacher(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.alunos());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result alunosByRanking() {
		try{			
			Instituicao i = getUsuarioAutenticado();
			List<Aluno> la = AlunoDatabase.selectAlunosOrderPontuacaoByInstituicao(i.getCnpj());
			return ok(views.html.instituicao.alunos.render(2,la,i.getProfessores()));
			
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/alunosByRanking(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.alunos());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result editarProfessorAlunos() {
		try{			
			DynamicForm dynamicForm = form().bindFromRequest();
			int idProfessorAtual = dynamicForm.get("codP") == null? -1 : Integer.parseInt(dynamicForm.get("codP"));
			int idProfessorNovo = dynamicForm.get("codNP") == null? -1 : Integer.parseInt(dynamicForm.get("codNP"));

			if(idProfessorAtual != -1 && idProfessorAtual != -1 && idProfessorAtual != idProfessorNovo){
				Instituicao i = getUsuarioAutenticado();
				
				Professor pAtual = ProfessorDatabase.selectProfessor(idProfessorAtual, i.getCnpj());
				Professor pNovo = ProfessorDatabase.selectProfessor(idProfessorNovo, i.getCnpj());
				
				if(pAtual != null & pNovo != null){
					AlunoDatabase.updateAlunosToNewProfessor(pAtual, pNovo);
					flash("ok", "Students changed");
				}
			}else{
				flash("erro", "Choose another teacher to make the change");
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/editarProfessorAlunos(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		
		return redirect(routes.InstituicaoController.alunosByTeacher());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result questoes(){
		try{
			Instituicao i = InstituicaoController.getUsuarioAutenticado();
			if(i != null){
				return ok(views.html.instituicao.questoes.render(i.getQuestoes()));
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/questoes(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
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
				String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
				
				if(nome == null || email == null){
					flash("erro", "Please fill out all the fields");
				}else{
					Professor p = ProfessorDatabase.selectProfessorByEmail(email);
					if(p != null && p.getStatus() != Constantes.STATUS_REMOVIDO){
						flash("erro", "Email already exists");
					}else{
						String senha = Seguranca.gerarSenha(6);
						if(p == null){
							Professor novoP = new Professor(i, nome, email, senha, Constantes.STATUS_AGUARDANDO);
							Mail.sendMail(email, "Welcome, "+nome+"!", 
									views.html.professor.email.render(i, nome, email, senha, request().host(), 0).toString());
							
							JPA.em().persist(novoP);
							flash("ok", nome+" registered");
						}
					}
				}
			}else{
				return redirect(routes.InstituicaoController.login());
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/cadastrarProfessor(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.professores());
	}

	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result cadastrarAluno(){
		try{
			Instituicao i = InstituicaoController.getUsuarioAutenticado();
			int qntAlunos = AlunoDatabase.selectTotalAlunosByCnpjInst(i.getCnpj());
			if(i != null){
				if((i.getLicenca().name().equals("TEST") && qntAlunos == 5) || 
						(i.getLicenca().name().equals("BRONZE") && qntAlunos == 20) || 
						(i.getLicenca().name().equals("SILVER") && qntAlunos == 40) || 
						(i.getLicenca().name().equals("GOLD") && qntAlunos == 70) || 
						(i.getLicenca().name().equals("PREMIUM") && qntAlunos == 120)){
					
					flash("erro", "Institution has reached the limit of students for this license!");
				}else{
					DynamicForm dynamicForm = form().bindFromRequest();
					String nome = dynamicForm.get("nome") == null || dynamicForm.get("nome").trim().isEmpty()? null : dynamicForm.get("nome");
					String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email");
					int idProfessor = dynamicForm.get("teacher") == null? -1 : Integer.parseInt(dynamicForm.get("teacher"));
					
					if(nome == null || email == null || idProfessor == -1){
						flash("erro", "Please fill out all the fields");
					}else{
						Aluno a = AlunoDatabase.selectAlunoByEmail(email);
						Professor p = ProfessorDatabase.selectProfessor(idProfessor, i.getCnpj());
						if(a != null && a.getStatus() != Constantes.STATUS_REMOVIDO){
							flash("erro", "Email already exists");
						}else if(p != null){
							String senha = Seguranca.gerarSenha(6);
							
							if(a == null){
								Aluno novoA = new Aluno(i, p, email, nome, senha, Constantes.STATUS_AGUARDANDO);
								Mail.sendMail(email, "Welcome, "+nome+"!", 
											views.html.aluno.email.render(i, p.getId()+"", nome, email, senha, request().host(), 0).toString());
									
								JPA.em().persist(novoA);
								flash("ok", nome+" registered");
							}
						}
					}
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/cadastrarAluno(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.alunos());
	}

	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result removerProfessor() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int idProfessor = dynamicForm.get("cod") == null? -1 : Integer.parseInt(dynamicForm.get("cod"));
			Instituicao i = InstituicaoController.getUsuarioAutenticado();
			
			if(idProfessor != -1){
				Professor p = ProfessorDatabase.selectProfessorById(idProfessor);
				if(p != null && p.getCnpjInst().equals(i.getCnpj())){
					List<Aluno> la = p.getAlunos();
					if(la == null || la.size() == 0){
						String nome = p.getNome().split(" ")[0];
						ProfessorDatabase.deleteProfessor(p);
						flash("ok", nome+" Removed");
					}else{
						flash("erro", "Remove all students of this teacher or move then to another teacher");
					}
				}else{
					flash("erro", "None teacher registered with this code");
				}
			}else{
				flash("erro", "Inform teacher Id");
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/removerProfessor(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.professores());
	}

	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result removerAluno() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int idAluno = dynamicForm.get("cod") == null? -1 : Integer.parseInt(dynamicForm.get("cod"));
			Instituicao i = InstituicaoController.getUsuarioAutenticado();

			if(idAluno != -1){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);					
					if(a != null && a.getCnpjInst().equals(i.getCnpj())){
						String nome = a.getNome().split(" ")[0];
						AlunoDatabase.deleteAluno(a);
		
						flash("ok", nome+" Removed");
					}else{
						flash("erro", "None student registered with this code");
					}
			}else{
				flash("erro", "Inform student Id");
			}
		}catch(Exception e){
			Logger.error("ERRO - InstituicaoController/removerAluno(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}
		return redirect(routes.InstituicaoController.alunos());
	}

	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("password"));

			if (email == null || senha == null) {
				flash("erro", "Please fill out all the fields");

			} else {
				Instituicao i = InstituicaoDatabase.selectInstituicaoByEmail(email);

				if (i == null || i.getStatus() == Constantes.STATUS_REMOVIDO) {
					flash("erro", "Username does not exist");

				}else if(i.getStatus() == Constantes.STATUS_AGUARDANDO){
					flash("erro", "Confirm the email on the link we sent to you");

				} else if(!i.getSenha().equals(senha)){
					flash("erro", "Wrong password");

				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, i.getEmail());
					session().put(Constantes.SESSION_COD_INSTTEAC, i.getCnpj());
					return redirect(routes.InstituicaoController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/login(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}

		return redirect(routes.InstituicaoController.login());
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
		return ok("Something wrong happened. Try again later");
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
				flash("erro", "Please fill out all the fields");
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
						Professor pe = ProfessorDatabase.selectProfessorByEmail(email);
						if(pe == null){
							p.setEmail(email);
							p.setStatus(Constantes.STATUS_AGUARDANDO);
							isEditado = true;
							isEmailAlterado = true;
						}else{
							flash("erro", "Email already exists");
							isEditado = false;
							isSenhaAlterada = false;
							isEmailAlterado = false;
						}
					}

					if(isEmailAlterado && !isSenhaAlterada){
						Mail.sendMail(email, "Change email", views.html.professor.email.render(i, nome, email, "", request().host(), 1).toString());
					}else if(!isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Change password", views.html.professor.email.render(i, nome,"",senha, request().host(), 2).toString());
					}else if(isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Change email and password", views.html.professor.email.render(i, nome,email,senha, request().host(), 3).toString());
					}

					if(isEditado){
						JPA.em().merge(p);
						flash("ok", nome+" edited");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editarProfessor(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}		
		return redirect(routes.InstituicaoController.professores());
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
		return ok("Something wrong happened. Try again later");
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
				flash("erro", "Please fill out all the fields");
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
						a.setLogado(false); 
						isEditado = true;
						isSenhaAlterada = true;
					}
					if(!a.getEmail().equals(email)){
						Aluno ae = AlunoDatabase.selectAluno(email, i.getCnpj());
						if(ae == null){
							a.setEmail(email);
							a.setLogado(false);
							a.setStatus(Constantes.STATUS_AGUARDANDO);
							isEditado = true;
							isEmailAlterado = true;
						}else{
							flash("erro", "Email already exists");
							isEditado = false;
							isSenhaAlterada = false;
							isEmailAlterado = false;
						}
					}

					if(isEmailAlterado && !isSenhaAlterada){
						Mail.sendMail(email, "Change email", views.html.aluno.email.render(i, codP+"", nome, email, "", request().host(), 1).toString());
					}else if(!isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Change password", views.html.aluno.email.render(i, codP+"",nome,"",senha, request().host(), 2).toString());
					}else if(isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Change email and password", views.html.aluno.email.render(i, codP+"", nome,email,senha, request().host(), 3).toString());
					}

					if(isEditado){
						JPA.em().merge(a);
						flash("ok", nome+" edited");
					}
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/editarAluno(): "+ e.getMessage());
			flash("erro", "Something wrong happened. Try again later");
		}		
		return redirect(routes.InstituicaoController.alunos());
	}
	
	@Transactional
	@With({ InstituicaoInterceptor.class })
	public static Result mostrarQuestao(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			int cod = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));

			if(cod == -1){
				Logger.error("ERRO - InstituicaoController/mostrarQuestao(): CODE is null");
			}else{
				Questao q = QuestaoDatabase.selectQuestaoById(cod);
				List<Resposta> lr = RespostaDatabase.selectRespostasByQuestao(q.getId());
				
				int pontuacaoTotalQuestao = 0;
				for (Resposta r : lr)
				{
					pontuacaoTotalQuestao += r.getPontuacao();
				}
				
				return ok(views.html.instituicao.ajax.mostrarQuestao.render(q,pontuacaoTotalQuestao));
			}
		} catch (Exception e) {
			Logger.error("ERRO - InstituicaoController/mostrarQuestao(): "+ e.getMessage());
		}
		return ok("Something wrong happened. Try again later");
	}
}
