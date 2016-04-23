package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import views.html.professor.*;

public class ProfessorController extends Controller{
	
	public static Result index(){
		return ok(index.render());
	}
	
	public static Result login(){
		return ok(login.render());
	}
	
	public static Result alunos(){
		return ok(alunos.render());
	}
	
	public static Result salas(){
		return ok(salas.render());
	}
}
