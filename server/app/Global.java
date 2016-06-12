import play.*;
import play.mvc.Result;
import play.mvc.Results;
import play.mvc.Http.RequestHeader;

public class Global extends GlobalSettings {

	@Override
	public Result onHandlerNotFound(RequestHeader request) {
		return Results.notFound(views.html.error404.render("Page not found", request.uri()));
	}
	
	@Override
	public Result onError(RequestHeader request, Throwable throwable) {
		throwable.printStackTrace();
		return Results.notFound(views.html.error404.render("Sorry, something wrong happened", request.uri()));
	}
}