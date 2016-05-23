package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;

import util.Seguranca;

@Entity
public class Professor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false, length = 75)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false)
	@Index(name = "cnpjInst")
	private String cnpjInst;
	
	@Column(nullable = false, length = 75)
	private String nome;

	@Column(nullable = false, length = 75)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
	public Professor(){}
	
	public Professor(String cnpjInst, String nome, String email, String senha, int status) throws Exception {
		this.cnpjInst = cnpjInst;
		this.nome = nome;
		this.email = email;
		this.senha = Seguranca.encryptString(senha);
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) throws Exception{
		this.senha = Seguranca.encryptString(senha);
	}

	public String getCnpjInst() {
		return cnpjInst;
	}

	public void setCnpjInst(String cnpjInst) {
		this.cnpjInst = cnpjInst;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
}
