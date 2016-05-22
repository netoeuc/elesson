package util;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.math.BigInteger;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.util.Random;

import org.apache.commons.codec.digest.DigestUtils;

public class Seguranca {
	
	public static String md5(String string) throws Exception{  
		String srt = DigestUtils.md5Hex(string);
	    for(int i = srt.length(); i < 32; i++) {
	    	srt = "0"+srt;
	    }
	    return srt;  
    }
	
	public static String sha1(String string) throws Exception{
		String srt = DigestUtils.shaHex(string);
	    for (int i = srt.length(); i < 40; i++) {
	    	srt = "0"+srt;
	    }
	    return srt; 
	}
	
	public static String encryptString(String string) throws Exception{
		return sha1(md5(string));
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
