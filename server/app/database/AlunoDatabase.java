package database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import models.Aluno;
import models.Instituicao;

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
	public static List<Aluno> selectAluno()throws Exception{
		String query = "FROM Aluno";
		List<Aluno> li = JPA.em().createQuery(query)
								.getResultList();
		return li;
	}
	
	@Transactional
	public static List<Aluno> selectAlunoByCnpjInst(String cnpjInst)throws Exception{
		String query = "FROM Aluno WHERE cnpjInst = :cnpjInst";
		List<Aluno> lp = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		return lp;
	}
	
	@Transactional
	public static HashMap<HashMap<String, String>, List<Aluno>> selectAlunosByProfessorByCnpjInst(String cnpjInst) {	
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
			a = new Aluno((Integer)itens[5], cnpjInst, (Integer)itens[7], (String)itens[1], (String)itens[2], (String)itens[3], (Integer)itens[4]);
			
			mapProf = new HashMap<String, String>();
			mapProf.put("idProfessor", a.getIdProfessor()+"");
			mapProf.put("nomeProfessor", (String)itens[0]);
			
			if(map.containsKey(mapProf)){
				map.get(mapProf).add(a);
			}else{
				map.put(mapProf, new ArrayList<Aluno>());
				map.get(a.getIdProfessor()).add(a);
			}
		}
		return map;
	}
	
	@Transactional
	public static Aluno selectAlunoMD5(String cnpjInst, String idProfessor, String email) {
		String query = "FROM Aluno WHERE MD5(cnpjInst) = :cnpjInst AND MD5(idProfessor) = :idProfessor AND MD5(email) = :email";
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
}
