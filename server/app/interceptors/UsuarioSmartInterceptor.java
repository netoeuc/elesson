package interceptors;

import play.db.jpa.Transactional;
import play.mvc.Action;
import play.mvc.Http.Context;
import play.mvc.Result;
import controllers.SmartEducController;
import controllers.routes;

public class UsuarioSmartInterceptor extends Action.Simple{
		
	@Transactional
	public static boolean userSessionExists(){
		return SmartEducController.isAutentico();
	}
	
	@Override @Transactional
	public Result call(Context ctx) throws Throwable{
		// verificar session do usuário
		if(userSessionExists()){
			// se possuir uma sessão válida
			return delegate.call(ctx); // chame o método do controller
		}else{
			// senão, redirecione para a página de login.
			return redirect(routes.SmartEducController.login());
		}
	}
}
