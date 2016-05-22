package database;

import java.util.List;

import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import util.Constantes;
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
	public static List<Instituicao> selectInstituicao(){
		String query = "FROM Instituicao WHERE status != :status";
		List<Instituicao> li = JPA.em().createQuery(query)
								.setParameter("status", Constantes.STATUS_REMOVIDO)
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
	
	@Transactional
	public static Instituicao selectInstituicaoByCnpjOrEmail(String cnpj, String email)throws Exception{
		String query = "FROM Instituicao WHERE cnpj = :cnpj OR email = :email";
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

	@Transactional
	public static Instituicao selectInstituicaoEncrypt(String cnpj, String email) {
		String query = "FROM Instituicao WHERE SHA1(MD5(cnpj)) = :cnpj AND SHA1(MD5(email)) = :email";
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
