package controllers;

import static play.data.Form.form;

import java.util.List;

import interceptors.UsuarioSmartInterceptor;
import database.InstituicaoDatabase;
import database.SmartEducDatabase;
import models.Instituicao;
import models.UsuarioSmart;
import play.Logger;
import play.data.DynamicForm;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import util.Constantes;
import util.ELicenca;
import util.ELicencaUtil;
import util.Mail;
import util.Seguranca;

public class SmartEducController extends Controller{
	
	@Transactional
	public static String getUsuarioSession() {
		return session().get(Constantes.SESSION_USUARIO);
	}
	
	@Transactional
	public static boolean isAutentico() {
		if (getUsuarioSession() == null) {
			return false;
		} else {
			UsuarioSmart us = getUsuarioAutenticado();
			if (us == null) {
				return false;
			}
			return true;
		}
	}
	

	@Transactional
	public static UsuarioSmart getUsuarioAutenticado() {
		try{
			int id = Integer.parseInt(getUsuarioSession());
			if (id == -1) {
				return null;
			} else {
				return SmartEducDatabase.selectUsuarioSmart(id);
			}
		}catch(Exception e){
			return null;
		}
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result index(){
		try {
			List<Instituicao> li = InstituicaoDatabase.selectInstituicao();
			return ok(views.html.smarteduc.index.render(li));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return redirect(routes.SmartEducController.logoff());
	}
	
	@Transactional
	public static Result login() {
		return ok(views.html.smarteduc.login.render());
	}
	
	@Transactional
	public static Result logoff() {
		session().clear();
		return redirect(routes.SmartEducController.login());
	}
	
	@Transactional
	public static Result logar() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String email = dynamicForm.get("login") == null || dynamicForm.get("login").trim().isEmpty()? null : dynamicForm.get("login").toLowerCase();
			String senha = dynamicForm.get("password") == null || dynamicForm.get("password").trim().isEmpty()? null : Seguranca.md5(dynamicForm.get("password"));
			
			if (email == null || senha == null) {
				flash("erro", "Preencha todos os campos");

			} else {
				UsuarioSmart u = SmartEducDatabase.selectUsuarioSmart(email);

				if (u == null) {
					flash("erro", "Usuário não cadastrado");
					
				} else if(!u.getSenha().equals(senha)){
					flash("erro", "Senha inválida");
					
				}else{
					session().clear();
					session().put(Constantes.SESSION_USUARIO, u.getId() +"");
					return redirect(routes.SmartEducController.index());
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - SmartEducController/login(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao logar. Tente novamente mais tarde");
		}
		return redirect(routes.SmartEducController.login());
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result cadastrarCliente() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String telefone = dynamicForm.get("phone") == null || dynamicForm.get("phone").trim().isEmpty()? null : dynamicForm.get("phone");
			String endereco = dynamicForm.get("address") == null || dynamicForm.get("address").trim().isEmpty()? null : dynamicForm.get("address");
			String cnpj = dynamicForm.get("cnpj") == null || dynamicForm.get("cnpj").trim().isEmpty()? null : dynamicForm.get("cnpj");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			int licenca = dynamicForm.get("license") == null || Integer.parseInt(dynamicForm.get("license")) == -1? -1 : Integer.parseInt(dynamicForm.get("license"));
			
			String senha = Seguranca.gerarSenha(6);
			ELicenca eLicenca = ELicencaUtil.getELicenca(licenca);
			
			if (nome == null || telefone == null || endereco == null || cnpj == null || email == null || eLicenca == null) {
				flash("erro", "Preencha todos os campos");
			}else{
				Instituicao ic = InstituicaoDatabase.selectInstituicaoByCnpj(cnpj);
				Instituicao ie = InstituicaoDatabase.selectInstituicaoByEmail(email);
				if (ic == null && ie == null){
					ic = new Instituicao(cnpj, nome, telefone, endereco, email, eLicenca, Seguranca.md5(senha), Constantes.STATUS_AGUARDANDO);
					Mail.sendMail(email, "Bem-vindo, "+nome+"!", 
							views.html.instituicao.email.render(ic, senha, request().host(), 0).toString());
					
					JPA.em().persist(ic);
					
				}else if(ic == null && ie != null){
					flash("erro", "Email já cadastrado");
					
				}else if(ic != null && (ie == null || ie.getEmail().equals(email)) && ic.getStatus() == Constantes.STATUS_REMOVIDO){
					ic.setNome(nome);
					ic.setTelefone(telefone);
					ic.setEndereco(endereco);
					ic.setLicenca(eLicenca);
					ic.setEmail(email);
					ic.setSenha(Seguranca.md5(senha));
					ic.setStatus(Constantes.STATUS_AGUARDANDO);
					Mail.sendMail(email, "Bem-vindo de volta, "+nome+"!", 
							views.html.instituicao.email.render(ic, senha, request().host(), 0).toString());
						
					JPA.em().merge(ic);
				}else{
					flash("erro", "Instituição já cadastrada");
				}
			}
		} catch (Exception e) {
			Logger.error("ERRO - SmartEducController/cadastrarCliente(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao cadastrar. Tente novamente mais tarde");
		}
		
		return redirect(routes.SmartEducController.index());
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result formEditarCliente() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest();
			String cnpj = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? null : dynamicForm.get("cod");
			if(cnpj == null){
				Logger.error("ERRO - SmartEducController/formEditarCliente(): CNPJ is null");
			}else{
				Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(cnpj);
				return ok(views.html.smarteduc.ajax.formEditarInstituicao.render(i));
			}
		} catch (Exception e) {
			Logger.error("ERRO - SmartEducController/formEditarCliente(): "+ e.getMessage());
		}
		return ok("Ocorreu um erro ao editar. Tente novamente mais tarde");
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result editarCliente() {
		try {
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String cnpj = dynamicForm.get("cnpj") == null || dynamicForm.get("cnpj").trim().isEmpty()? null : dynamicForm.get("cnpj");
			String nome = dynamicForm.get("name") == null || dynamicForm.get("name").trim().isEmpty()? null : dynamicForm.get("name");
			String telefone = dynamicForm.get("phone") == null || dynamicForm.get("phone").trim().isEmpty()? null : dynamicForm.get("phone");
			String endereco = dynamicForm.get("address") == null || dynamicForm.get("address").trim().isEmpty()? null : dynamicForm.get("address");
			String email = dynamicForm.get("email") == null || dynamicForm.get("email").trim().isEmpty()? null : dynamicForm.get("email").toLowerCase();
			int licenca = dynamicForm.get("license") == null || Integer.parseInt(dynamicForm.get("license")) == -1? -1 : Integer.parseInt(dynamicForm.get("license"));
			boolean generate = dynamicForm.get("generate") == null || dynamicForm.get("generate").trim().isEmpty()? false : true;

			boolean isEditado = false;
			boolean isSenhaAlterada = false;
			boolean isEmailAlterado = false;
			String senha = null;
			
			if(cnpj != null){
				ELicenca elicenca = ELicencaUtil.getELicenca(licenca);
				
				if (nome == null || telefone == null || endereco == null || email == null || elicenca == null) {				
					flash("erro", "Preencha todos os campos");
				}else{
					Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(cnpj);
					if(i != null){
						
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
						if(i.getLicenca() != elicenca){
							i.setLicenca(elicenca);
							isEditado = true;
						}
						if(generate){
							senha = Seguranca.gerarSenha(6);
							i.setSenha(Seguranca.md5(senha)); 
							isEditado = true;
							isSenhaAlterada = true;
						}
						if(!i.getEmail().equals(email)){
							Instituicao ie = InstituicaoDatabase.selectInstituicaoByEmail(email);
							if(ie == null){
								i.setEmail(email);
								i.setStatus(Constantes.STATUS_AGUARDANDO);
								isEditado = true;
								isEmailAlterado = true;
							}else{
								flash("erro", "Email já cadastrado");
								isEditado = false;
								isSenhaAlterada = false;
								isEmailAlterado = false;
							}
						}
					}else{
						flash("erro", "Cliente não encontrado");
					}
					
					if(isEmailAlterado && !isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email", views.html.instituicao.email.render(i, "", request().host(), 1).toString());
					}else if(!isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Senha", views.html.instituicao.email.render(i, senha, request().host(), 2).toString());
					}else if(isEmailAlterado && isSenhaAlterada){
						Mail.sendMail(email, "Alteração de Email e Senha", views.html.instituicao.email.render(i, senha, request().host(), 3).toString());
					}
					
					if(isEditado){
						JPA.em().merge(i);
						flash("ok", nome+" Editado");
					}
				}
			}else{
				flash("erro", "Informe o CNPJ do cliente");
			}
		} catch (Exception e) {
			Logger.error("ERRO - SmartEducController/editarCliente(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao editar. Tente novamente mais tarde");
		}
		
		return redirect(routes.SmartEducController.index());
	}
	
	@Transactional
	@With({ UsuarioSmartInterceptor.class })
	public static Result removerCliente() {
		try{
			DynamicForm dynamicForm = form().bindFromRequest(); //receber campos do HTML
			String cnpj = dynamicForm.get("cod") == null || dynamicForm.get("cod").trim().isEmpty()? null : dynamicForm.get("cod");
			
			if(cnpj != null){
				Instituicao i = InstituicaoDatabase.selectInstituicaoByCnpj(cnpj);
				if(i != null){
					i.setStatus(Constantes.STATUS_REMOVIDO);
					JPA.em().merge(i);
					flash("ok", i.getNome()+" Removido");
				}
			}else{
				flash("erro", "Informe o CNPJ do cliente");
			}
		}catch(Exception e){
			Logger.error("ERRO - SmartEducController/removerCliente(): "+ e.getMessage());
			flash("erro", "Ocorreu um erro ao remover. Tente novamente mais tarde");
		}
		return redirect(routes.SmartEducController.index());
	}
}
