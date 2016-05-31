import play.*;
import play.mvc.Result;
import play.mvc.Results;
import play.mvc.Http.RequestHeader;

public class Global extends GlobalSettings {

	@Override
	public Result onHandlerNotFound(RequestHeader request) {
		return Results.notFound(views.html.error404.render("Página não encontrada", request.uri()));
	}
	
	@Override
	public Result onError(RequestHeader request, Throwable throwable) {
		throwable.printStackTrace();
		return Results.notFound(views.html.error404.render("Desculpe, ocorreu um erro inesperado", request.uri()));
	}
}