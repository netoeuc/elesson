package controllers;

import static play.data.Form.form;

import java.util.HashMap;
import java.util.List;

import models.Aluno;
import models.AlunoRanking;
import models.Instituicao;
import models.Questao;
import models.Resposta;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import util.AdminJson;
import util.Constantes;
import util.Mail;
import util.Seguranca;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import database.QuestaoDatabase;

public class AlunoController extends Controller {

	@Transactional
	public static Result ativar() {
		String mensagem = "";
		String nome = "";
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("i") == null || dynamicForm.get("i").trim().isEmpty()? null : dynamicForm.get("i");
			String email = dynamicForm.get("e") == null || dynamicForm.get("e").trim().isEmpty()? null : dynamicForm.get("e");
			String idProfessor = dynamicForm.get("p") == null || dynamicForm.get("p").trim().isEmpty()? null : dynamicForm.get("p");
			
			if(cnpj != null && email != null && idProfessor != null){
				Aluno a = AlunoDatabase.selectAlunoEncrypt(cnpj, idProfessor, email);
		
				if (a != null && a.getStatus() == Constantes.STATUS_AGUARDANDO) {
					a.setStatus(Constantes.STATUS_ATIVO);
					JPA.em().merge(a);
					
					nome = "Hello, "+a.getNome();
					mensagem = "Sua conta foi ativada. Você já pode começar a jogar!";
					return ok(views.html.aluno.index.render(nome, mensagem));
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/ativar(): "+ e.getMessage());
			mensagem = "Ocorreu um erro ao ativar a conta. Tente novamente mais tarde";
			nome = "Ops";
			return ok(views.html.aluno.index.render(nome, mensagem));
		}
		return redirect(routes.Application.index());
	}
	
	@Transactional
	public static Result esqueceuSenha() {
		int template = 0; /* 0: formulario, 1: mensagem de confirmacao */
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String cnpj = dynamicForm.get("i") == null || dynamicForm.get("i").trim().isEmpty()? null : dynamicForm.get("i");
			String email = dynamicForm.get("e") == null || dynamicForm.get("e").trim().isEmpty()? null : dynamicForm.get("e");
			String idProfessor = dynamicForm.get("p") == null || dynamicForm.get("p").trim().isEmpty()? null : dynamicForm.get("p");

			if(session().get(Constantes.SESSION_COD_INSTTEACFOR) != null && email != null && cnpj != null && idProfessor != null){
				Aluno a = AlunoDatabase.selectAlunoEncrypt(cnpj, idProfessor, email);	
				
				if(a != null && a.getStatus() == Constantes.STATUS_ATIVO && 
					session().get(Constantes.SESSION_COD_INSTTEACFOR).equals(Seguranca.encryptString(a.getId()+""))){
					Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(a.getCnpjInst());

					String senha = Seguranca.gerarSenha(6);
					Mail.sendMail(a.getEmail(), "Alteração de Senha", views.html.aluno.email.render(i, a.getIdProfessor()+"", a.getNome(), a.getEmail(), senha, request().host(), 2).toString());
					a.setSenha(senha);
					a.setLogado(false);
					JPA.em().merge(a);
					
					session().clear();
					template = 1;
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/esqueceuSenha(): "+ e.getMessage());
		}
		return ok(views.html.aluno.esqueceuSenha.render(template));
	}
	
	@Transactional
	public static Result lembrarSenha() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();

			if(email == null){
				flash("erro", "Informe seu email");
			}else{
				Aluno a = AlunoDatabase.selectAlunoByEmail(email);
				if(a == null){
					flash("erro", "Email não cadastrado");
				}else{
					Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(a.getEmail());

					Mail.sendMail(a.getEmail(), "Você esqueceu a senha?", views.html.aluno.email.render(i, a.getIdProfessor()+"", a.getNome(), a.getEmail(), "", request().host(), 4).toString());
					session().put(Constantes.SESSION_COD_INSTTEACFOR, Seguranca.encryptString(i.getCnpj()));
					flash("erro", "Confirme o lembrete no seu email");
				}
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/lembrarSenha(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao enviar. Tente novamente mais tarde");
		}
		return redirect(routes.AlunoController.esqueceuSenha());
	}

	
	/* API PARA APP DOS ALUNOS */
	
	@Transactional
	public static Result logar(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email");
			String senha = dynamicForm.get("senha") == null || dynamicForm.get("senha").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("senha"));
			String sessao = dynamicForm.get("sessao") == null || dynamicForm.get("sessao").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("sessao"));
			boolean isNovaSessao = dynamicForm.get("isNSessao") == null || dynamicForm.get("isNSessao").trim().isEmpty()? false : Boolean.getBoolean(dynamicForm.get("isNSessao"));

			if(email != null && senha != null && sessao != null){
				Aluno a = AlunoDatabase.selectAlunoByEmail(email);
		
				if (a != null && a.getStatus() != Constantes.STATUS_REMOVIDO) {
					if(isNovaSessao && a.isLogado() && !a.getSessao().equals(sessao)){
						return ok(AdminJson.getMensagem("Você já está logado em outro dispositivo. Deseja iniciar uma nova sessão para este dispositivo?"));
					}
					if(a.getStatus() == Constantes.STATUS_ATIVO){
						if (a.getSenha().equals(senha)) {
							HashMap<String, Object> map = new HashMap<String, Object>();
							map.put("aluno", a);
							if(a.getUsername() == null){
								map.put("primeiroAcesso", true);
							}else{
								map.put("primeiroAcesso", false);
							}
							a.setLogado(true);
							a.setSessao(sessao);
							JPA.em().merge(a);
							
							return ok(AdminJson.getObject(map));
						}else{
							return ok(AdminJson.getMensagem("senha inválida"));
						}
					}else{
						return ok(AdminJson.getMensagem("confirme sua conta no email que te enviamos"));
					}
				}else{
					return ok(AdminJson.getMensagem("usuário não cadastrado"));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/logar(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
	@Transactional
	public static Result isLogado(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			int idAluno = dynamicForm.get("ca") == null || dynamicForm.get("ca").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("ca"));
			String sessao = dynamicForm.get("se") == null || dynamicForm.get("se").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("se"));

			if(idAluno != -1 && sessao != null){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);
				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado() && a.getSessao().equals(sessao)) {
					return ok(Aluno.isLogado(true));
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/isLogado(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
	@Transactional
	public static Result questoes(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			int idAluno = dynamicForm.get("ca") == null || dynamicForm.get("ca").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("ca"));
			String sessao = dynamicForm.get("se") == null || dynamicForm.get("se").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("se"));

			if(idAluno != -1 && sessao != null){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);

				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado() && a.getSessao().equals(sessao)) {
					List<Questao> lq = QuestaoDatabase.selectQuestoesByAluno(a.getCnpjInst(), a.getIdProfessor(), a.getId(), a.getLevel());
					return ok(AdminJson.getObject(lq, "listaQuestoes"));
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/questoes(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
	/******** NAO APAGAR ********/
/*	@Transactional 
	public static Result responderQuestaoUmaPorVez(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			int idAluno = dynamicForm.get("ca") == null || dynamicForm.get("ca").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("ca"));
			int idQuestao = dynamicForm.get("cq") == null || dynamicForm.get("cq").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("cq"));
			int pontuacao = dynamicForm.get("p") == null || dynamicForm.get("p").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("p"));
			int posicaoJogo = dynamicForm.get("pos") == null || dynamicForm.get("pos").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("pos"));

			if(idAluno != -1 && idQuestao != -1 && pontuacao != -1 && posicaoJogo != -1){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);

				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado()) {
					Questao q = QuestaoDatabase.selectQuestaoById(idQuestao);

					if(q != null && q.getLevel() == a.getLevel()){
						Resposta r = new Resposta(q.getProfessor(), q, a, pontuacao, posicaoJogo);
						a.setPontuacao(a.getPontuacao() + pontuacao);
						JPA.em().persist(r);
						JPA.em().merge(a);
						
						return ok(Questao.isRespondida(true));
					}else{
						return ok(Questao.isRespondida(false));
					}
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/responderQuestao(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}*/
	
	@Transactional
	public static Result responderQuestaoCincoPorVez(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			String json = dynamicForm.get("jra") == null || dynamicForm.get("jra").trim().isEmpty()? null : dynamicForm.get("jra");
			String sessao = dynamicForm.get("se") == null || dynamicForm.get("se").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("se"));

			if(json != null && sessao != null){
								
				// cria um objeto a partir dos dados em JSON  
			    JSONObject jsonObject = new JSONObject( json );
			    JSONObject jResultado = jsonObject.getJSONObject("resultado");
				Aluno a = AlunoDatabase.selectAlunoById(jResultado.getInt("idAluno"));
				int pontuacaoTotal = 0;
				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado() && a.getSessao().equals(sessao)) {
									
				    JSONArray jListaRespostas = jResultado.getJSONArray("respostas");
				    
				    Questao q = null;
				    Resposta r = null;
				    JSONObject jResposta = null;
				    
				    try{
				    	JPA.em().getTransaction().begin();
					    for (int i = 0; i < jListaRespostas.length(); i++) {
					    	
					    	jResposta = jListaRespostas.getJSONObject(i);    	
							q = QuestaoDatabase.selectQuestaoById(jResposta.getInt("idQuestao"));
							
							if(q == null){
								throw new Exception("ERRO - AlunoController/responderQuestaoCincoPorVez(): Questao nao cadastrada. idQuestao: "+jResposta.getInt("idQuestao"));
							}
							
					    	r = new Resposta(a.getProfessor(), q, a, jResposta.getInt("pontuacao"));
					    	pontuacaoTotal += jResposta.getInt("pontuacao");
					    	
					    	JPA.em().persist(r);
						}
					    a.setPontuacao(a.getPontuacao() + pontuacaoTotal);
					    a.setLevel((a.getLevel()+1));
					  
					    JPA.em().merge(a);	
					    JPA.em().getTransaction().commit();
					    
					    List<Questao> lq = QuestaoDatabase.selectQuestoesByAluno(a.getCnpjInst(), a.getIdProfessor(), a.getId(), a.getLevel());
						return ok(AdminJson.getObject(lq, "listaQuestoes"));
				    
				    }catch(Exception e){
				    	Logger.error(e.getMessage());
				    	JPA.em().getTransaction().rollback();
				    }
				    return ok(Questao.isRespondida(false));
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/responderQuestao(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
	@Transactional
	public static Result rankingByProfessor(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			int idAluno = dynamicForm.get("ca") == null || dynamicForm.get("ca").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("ca"));
			String sessao = dynamicForm.get("se") == null || dynamicForm.get("se").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("se"));

			if(idAluno != -1 && sessao != null){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);

				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado() && a.getSessao().equals(sessao)) {
					List<AlunoRanking> lar = AlunoDatabase.selectAlunosRankingByProfessor(a.getIdProfessor());
					return ok(AdminJson.getObject(lar, "rankingPorProfessor"));
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/rankingByProfessor(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
	@Transactional
	public static Result rankingByInstituicao(){
		response().setContentType("application/json; charset=utf-8");
		response().setHeader("Access-Control-Allow-Origin","*");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST");
		
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos da requisicao
			int idAluno = dynamicForm.get("ca") == null || dynamicForm.get("ca").trim().isEmpty()? -1 : Integer.parseInt(dynamicForm.get("ca"));
			String sessao = dynamicForm.get("se") == null || dynamicForm.get("se").trim().isEmpty()? null : Seguranca.encryptString(dynamicForm.get("se"));

			if(idAluno != -1 && sessao != null){
				Aluno a = AlunoDatabase.selectAlunoById(idAluno);

				if (a != null && a.getStatus() == Constantes.STATUS_ATIVO && a.isLogado() && a.getSessao().equals(sessao)) {
					List<AlunoRanking> lar = AlunoDatabase.selectAlunosRankingByInstituicao(a.getCnpjInst());
					return ok(AdminJson.getObject(lar, "rankingPorInstituicao"));
				}else{
					return ok(Aluno.isLogado(false));
				}
			}else{
				return badRequest(AdminJson.getMensagem(AdminJson.msgConsulteAPI));
			}
		}catch(Exception e){
			e.printStackTrace();
			Logger.error("ERRO - AlunoController/rankingByInstituicao(): "+ e.getMessage());
		}
		return badRequest(AdminJson.getMensagem(AdminJson.msgErroRequest));
	}
	
}
