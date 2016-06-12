package models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Index;

import util.Seguranca;

@Entity
public class Professor implements Serializable {

private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idProfessor")
	private int id;
	
	@Column(nullable = false, length = 75)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false, length = 75)
	private String nome;

	@Column(nullable = false, length = 75)
	private String senha;
	
	@Column(nullable = false)
	private int status;
	
	@ManyToOne
	@JoinColumn(name="cnpjInst")
	private Instituicao instituicao;
	
	@OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	@JoinColumn(name="idProfessor")
	private List<Aluno> alunos;
	
	@OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	@JoinColumn(name="idProfessor")
	private List<Questao> questoes;
	
	public Professor(){}
	
	public Professor(Instituicao instituicao, String nome, String email, String senha, int status) throws Exception {
		this.instituicao = instituicao;
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
		return instituicao.getCnpj();
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	public List<Aluno> getAlunos() {
		return alunos;
	}
	
	public List<Questao> getQuestoes() {
		return questoes;
	}

	public Instituicao getInstituicao() {
		return instituicao;
	}
	
}
