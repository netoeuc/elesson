package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.Index;

import util.ELicenca;
import util.Seguranca;

@Entity
public class Instituicao {
	
	@Id
	private String cnpj;
	
	@Column(nullable = false, length = 75)
	private String nome;
	
	@Column(nullable = false, length = 20)
	private String telefone;

	@Column(nullable = false, length = 75)
	private String endereco;

	@Column(nullable = false, length = 75)
	@Index(name = "email")
	private String email;

	@Column(nullable = false)
	private ELicenca licenca;

	@Column(nullable = false, length = 75)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
	public Instituicao(){}
	
	public Instituicao(String cnpj, String nome, String telefone,
			String endereco, String email, ELicenca licenca, String senha, int status) throws Exception {

		this.cnpj = cnpj;
		this.nome = nome;
		this.telefone = telefone;
		this.endereco = endereco;
		this.email = email;
		this.licenca = licenca;
		this.senha = Seguranca.encryptString(senha);
		this.status = status;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public ELicenca getLicenca() {
		return licenca;
	}

	public void setLicenca(ELicenca licenca) {
		this.licenca = licenca;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) throws Exception{
		this.senha = Seguranca.encryptString(senha);
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
		
}
