package util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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
	
}
