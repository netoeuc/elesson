package models;

public class AlunoRanking {

	private int id;
	private String nome;
	private int level;
	private int pontuacao;
	private int posicao;
		
	public AlunoRanking(int id, String nome, int level, int pontuacao, int rank) {
		this.id = id;
		this.nome = nome;
		this.level = level;
		this.pontuacao = pontuacao;
		this.posicao = rank;
	}

	public int getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public int getLevel() {
		return level;
	}

	public int getPosicao() {
		return posicao;
	}
}
