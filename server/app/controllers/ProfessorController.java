package controllers;

import static play.data.Form.form;

import interceptors.ProfessorInterceptor;

import java.util.HashMap;
import java.util.List;

import models.Aluno;
import models.Instituicao;
import models.Professor;
import models.Questao;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import database.ProfessorDatabase;
import database.QuestaoDatabase;
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
		|| session().get(Constantes.SESSION_COD_INSTTEAC) == null){
			return null;
		}
		HashMap<String, String> map = new HashMap<String, String>();
		map.put(Constantes.SESSION_USUARIO, session().get(Constantes.SESSION_USUARIO));
		map.put(Constantes.SESSION_COD_INSTTEAC, session().get(Constantes.SESSION_COD_INSTTEAC));
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
				return ProfessorDatabase.selectProfessor(session.get(Constantes.SESSION_USUARIO), session.get(Constantes.SESSION_COD_INSTTEAC));
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
	public static Result esqueceuSenha() {
		int template = 0; /* 0: formulario, 1: mensagem de confirmacao */
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String cnpj = dynamicForm.get("i") == null || dynamicForm.get("i").trim().isEmpty()? null : dynamicForm.get("i");
			String email = dynamicForm.get("e") == null || dynamicForm.get("e").trim().isEmpty()? null : dynamicForm.get("e");

			if(session().get(Constantes.SESSION_COD_INSTTEACFOR) != null && email != null && cnpj != null){
				Professor p = ProfessorDatabase.selectProfessorEncrypt(cnpj, email);
				if(p != null && p.getStatus() == Constantes.STATUS_ATIVO && 
					session().get(Constantes.SESSION_COD_INSTTEACFOR).equals(Seguranca.encryptString(p.getId()+""))){
					Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(p.getCnpjInst());
					
					String senha = Seguranca.gerarSenha(6);
					Mail.sendMail(p.getEmail(), "Alteração de Senha", views.html.professor.email.render(i, p.getNome(),p.getEmail(),senha, request().host(), 2).toString());
					p.setSenha(senha);
					JPA.em().merge(p);
					
					session().clear();
					template = 1;
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/esqueceuSenha(): "+ e.getMessage());
		}
		return ok(views.html.professor.esqueceuSenha.render(template));
	}
	
	@Transactional
	public static Result lembrarSenha() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();

			if(email == null){
				flash("erro", "Informe seu email");
			}else{
				Professor p = ProfessorDatabase.selectProfessorByEmail(email);
				if(p == null){
					flash("erro", "Email não cadastrado");
				}else if(p.getStatus() == Constantes.STATUS_ATIVO){
					Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(p.getCnpjInst());
					Mail.sendMail(p.getEmail(), "Você esqueceu a senha?", views.html.professor.email.render(i, p.getNome(),p.getEmail(),"", request().host(), 4).toString());
					session().put(Constantes.SESSION_COD_INSTTEACFOR, Seguranca.encryptString(p.getId()+""));
					flash("erro", "Confirme o lembrete no seu email");
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/lembrarSenha(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao enviar. Tente novamente mais tarde");
		}
		return redirect(routes.ProfessorController.esqueceuSenha());
	}
	
	@Transactional
	public static Result logar(){
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpjInst = dynamicForm.get("inst") == null || dynamicForm.get("inst").trim().isEmpty()? null : dynamicForm.get("inst").toLowerCase();
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("password"));
			
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
					session().put(Constantes.SESSION_COD_INSTTEAC, p.getCnpjInst());
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
	
			Professor p = ProfessorDatabase.selectProfessorEncrypt(cnpj, email);
	
			if (p != null && p.getStatus() == Constantes.STATUS_AGUARDANDO) {
				p.setStatus(Constantes.STATUS_ATIVO);
				JPA.em().merge(p);

				session().clear();
				session().put(Constantes.SESSION_USUARIO, p.getEmail());
				session().put(Constantes.SESSION_COD_INSTTEAC, p.getCnpjInst());
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
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : dynamicForm.get("password");
			String senhaConfirme = dynamicForm.get("confirmpassword") == null || dynamicForm.get("confirmpassword").trim().isEmpty()? null : dynamicForm.get("confirmpassword");

			boolean isEditado = false;
			Professor p = getUsuarioAutenticado();
			if(p != null){
				
				if (nome == null || email == null) {				
					flash("erro", "Preencha todos os campos");
				}else if(senha != null && senha.length() < 6){
					flash("erro", "Senha deve conter no mínimo 6 caracteres");
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
				List<Aluno> al = AlunoDatabase.selectAlunosByProfessorId(p.getId());
				return ok(views.html.professor.alunos.render(al));
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/alunos(): "+ e.getMessage());
		}
		return redirect(routes.ProfessorController.index());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result cadastrarQuestao(){
		try{
			Professor p = ProfessorController.getUsuarioAutenticado();
			if(p != null){
				DynamicForm dynamicForm = form().bindFromRequest();
				String questao = dynamicForm.get("questao") == null || dynamicForm.get("questao").replace("<p>", "").replace("</p>", "").trim().isEmpty()? null : dynamicForm.get("questao").replace("<p>", "").replace("</p>", "");
				String resposta1 = dynamicForm.get("resposta1") == null || dynamicForm.get("resposta1").trim().isEmpty()? null : dynamicForm.get("resposta1");
				String resposta2 = dynamicForm.get("resposta2") == null || dynamicForm.get("resposta2").trim().isEmpty()? null : dynamicForm.get("resposta2");
				String resposta3 = dynamicForm.get("resposta3") == null || dynamicForm.get("resposta3").trim().isEmpty()? null : dynamicForm.get("resposta3");
				String resposta4 = dynamicForm.get("resposta4") == null || dynamicForm.get("resposta4").trim().isEmpty()? null : dynamicForm.get("resposta4");
				String resposta5 = dynamicForm.get("resposta5") == null || dynamicForm.get("resposta5").trim().isEmpty()? null : dynamicForm.get("resposta5");
				String respostaCorreta = (dynamicForm.get("respostaCorreta") == null || dynamicForm.get("respostaCorreta").trim().isEmpty()? null : dynamicForm.get("respostaCorreta"));
				int nivel = dynamicForm.get("nivel") == null? -1 : Integer.parseInt(dynamicForm.get("nivel"));
				
				if(questao == null || resposta1 == null || resposta2 == null || resposta3 == null || resposta4 == null || resposta5 == null || respostaCorreta == null || nivel < 1 || nivel > 4){
					flash("erro", "Preencha todos os campos");
				}else if (questao.length() > 254){
					flash("erro", "Texto da questão muito longo");
				}else{
					char resposta = respostaCorreta.charAt(0);
					Questao novaQ = new Questao(p.getInstituicao(),p,questao,resposta1,resposta2,resposta3,resposta4,resposta5,resposta,nivel);
						
					JPA.em().persist(novaQ);
				}
			}else{
				return redirect(routes.ProfessorController.login());
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/cadastrarQuestao(): "+ e.getMessage());
		}
		return redirect(routes.ProfessorController.questoes());
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result formEditarQuestao() {
		try {
			Professor p = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest();
			int cod = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));

			if(cod == -1){
				Logger.error("ERRO - ProfessorController/formEditarQuestao(): CODE is null");
			}else{
				Questao q = QuestaoDatabase.selectQuestao(cod,p.getId(),p.getCnpjInst());
				return ok(views.html.professor.ajax.formEditarQuestao.render(q, Application.getSystemTime()));
			}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/formEditarQuestao(): "+ e.getMessage());
		}
		return ok("Ocorreu um erro ao editar. Tente novamente mais tarde");
	}
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result editarQuestao() {
		try {
			Professor p = getUsuarioAutenticado();
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String questao = dynamicForm.get("questao") == null || dynamicForm.get("questao").replace("<p>", "").replace("</p>", "").trim().isEmpty()? null : dynamicForm.get("questao").replace("<p>", "").replace("</p>", "");
			String resposta1 = dynamicForm.get("resposta1") == null || dynamicForm.get("resposta1").trim().isEmpty()? null : dynamicForm.get("resposta1");
			String resposta2 = dynamicForm.get("resposta2") == null || dynamicForm.get("resposta2").trim().isEmpty()? null : dynamicForm.get("resposta2");
			String resposta3 = dynamicForm.get("resposta3") == null || dynamicForm.get("resposta3").trim().isEmpty()? null : dynamicForm.get("resposta3");
			String resposta4 = dynamicForm.get("resposta4") == null || dynamicForm.get("resposta4").trim().isEmpty()? null : dynamicForm.get("resposta4");
			String resposta5 = dynamicForm.get("resposta5") == null || dynamicForm.get("resposta5").trim().isEmpty()? null : dynamicForm.get("resposta5");
			String respostaCorreta = dynamicForm.get("respostaCorreta") == null || dynamicForm.get("respostaCorreta").trim().isEmpty()? null : dynamicForm.get("respostaCorreta");
			int nivel = dynamicForm.get("nivel") == null? -1 : Integer.parseInt(dynamicForm.get("nivel"));
			int cod = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if (questao == null || resposta1 == null || resposta2 == null || resposta3 == null ||resposta4 == null || resposta5 == null || respostaCorreta == null || nivel == -1 || cod == -1) {				
				flash("erro", "Preencha todos os campos");
			}else if (questao.length() > 254){
				flash("erro", "Texto da questão muito longo");
			}else{
				Questao q = QuestaoDatabase.selectQuestao(cod, p.getId(), p.getCnpjInst());
				if(q != null){
					q.setQuestao(questao);
					q.setResposta1(resposta1);
					q.setResposta2(resposta2);
					q.setResposta3(resposta3);
					q.setResposta4(resposta4);
					q.setResposta5(resposta5);
					q.setRespostaCorreta(respostaCorreta.charAt(0));
					q.setLevel(nivel);
					JPA.em().merge(q);
					flash("ok","questão editada");
					}	
				}
		} catch (Exception e) {
			Logger.error("ERRO - ProfessorController/editarQuestao(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.ProfessorController.questoes());
	}
	
	
	@Transactional
	@With({ ProfessorInterceptor.class })
	public static Result removerQuestao() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			int idQuestao = dynamicForm.get("cod") == null? -1 : Integer.parseInt(dynamicForm.get("cod"));
			
			if(idQuestao != -1){
				Questao q = QuestaoDatabase.selectQuestaoById(idQuestao);
				if(q != null){
					QuestaoDatabase.deleteQuestao(q);
					flash("ok", "questão removida");
				}
			}else{
				flash("erro", "Informe o Id da questão");
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/removerQuestao(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao remover. Tente novamente mais tarde");
		}
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
		try{
			Professor p = ProfessorController.getUsuarioAutenticado();
			if(p != null){
				List<Questao> lq = QuestaoDatabase.selectQuestoesByProfessorId(p.getId());
				return ok(views.html.professor.questoes.render(lq));
			}
		}catch(Exception e){
			Logger.error("ERRO - ProfessorController/questoes(): "+ e.getMessage());
		}
		return redirect(routes.ProfessorController.index());
	}
}
