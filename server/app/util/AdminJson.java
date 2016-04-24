package util;


import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;
import play.mvc.BodyParser;

public class AdminJson {
	public static final String msgConsulteAPI = "Informe os parâmetros corretamente. Consulte a documentação da API.";
	public static final String msgCadastreAPP = "Cadastre-se para usar esta função.";
	public static final String msgDeviceTokenInvalido = "deviceToken inválido.";
	public static final String msgValorMaiorZero = "Informe um valor maior que zero para o campo ";
	
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
	
}
