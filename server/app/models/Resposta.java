package models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Resposta implements Serializable {

private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idResposta")
	private int id;

	@Column(nullable = false)
	private int pontuacao;
	
	@ManyToOne
	@JoinColumn(name="idAluno")
	private Aluno aluno;
	
	@ManyToOne
	@JoinColumn(name="idQuestao")
	private Questao questao;
	
	@ManyToOne
	@JoinColumn(name="idProfessor")
	private Professor professor;
	
	public Resposta(){}
	
	public Resposta(Professor professor, Questao questao, Aluno aluno, int pontuacao) {
		this.professor = professor;
		this.questao = questao;
		this.aluno = aluno;
		this.pontuacao = pontuacao;
	}

	public int getIdQuestao() {
		return questao.getId();
	}

	public int getIdAluno() {
		return aluno.getId();
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
