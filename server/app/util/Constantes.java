package util;

import javax.swing.text.MaskFormatter;

public class Constantes {
	public static final String SESSION_USUARIO = "USMARTBUSITEA_SESS";
	public static final String SESSION_COD_INSTTEAC = "CNTEACOD_SESS";
	public static final String SESSION_COD_INSTTEACFOR = "CNTEACODFOR_SESS";
	
	public static final String EMAIL_SMARTEDUC = "smarteducbr@gmail.com";
	public static final String PASS_SMARTEDUC = "12345smarteduc";
	
	public static final int STATUS_AGUARDANDO = 0;
	public static final int STATUS_ATIVO = 1;
	public static final int STATUS_REMOVIDO = 2;
	
	public static final String USERNAME_MASCULINO1 = "Oliver";
	public static final String USERNAME_MASCULINO2 = "Johnny";
	public static final String USERNAME_FEMININO1 = "Beatrice";
	public static final String USERNAME_FEMININO2 = "Yasmin";
	
	public static String formatString(String value, String pattern) {
        MaskFormatter mf;
        try {
            mf = new MaskFormatter(pattern);
            mf.setValueContainsLiteralCharacters(false);
            return mf.valueToString(value);
        } catch (Exception ex) {
            return value;
        }
    }
	
}
