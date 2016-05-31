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

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.node.ObjectNode;
import org.hibernate.annotations.Index;

import util.AdminJson;

@Entity
public class Questao implements Serializable {

	private static final long serialVersionUID = 2L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idQuestao")
	private int id;
	
	@Column(nullable = false)
	@Index(name = "questao")
	private String questao;

	@Column(nullable = false)
	private String resposta1;
	
	@Column(nullable = false)
	private String resposta2;
	
	@Column(nullable = false)
	private String resposta3;
	
	@Column(nullable = false)
	private String resposta4;
	
	@Column(nullable = false)
	private String resposta5;
	
	@Column(nullable = false)
	private char respostaCorreta;
	
	@Column(nullable = false)
	@Index(name = "level")
	private int level;
	
	@ManyToOne
	@JoinColumn(name="cnpjInst")
	@JsonIgnore
	private Instituicao instituicao;
	
	@ManyToOne
	@JoinColumn(name="idProfessor")
	@JsonIgnore
	private Professor professor;
	
	@OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	@JoinColumn(name="idQuestao")
	@JsonIgnore
	private List<Resposta> respostas;
	
	public Questao(){}
	
	public Questao(Instituicao instituicao, Professor professor, String questao, String resposta1, String resposta2, String resposta3, String resposta4, String resposta5, char respostaCorreta, int level) {
		this.instituicao = instituicao;
		this.professor = professor;
		this.questao = questao;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.respostaCorreta = respostaCorreta;
		this.level = level;
	}
	
	public Questao(int id, Instituicao instituicao, Professor professor, String questao, String resposta1, String resposta2, String resposta3, String resposta4, String resposta5, char respostaCorreta, int level) {
		this.id = id;
		this.instituicao = instituicao;
		this.professor = professor;
		this.questao = questao;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.respostaCorreta = respostaCorreta;
		this.level = level;
	}
	
	public Questao(int id, int level, String questao, String resposta1, String resposta2,
			String resposta3, String resposta4, String resposta5,
			char respostaCorreta) {
		this.id = id;
		this.questao = questao;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.respostaCorreta = respostaCorreta;
		this.level = level;
	}

	@JsonIgnore
	public static ObjectNode isRespondida(boolean isRespondida) {
		return AdminJson.getObject(isRespondida, "isRespondida");
	}
	
	public String getQuestao() {
		return questao;
	}

	public void setQuestao(String questao) {
		this.questao = questao;
	}

	public String getResposta1() {
		return resposta1;
	}

	public void setResposta1(String resposta1) {
		this.resposta1 = resposta1;
	}

	public String getResposta2() {
		return resposta2;
	}

	public void setResposta2(String resposta2) {
		this.resposta2 = resposta2;
	}

	public String getResposta3() {
		return resposta3;
	}

	public void setResposta3(String resposta3) {
		this.resposta3 = resposta3;
	}

	public String getResposta4() {
		return resposta4;
	}

	public void setResposta4(String resposta4) {
		this.resposta4 = resposta4;
	}

	public String getResposta5() {
		return resposta5;
	}

	public void setResposta5(String resposta5) {
		this.resposta5 = resposta5;
	}

	public char getRespostaCorreta() {
		return respostaCorreta;
	}

	public void setRespostaCorreta(char respostaCorreta) {
		this.respostaCorreta = respostaCorreta;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	@JsonIgnore
	public String getCnpjInst() {
		return instituicao.getCnpj();
	}

	@JsonIgnore
	public int getIdProfessor() {
		return professor.getId();
	}

	public int getId() {
		return id;
	}

	@JsonIgnore
	public List<Resposta> getRespostas() {
		return respostas;
	}

	@JsonIgnore
	public Professor getProfessor() {
		return professor;
	}
}
