package util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class Seguranca {
	
	public static String md5(String string){  
        String srt = "";  
        MessageDigest md = null;  
        try {  
            md = MessageDigest.getInstance("MD5");  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
        }  
        BigInteger hash = new BigInteger(1, md.digest(string.getBytes()));  
        srt = hash.toString(16);

        if(srt.length() < 32){
        	for (int i = srt.length(); i <= 32; i++) {
    			srt = "0"+srt;
    		}
        }
        return srt;  
    }
	
	public static String gerarSenha(int tamanho){
		String[] chars = {"0","1","2","3","4","5","6","7","8","9",
				"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
				"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
	    String senha = "";
	    Random rand = new Random();
	    
	    for (int i=0; i<tamanho; i++){
	        senha += chars[rand.nextInt(chars.length)];
	    }
	    return senha;
	}
	
}
