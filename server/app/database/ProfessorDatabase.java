package database;

import java.math.BigInteger;
import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import util.Constantes;
import models.Professor;

public class ProfessorDatabase {
	
	@Transactional
	public static Professor selectProfessor(int id, String cnpjInst)throws Exception{
		String query = "FROM Professor WHERE id = :id AND cnpjInst = :cnpjInst";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("id", id)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(lp.isEmpty()){
			return null;
		}else{
			return lp.get(0);
		}
	}
	
	@Transactional
	public static Professor selectProfessor(String email, String cnpjInst)throws Exception{
		String query = "FROM Professor WHERE email = :email AND cnpjInst = :cnpjInst";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("email", email)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(lp.isEmpty()){
			return null;
		}else{
			return lp.get(0);
		}
	}
	
	@Transactional
	public static List<Professor> selectProfessoresByCnpjInst(String cnpjInst)throws Exception{
		String query = "FROM Professor WHERE cnpjInst = :cnpjInst AND status != :status";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.setParameter("status", Constantes.STATUS_REMOVIDO)
								.getResultList();
		return lp;
	}
	
	@Transactional
	public static Professor selectProfessorByEmail(String email)throws Exception{
		String query = "FROM Professor WHERE email = :email";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("email", email)
								.getResultList();
		if(lp.isEmpty()){
			return null;
		}else{
			return lp.get(0);
		}
	}
	
	@Transactional
	public static List<Professor> selectProfessor()throws Exception{
		String query = "FROM Professor";
		List<Professor> li = JPA.em().createQuery(query)
								.getResultList();
		return li;
	}
	
	@Transactional
	public static Professor selectProfessorById(long id)throws Exception{
		String query = "FROM Professor WHERE id = :id";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("id", id)
								.getResultList();
		if(lp.isEmpty()){
			return null;
		}else{
			return lp.get(0);
		}
	}

	@Transactional
	public static Professor selectProfessorEncrypt(String cnpj, String email) {
		String query = "FROM Professor WHERE SHA1(MD5(email)) = :email AND SHA1(MD5(cnpjInst)) = :cnpjInst";
		List<Professor> lp = JPA.em().createQuery(query)
								.setParameter("email", email)
								.setParameter("cnpjInst", cnpj)
								.getResultList();
		if(lp.isEmpty()){
			return null;
		}else{
			return lp.get(0);
		}
	}
	
	@Transactional
	public static int selectCountAlunos(int idProfessor) {
		String query = "SELECT COUNT(*) FROM Aluno WHERE idProfessor = :idProfessor";
		List<BigInteger> bi = JPA.em().createNativeQuery(query)
				.setParameter("idProfessor", idProfessor)
				.getResultList();

		return bi.get(0).intValue();
	}
	
	@Transactional
	public static int selectCountQuestoes(int idProfessor) {
		String query = "SELECT COUNT(*) FROM Questao WHERE idProfessor = :idProfessor";
		List<BigInteger> bi = JPA.em().createNativeQuery(query)
				.setParameter("idProfessor", idProfessor)
				.getResultList();

		return bi.get(0).intValue();
	}
	
	@Transactional
	public static void deleteProfessor(Professor p)throws Exception{
		JPA.em().remove(p);
	}
}
