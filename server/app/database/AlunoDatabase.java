package database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
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
	public static List<Aluno> selectAluno()throws Exception{
		String query = "FROM Aluno";
		List<Aluno> li = JPA.em().createQuery(query)
								.getResultList();
		return li;
	}
	
	@Transactional
	public static HashMap<HashMap<String, String>, List<Aluno>> selectAlunosByProfessorByCnpjInst(String cnpjInst) {	
		String query = "SELECT professor.id as idProfessor, professor.nome as nomeProfessor, aluno.* "
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
			a = new Aluno((Integer)itens[6], cnpjInst, (Integer)itens[0], (String)itens[2], (String)itens[3], (String)itens[4], (Integer)itens[5]);
			
			mapProf = new HashMap<String, String>();
			mapProf.put("idProfessor", a.getIdProfessor()+"");
			mapProf.put("nomeProfessor", (String)itens[1]);
			
			if(map.containsKey(mapProf)){
				map.get(mapProf).add(a);
			}else{
				map.put(mapProf, new ArrayList<Aluno>());
				map.get(a.getIdProfessor()).add(a);
			}
		}
		return map;
	}
}
