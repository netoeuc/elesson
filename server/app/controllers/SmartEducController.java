package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import views.html.smarteduc.*;

public class SmartEducController extends Controller{
	
	public static Result index(){
		return ok(index.render());
	}
	
	public static Result login(){
		return ok(login.render());
	}
}
