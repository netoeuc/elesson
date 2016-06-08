package database;

import java.math.BigInteger;
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
	public static int selectTotalRespostasByAluno(int idAluno) {
		String query = "SELECT COUNT(*) FROM Resposta WHERE idAluno = :idAluno";
		List<BigInteger> bi = JPA.em().createNativeQuery(query)
				.setParameter("idAluno", idAluno)
				.getResultList();

		return bi.get(0).intValue();
	}
	
	@Transactional
	public static int selectTotalRespostasByProfessor(int idProfessor) {
		String query = "SELECT COUNT(*) FROM Resposta WHERE idProfessor = :idProfessor";
		List<BigInteger> bi = JPA.em().createNativeQuery(query)
				.setParameter("idProfessor", idProfessor)
				.getResultList();

		return bi.get(0).intValue();
	}
	
	@Transactional
	public static void deteleResposta(Resposta r)throws Exception{
		JPA.em().remove(r);
	}

	@Transactional
	public static void deteleRespostasByProfessor(int idProfessor) {
		String query = "DELETE FROM Resposta WHERE idProfessor = :idProfessor";
		JPA.em().createNativeQuery(query)
			.setParameter("idProfessor", idProfessor)
			.executeUpdate();
	}

	public static Resposta selectRespostaByQuestaoAndAluno(int idQuestao, int idAluno) {
		String query = "FROM Resposta WHERE idQuestao = :idQuestao AND idAluno = :idAluno";
		List<Resposta> lr = JPA.em().createQuery(query)
								.setParameter("idQuestao", idQuestao)
								.setParameter("idAluno", idAluno)
								.getResultList();
		
		if(lr == null || lr.isEmpty()){
			return null;
		}
		return lr.get(0);
	}
		
}
