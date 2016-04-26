package models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

class Compositekey implements Serializable{
	private static final long serialVersionUID = -5549360561126237205L;
	private String email;
	private String cnpjInst;
}

@Entity
@IdClass(Compositekey.class)
public class Professor {
	
	@Id
	private String email;
	
	@Id
	private String cnpjInst;
	
	@Column(nullable = false)
	private String nome;

	@Column
	private String senha;
	
	@Column
	private int status;
	
	public Professor(){}
	
	public Professor(String nome, String email, String senha, int status) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.status = status;
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

	public void setSenha(String senha) {
		this.senha = senha;
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
