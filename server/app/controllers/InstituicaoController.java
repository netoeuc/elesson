package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import views.html.instituicao.*;

public class InstituicaoController extends Controller{
	
	public static Result index(){
		return ok(login.render());
	}
	
	public static Result login(){
		return ok(login.render());
	}
}
