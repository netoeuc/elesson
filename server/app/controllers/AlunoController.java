package controllers;

import static play.data.Form.form;
import models.Aluno;
import models.Instituicao;
import database.AlunoDatabase;
import database.InstituicaoDatabase;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import util.Constantes;
import util.Mail;
import util.Seguranca;

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
}
