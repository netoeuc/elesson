package models;

import util.ELicenca;

public class Licenca {

	private int qntAlunos;
	private int qntTurmas;
	private int qntProfessores;
	private ELicenca licenca;
	
	public Licenca(int qntAlunos, int qntTurmas, int qntProfessores, ELicenca licenca) {
		super();
		this.qntAlunos = qntAlunos;
		this.qntTurmas = qntTurmas;
		this.qntProfessores = qntProfessores;
		this.licenca = licenca;
	}

	public int getQntAlunos() {
		return qntAlunos;
	}

	public void setQntAlunos(int qntAlunos) {
		this.qntAlunos = qntAlunos;
	}

	public int getQntTurmas() {
		return qntTurmas;
	}

	public void setQntTurmas(int qntTurmas) {
		this.qntTurmas = qntTurmas;
	}

	public int getQntProfessores() {
		return qntProfessores;
	}

	public void setQntProfessores(int qntProfessores) {
		this.qntProfessores = qntProfessores;
	}

	public ELicenca getLicenca() {
		return licenca;
	}

	public void setLicenca(ELicenca licenca) {
		this.licenca = licenca;
	}
	
	
}
