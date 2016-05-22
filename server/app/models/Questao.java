package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;


@Entity
public class Questao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "questao")
	private String questao;

	@Column(nullable = false)
	@Index(name = "resposta1")
	private String resposta1;
	
	@Column(nullable = false)
	@Index(name = "resposta2")
	private String resposta2;
	
	@Column(nullable = false)
	@Index(name = "resposta3")
	private String resposta3;
	
	@Column(nullable = false)
	@Index(name = "resposta4")
	private String resposta4;
	
	@Column(nullable = false)
	@Index(name = "resposta5")
	private String resposta5;
	
	@Column(nullable = false)
	@Index(name = "respostaCorreta")
	private String respostaCorreta;
	
	@Column(nullable = false)
	@Index(name = "level")
	private int level;
	
	@Column(nullable = false)
	@Index(name = "cnpjInst")
	private String cnpjInst;
	
	@Column(nullable = false)
	@Index(name = "idProfessor")
	private int idProfessor;
	
	public Questao(){}
	
	public Questao(String questao, String resposta1, String resposta2, String resposta3, String resposta4, String resposta5, String respostaCorreta, int level, String cnpjInst, int idProfessor) {
		this.questao = questao;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.respostaCorreta = respostaCorreta;
		this.level = level;
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
	}
	
	public Questao(int id, String questao, String resposta1, String resposta2, String resposta3, String resposta4, String resposta5, String respostaCorreta, int level, String cnpjInst, int idProfessor) {
		this.id = id;
		this.questao = questao;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.respostaCorreta = respostaCorreta;
		this.level = level;
		this.cnpjInst = cnpjInst;
		this.idProfessor = idProfessor;
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

	public String getRespostaCorreta() {
		return respostaCorreta;
	}

	public void setRespostaCorreta(String respostaCorreta) {
		this.respostaCorreta = respostaCorreta;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
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
	
}
