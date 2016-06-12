package database;

import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import models.UsuarioSmart;

public class SmartEducDatabase {
	
	@Transactional
	public static UsuarioSmart selectUsuarioSmart(String email)throws Exception{
		String query = "FROM UsuarioSmart WHERE email = :email";
		List<UsuarioSmart> lus = JPA.em().createQuery(query)
								.setParameter("email", email)
								.getResultList();
		if(lus.isEmpty()){
			return null;
		}else{
			return lus.get(0);
		}
	}
	
	@Transactional
	public static UsuarioSmart selectUsuarioSmart(int id)throws Exception{
		String query = "FROM UsuarioSmart WHERE id = :id";
		List<UsuarioSmart> lus = JPA.em().createQuery(query)
								.setParameter("id", id)
								.getResultList();
		if(lus.isEmpty()){
			return null;
		}else{
			return lus.get(0);
		}
	}
}
