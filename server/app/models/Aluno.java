package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.node.ObjectNode;
import org.hibernate.annotations.Index;

import util.AdminJson;
import util.Seguranca;


@Entity
public class Aluno {
		
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "cnpjInst")
	@JsonIgnore
	private String cnpjInst;
	
	@Column(nullable = false)
	@Index(name = "idProfessor")
	@JsonIgnore
	private int idProfessor;
	
	@Column(nullable = false, length = 75)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false, length = 75)
	private String nome;
	
	@Column(length = 12)
	private String username;

	@Column(nullable = false, length = 75)
	@JsonIgnore
	private String senha;
	
	@Column(nullable = false)
	@JsonIgnore
	private int status;
	
	@Column(nullable = false)
	private int level;
	
	@Column(nullable = false)
	@Index(name = "pontuacao")
	private int pontuacao;
	
	@Column(nullable = false)
	private boolean isLogado;
	
	public Aluno(){}
	
	public Aluno(String cnpjInst, int idProfessor, String email, String nome, String senha, int status) throws Exception {
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
		this.email = email;
		this.nome = nome;
		this.senha = Seguranca.encryptString(senha);
		this.status = status;
		this.level = 1;
		this.pontuacao = 0;
		this.username = null;
		this.isLogado = false;
	}
	
	public Aluno(int id, String cnpjInst, int idProfessor, String email, String nome, String senha, int status) throws Exception {
		this.id = id;
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
		this.email = email;
		this.nome = nome;
		this.senha = Seguranca.encryptString(senha);
		this.status = status;
		this.level = 1;
		this.pontuacao = 0;
		this.username = null;
		this.isLogado = false;
	}
	
	public static ObjectNode isLogado(boolean isLogado) {
		return AdminJson.getObject(isLogado, "isLogado");
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

	public void setSenha(String senha) throws Exception{
		this.senha = Seguranca.encryptString(senha);
	}
	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(int pontuacao) {
		this.pontuacao = pontuacao;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public boolean isLogado() {
		return isLogado;
	}

	public void setLogado(boolean isLogado) {
		this.isLogado = isLogado;
	}
}
