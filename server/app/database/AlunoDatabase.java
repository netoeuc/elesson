package database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import util.Constantes;
import models.Aluno;

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
	public static HashMap<HashMap<String, String>, List<Aluno>> selectAlunosByProfessorByCnpjInst(String cnpjInst) throws Exception {	
		String query = "SELECT professor.nome as nomeProfessor, aluno.* "
					+ "FROM aluno "
					+ "INNER JOIN professor ON (professor.id = aluno.idProfessor) "
					+ "WHERE professor.cnpjInst = :cnpjInst "
					+ "ORDER BY professor.id ASC";
		List<Object> lo = JPA.em().createNativeQuery(query)
    			.setParameter("cnpjInst", cnpjInst)
    			.getResultList();
		
		HashMap<HashMap<String, String>, List<Aluno>> map = new HashMap<HashMap<String, String>, List<Aluno>>();
		HashMap<String, String> mapProf = null;
		Aluno a = null;
		for (Object object : lo) {
			Object[] itens = (Object[]) object;
			a = new Aluno((Integer)itens[1], cnpjInst, (Integer)itens[4], (String)itens[3], (String)itens[5], (String)itens[6], (Integer)itens[7]);
			
			mapProf = new HashMap<String, String>();
			mapProf.put("idProfessor", a.getIdProfessor()+"");
			mapProf.put("nomeProfessor", (String)itens[0]);
			
			if(map.containsKey(mapProf)){
				map.get(mapProf).add(a);
			}else{
				map.put(mapProf, new ArrayList<Aluno>());
				map.get(mapProf).add(a);
			}
		}
		return map;
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
}
