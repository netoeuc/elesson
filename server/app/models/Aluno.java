package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;


@Entity
public class Aluno {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "cnpjInst")
	private String cnpjInst;
	
	@Column(nullable = false)
	@Index(name = "idProfessor")
	private int idProfessor;
	
	@Column(nullable = false)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
	public Aluno(){}
	
	public Aluno(String cnpjInst, int idProfessor, String email, String nome, String senha, int status) {
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
		this.email = email;
		this.nome = nome;
		this.senha = senha;
		this.status = status;
	}
	
	public Aluno(int id, String cnpjInst, int idProfessor, String email, String nome, String senha, int status) {
		this.id = id;
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
		this.email = email;
		this.nome = nome;
		this.senha = senha;
		this.status = status;
	}

	public String getCnpjInst() {
		return cnpjInst;
	}

	public void setCnpjInst(String cnpjInst) {
		this.cnpjInst = cnpjInst;
	}

	public int getIdProfessor() {
		return idProfessor;
	}

	public void setIdProfessor(int idProfessor) {
		this.idProfessor = idProfessor;
	}

	public int getId() {
		return id;
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
