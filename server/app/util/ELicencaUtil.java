package util;

public class ELicencaUtil {
	
	public static ELicenca getELicenca(int licenca)
	{
		ELicenca[] earray = ELicenca.values();
		if (licenca >= 0 && licenca <= earray.length)
			return ELicenca.values()[licenca];
		return null;
	}

}
