package database;

import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import models.Instituicao;

public class InstituicaoDatabase {
	
	@Transactional
	public static Instituicao selectInstituicaoByEmail(String email)throws Exception{
		String query = "FROM Instituicao WHERE email = :email";
		List<Instituicao> lus = JPA.em().createQuery(query)
								.setParameter("email", email)
								.getResultList();
		if(lus.isEmpty()){
			return null;
		}else{
			return lus.get(0);
		}
	}
	
	@Transactional
	public static Instituicao selectInstituicaoByCnpj(String cnpj)throws Exception{
		String query = "FROM Instituicao WHERE cnpj = :cnpj";
		List<Instituicao> li = JPA.em().createQuery(query)
								.setParameter("cnpj", cnpj)
								.getResultList();
		if(li.isEmpty()){
			return null;
		}else{
			return li.get(0);
		}
	}
	
	@Transactional
	public static List<Instituicao> selectInstituicao()throws Exception{
		String query = "FROM Instituicao";
		List<Instituicao> li = JPA.em().createQuery(query)
								.getResultList();
		return li;
	}
	
	@Transactional
	public static Instituicao selectInstituicaoByCnpjEmail(String cnpj, String email)throws Exception{
		String query = "FROM Instituicao WHERE cnpj = :cnpj AND email = :email";
		List<Instituicao> li = JPA.em().createQuery(query)
								.setParameter("cnpj", cnpj)
								.setParameter("email", email)
								.getResultList();
		if(li.isEmpty()){
			return null;
		}else{
			return li.get(0);
		}
	}
}
