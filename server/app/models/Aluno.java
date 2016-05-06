package models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;


@Entity
public class Aluno {
	
	@Id
	private String email;
	
	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
public Aluno(){}
	
	public Aluno(String email, String nome, String senha, int status) {
		this.email = email;
		this.nome = nome;
		this.senha = senha;
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
}
