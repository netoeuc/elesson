package database;

import java.util.List;

import models.Resposta;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;

public class RespostaDatabase {
	
	@Transactional
	public static List<Resposta> selectRespostasByQuestao(int idQuestao)throws Exception{
		String query = "FROM Resposta WHERE id = :idQuestao";
		List<Resposta> lr = JPA.em().createQuery(query)
								.setParameter("idQuestao", idQuestao)
								.getResultList();
		return lr;
	}
	
	@Transactional
	public static List<Resposta> selectRespostasByAluno(int idAluno) {
		String query = "FROM Resposta WHERE idAluno = :idAluno";
		List<Resposta> lr = JPA.em().createQuery(query)
								.setParameter("idAluno", idAluno)
								.getResultList();
		return lr;
	}
	
	@Transactional
	public static void deteleResposta(Resposta r)throws Exception{
		JPA.em().remove(r);
	}
		
}
