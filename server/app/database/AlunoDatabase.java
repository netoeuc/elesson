package database;

import java.util.List;

import models.Aluno;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import util.Constantes;

public class AlunoDatabase {
	
	@Transactional
	public static Aluno selectAlunoByEmail(String email)throws Exception{
		String query = "FROM Aluno WHERE email = :email";
		List<Aluno> lus = JPA.em().createQuery(query)
								.setParameter("email", email)
								.getResultList();
		if(lus.isEmpty()){
			return null;
		}else{
			return lus.get(0);
		}
	}
	
	@Transactional
	public static Aluno selectAluno(String email, String cnpjInst)throws Exception{
		String query = "FROM Aluno WHERE email = :email AND cnpjInst = :cnpjInst";
		List<Aluno> la = JPA.em().createQuery(query)
								.setParameter("email", email)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(la.isEmpty()){
			return null;
		}else{
			return la.get(0);
		}
	}
	
	@Transactional
	public static Aluno selectAluno(int codA, int codP, String cnpjInst)throws Exception{
		String query = "FROM Aluno WHERE id = :codA AND idProfessor = :codP AND cnpjInst = :cnpjInst";
		List<Aluno> la = JPA.em().createQuery(query)
								.setParameter("codA", codA)
								.setParameter("codP", codP)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(la.isEmpty()){
			return null;
		}else{
			return la.get(0);
		}
	}
	
	@Transactional
	public static List<Aluno> selectAlunos()throws Exception{
		String query = "FROM Aluno";
		List<Aluno> li = JPA.em().createQuery(query)
								.getResultList();
		return li;
	}
	
	@Transactional
	public static Aluno selectAlunoById(int id)throws Exception{
		String query = "FROM Aluno WHERE id = :id";
		List<Aluno> la = JPA.em().createQuery(query)
								.setParameter("id", id)
								.getResultList();
		if(la.isEmpty()){
			return null;
		}else{
			return la.get(0);
		}
	}
	
	@Transactional
	public static List<Aluno> selectAlunosByProfessorId(int idProfessor )throws Exception{
		String query = "FROM Aluno WHERE idProfessor = :idProfessor";
		List<Aluno> lus = JPA.em().createQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		return lus;
	}
	
	@Transactional
	public static List<Aluno> selectAlunosByCnpjInst(String cnpjInst)throws Exception{
		String query = "FROM Aluno WHERE cnpjInst = :cnpjInst AND status != :status";
		List<Aluno> lp = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.setParameter("status", Constantes.STATUS_REMOVIDO)
								.getResultList();
		return lp;
	}
		
	@Transactional
	public static Aluno selectAlunoEncrypt(String cnpjInst, String idProfessor, String email) {
		String query = "FROM Aluno WHERE SHA1(MD5(cnpjInst)) = :cnpjInst AND SHA1(MD5(idProfessor)) = :idProfessor AND SHA1(MD5(email)) = :email";
		List<Aluno> li = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.setParameter("email", email)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		if(li.isEmpty()){
			return null;
		}else{
			return li.get(0);
		}
	}

	@Transactional
	public static Aluno selectAlunoEncryptByEmail(String email) {
		String query = "FROM Aluno WHERE SHA1(MD5(email)) = :email";
		List<Aluno> li = JPA.em().createQuery(query)
								.setParameter("email", email)
								.getResultList();
		if(li.isEmpty()){
			return null;
		}else{
			return li.get(0);
		}
	}
	
	@Transactional
	public static void deleteAluno(Aluno a)throws Exception{
		JPA.em().remove(a);
	}
}
