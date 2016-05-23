package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;


@Entity
public class Resposta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "idQuestao")
	private int idQuestao;
	
	@Column(nullable = false)
	@Index(name = "idAluno")
	private int idAluno;

	@Column(nullable = false)
	private int pontuacao;
	
	public Resposta(){}
	
	public Resposta(int idQuestao, int idAluno, int pontuacao) {
		this.idQuestao = idQuestao;
		this.idAluno = idAluno;
		this.pontuacao = pontuacao;
	}

	public int getIdQuestao() {
		return idQuestao;
	}

	public void setIdQuestao(int idQuestao) {
		this.idQuestao = idQuestao;
	}

	public int getIdAluno() {
		return idAluno;
	}

	public void setIdAluno(int idAluno) {
		this.idAluno = idAluno;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(int pontuacao) {
		this.pontuacao = pontuacao;
	}

	public int getId() {
		return id;
	}
	
}
