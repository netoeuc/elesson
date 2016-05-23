package util;

import models.Licenca;

public class ELicencaUtil {
	
	private static final Licenca test = new Licenca(5, 1, 1, ELicenca.TEST);
	private static final Licenca bronze = new Licenca(20, 2, 2, ELicenca.BRONZE);
	private static final Licenca silver = new Licenca(40, 4, 4, ELicenca.SILVER);
	private static final Licenca gold = new Licenca(70, 7, 7, ELicenca.GOLD);
	private static final Licenca premium = new Licenca(120, 10, 10, ELicenca.PREMIUM);
	
	public static ELicenca getELicenca(int licenca)
	{
		ELicenca[] earray = ELicenca.values();
		if (licenca >= 0 && licenca <= earray.length)
			return ELicenca.values()[licenca];
		return null;
	}
	
	public static Licenca getLicenca(ELicenca licenca){
		if (licenca == ELicenca.TEST) {
			return test;
			
		}else if (licenca == ELicenca.BRONZE) {
			return bronze;
			
		}else if (licenca == ELicenca.SILVER) {
			return silver;
			
		}else if (licenca == ELicenca.GOLD) {
			return gold;
			
		}else if (licenca == ELicenca.PREMIUM) {
			return premium;
			
		}else{
			return null;
		}
	}
	
	public static int getStatusLicenca(ELicenca licenca, int alunos, int professores){
		int soma = alunos + professores * 100;
		if (licenca == ELicenca.TEST) {
			return soma/(test.getQntAlunos()+test.getQntProfessores());
			
		}else if (licenca == ELicenca.BRONZE) {
			return soma/(bronze.getQntAlunos()+bronze.getQntProfessores());
			
		}else if (licenca == ELicenca.SILVER) {
			return soma/(silver.getQntAlunos()+silver.getQntProfessores());
			
		}else if (licenca == ELicenca.GOLD) {
			return soma/(gold.getQntAlunos()+gold.getQntProfessores());
			
		}else if (licenca == ELicenca.PREMIUM) {
			return soma/(premium.getQntAlunos()+premium.getQntProfessores());
			
		}else{
			return -1;
		}
	}

}
