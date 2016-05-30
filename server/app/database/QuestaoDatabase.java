package database;

import java.util.List;

import models.Aluno;
import models.Questao;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;

public class QuestaoDatabase {
	
	@Transactional
	public static List<Questao> selectQuestoesByInstituicao(String cnpjInst)throws Exception{
		String query = "FROM Questao WHERE cnpjInst = :cnpjInst";
		List<Questao> lq = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		return lq;
	}
	
	@Transactional
	public static List<Questao> selectQuestoesByProfessorId(int idProfessor)throws Exception{
		String query = "FROM Questao WHERE idProfessor = :idProfessor";
		List<Questao> lq = JPA.em().createQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		return lq;
	}
	
	@Transactional
	public static Questao selectQuestaoById(int id)throws Exception{
		String query = "FROM Questao WHERE id = :id";
		List<Questao> lq = JPA.em().createQuery(query)
								.setParameter("id", id)
								.getResultList();
		if(lq.isEmpty()){
			return null;
		}else{
			return lq.get(0);
		}
	}

	public static List<Questao> selectQuestoesByAluno(String cnpjInst, int idProfessor, int idAluno, int level) {
		String query = "SELECT * FROM Questao q "
				+ "WHERE q.cnpjInst = :cnpjInst "
				+ "AND q.idProfessor = :idProfessor "
				+ "AND q.level = :level "
				+ "AND q.id NOT IN ("
				+ "		SELECT r.idQuestao FROM Resposta r WHERE r.idAluno = :idAluno"
				+ ")";
		List<Questao> lq = JPA.em().createNativeQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.setParameter("idProfessor", idProfessor)
								.setParameter("level", level)
								.setParameter("idAluno", idAluno)
								.getResultList();
		return lq;
	}
	
	@Transactional
	public static Questao selectQuestao(int cod, int idProfessor, String cnpjInst)throws Exception{
		String query = "FROM Questao WHERE id = :cod AND idProfessor = :idProfessor AND cnpjInst = :cnpjInst";
		List<Questao> lq = JPA.em().createQuery(query)
								.setParameter("cod", cod)
								.setParameter("idProfessor", idProfessor)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(lq.isEmpty()){
			return null;
		}else{
			return lq.get(0);
		}
	}
	
	@Transactional
	public static int selectTotalQuestoesByProfessorId(int idProfessor)throws Exception{
		String query = "FROM Questao WHERE idProfessor = :idProfessor";
		List<Questao> lq = JPA.em().createQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		if(lq.isEmpty()){
			return 0;
		}else{
			return lq.size();
		}
	}

	@Transactional
	public static void deleteQuestao(Questao q)throws Exception{
		JPA.em().remove(q);
	}
	
}
