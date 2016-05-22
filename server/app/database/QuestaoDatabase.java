package database;

import java.util.List;

import models.Aluno;
import models.Questao;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;

public class QuestaoDatabase {
		
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
	
}
