package util;


import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;
import play.mvc.BodyParser;

public class AdminJson {
	public static final String msgConsulteAPI = "informe os parâmetros corretamente.";
	public static final String msgErroRequest = "ocorreu um erro com a requisição";
	
	@BodyParser.Of(BodyParser.Json.class)
	public static ObjectNode getMensagem(String msg){
		ObjectNode result = Json.newObject();
		result.put("mensagem", msg);
		return result;
	}
	
	@BodyParser.Of(BodyParser.Json.class)
	public static ObjectNode getObject(Object o, String tipo){
		ObjectNode result = Json.newObject();
		new Json();
		JsonNode jn = Json.toJson(o);
		result.put(tipo, jn);
		return result;
	}
	
	@BodyParser.Of(BodyParser.Json.class)
	public static JsonNode getObject(Object o){
		return Json.toJson(o);
	}
	
}
