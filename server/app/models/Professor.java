package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;

@Entity
public class Professor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false)
	@Index(name = "cnpjInst")
	private String cnpjInst;
	
	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
	public Professor(){}
	
	public Professor(String cnpjInst, String nome, String email, String senha, int status) {
		this.cnpjInst = cnpjInst;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
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
