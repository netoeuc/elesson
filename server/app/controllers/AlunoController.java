package controllers;

import static play.data.Form.form;
import models.Aluno;
import database.AlunoDatabase;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import util.Constantes;

public class AlunoController extends Controller {

	@Transactional
	public static Result ativar() {
		String mensagem = "";
		String nome = "";
		try{
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("i");
			String idProfessor = dynamicForm.get("p");
			String email = dynamicForm.get("e");
	
			Aluno a = AlunoDatabase.selectAlunoMD5(cnpj, idProfessor, email);
	
			if (a != null && a.getStatus() == Constantes.STATUS_AGUARDANDO) {
				a.setStatus(Constantes.STATUS_ATIVO);
				JPA.em().merge(a);
				
				nome = "Hello, "+a.getNome();
				mensagem = "Sua conta foi ativada. Você já pode começar a jogar!";
			}else{
				return redirect(routes.Application.index());
			}
		}catch(Exception e){
			Logger.error("ERRO - AlunoController/ativar(): "+ e.getMessage());
			mensagem = "Ocorreu um erro ao ativar a conta. Tente novamente mais tarde";
			nome = "Ops";
		}
		return ok(views.html.aluno.index.render(nome, mensagem));
	}
}
