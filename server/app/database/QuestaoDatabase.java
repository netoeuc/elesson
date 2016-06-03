package database;

import java.util.ArrayList;
import java.util.List;

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

	@Transactional
	public static List<Questao> selectQuestoesByAluno(String cnpjInst, int idProfessor, int idAluno, int level) {
		if(level >= 1 && level <= 5){
			level = 1;
		}else if(level >= 6 && level <= 10){
			level = 2;
		}else if(level >= 11 && level <= 15){
			level = 3;
		}else{
			level = 4;
		}
		String query = "SELECT DISTINCT * FROM Questao q "
				+ "WHERE q.cnpjInst = :cnpjInst "
				+ "AND q.idProfessor = :idProfessor "
				+ "AND q.level = :level "
				+ "AND q.idQuestao NOT IN ("
				+ "SELECT r.idQuestao FROM Resposta r WHERE r.idAluno = :idAluno"
				+ ") "
				+ "ORDER BY RAND() LIMIT 5";
		
		List<Object> lo = JPA.em().createNativeQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.setParameter("idProfessor", idProfessor)
								.setParameter("level", level)
								.setParameter("idAluno", idAluno)
								.getResultList();
		
		List<Questao> lq = new ArrayList<Questao>();
		for (Object object : lo) {
			Object[] o = (Object[])object;
			Questao q = new Questao((Integer)o[0],
					(Integer)o[1],
					(String)o[2],
					(String)o[3],
					(String)o[4],
					(String)o[5],
					(String)o[6],
					(String)o[7],
					(Character)o[8]);
			lq.add(q);
		}
		
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
