package database;

import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import models.Professor;

public class ProfessorDatabase {
	
	@Transactional
	public static Professor selectProfessor(long id, String cnpjInst)throws Exception{
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

}
