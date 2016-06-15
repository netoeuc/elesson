package database;

import java.util.ArrayList;
import java.util.List;

import models.Aluno;
import models.AlunoRanking;
import models.Professor;
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
	public static int selectTotalAlunosByProfessorId(int idProfessor)throws Exception{
		String query = "FROM Aluno WHERE idProfessor = :idProfessor";
		List<Aluno> lus = JPA.em().createQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		if(lus.isEmpty()){
			return 0;
		}else{
			return lus.size();
		}
	}
	
	@Transactional
	public static int selectTotalAlunosByCnpjInst(String cnpjInst)throws Exception{
		String query = "FROM Aluno WHERE cnpjInst = :cnpjInst";
		List<Aluno> lus = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		if(lus.isEmpty()){
			return 0;
		}else{
			return lus.size();
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
	public static List<Aluno> selectAlunosOrderPontuacaoByInstituicao(String cnpjInst) {
		String query = "FROM Aluno WHERE cnpjInst = :cnpjInst ORDER BY pontuacao DESC LIMIT 10";
		List<Aluno> li = JPA.em().createQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();

		return li;
	}
	
	@Transactional
	public static List<Aluno> selectAlunosOrderPontuacaoByProfessor(int idProfessor) {
		String query = "FROM Aluno WHERE idProfessor = :idProfessor ORDER BY pontuacao DESC LIMIT 10";
		List<Aluno> li = JPA.em().createQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();

		return li;
	}
	
	@Transactional
	public static List<AlunoRanking> selectAlunosRankingByInstituicao(String cnpjInst) {
		String query = "SELECT idAluno, nome, level, pontuacao, @curRank \\:= @curRank + 1 AS rank "
				+ "FROM Aluno a, (SELECT @curRank \\:= 0) r "
				+ "WHERE a.cnpjInst = :cnpjInst "
				+ "ORDER BY pontuacao DESC LIMIT 10";
		List<Object> lo = JPA.em().createNativeQuery(query)
								.setParameter("cnpjInst", cnpjInst)
								.getResultList();
		
		List<AlunoRanking> lar = new ArrayList<AlunoRanking>();
		for (Object object : lo) {
			Object[] itens = (Object[]) object;		
			lar.add(new AlunoRanking(
					(int)Double.parseDouble(""+itens[0]), 
					itens[1]+"", 
					(int)Double.parseDouble(""+itens[2]), 
					(int)Double.parseDouble(""+itens[3]), 
					(int)Double.parseDouble(""+itens[4])));
		}
		return lar;
	}
	
	@Transactional
	public static List<AlunoRanking> selectAlunosRankingByProfessor(int idProfessor) {
		String query = "SELECT idAluno, nome, level, pontuacao, @curRank \\:= @curRank + 1 AS rank "
				+ "FROM Aluno a, (SELECT @curRank \\:= 0) r "
				+ "WHERE a.idProfessor = :idProfessor "
				+ "ORDER BY pontuacao DESC LIMIT 10";
		List<Object> lo = JPA.em().createNativeQuery(query)
								.setParameter("idProfessor", idProfessor)
								.getResultList();
		
		List<AlunoRanking> lar = new ArrayList<AlunoRanking>();
		for (Object object : lo) {
			Object[] itens = (Object[]) object;		
			lar.add(new AlunoRanking(
					(int)Double.parseDouble(""+itens[0]), 
					itens[1]+"", 
					(int)Double.parseDouble(""+itens[2]), 
					(int)Double.parseDouble(""+itens[3]), 
					(int)Double.parseDouble(""+itens[4])));
		}
		return lar;
	}
	
	@Transactional
	public static void deleteAluno(Aluno a)throws Exception{
		JPA.em().remove(a);
	}

	@Transactional
	public static void updateAlunosToNewProfessor(Professor pAtual, Professor pNovo) {
		try {
			JPA.em().getTransaction().commit();
			JPA.em().getTransaction().begin();
						
			RespostaDatabase.deteleRespostasByProfessor(pAtual.getId());
			
			String query = "SET FOREIGN_KEY_CHECKS = 0";
			JPA.em().createNativeQuery(query).executeUpdate();
			
			query = "UPDATE Aluno SET idProfessor = :pNovo, pontuacao = :pontuacao, isLogado = :isLogado "
					+ "WHERE idProfessor = :pAtual";
			JPA.em().createNativeQuery(query)
				.setParameter("pNovo", pNovo.getId())
				.setParameter("pontuacao", 0)
				.setParameter("isLogado", false)
				.setParameter("pAtual", pAtual.getId())
				.executeUpdate();
			
			query = "SET FOREIGN_KEY_CHECKS = 1";
			JPA.em().createNativeQuery(query).executeUpdate();
			
			JPA.em().getTransaction().commit();
			JPA.em().getTransaction().begin();
			JPA.em().flush();
			
		} catch (Exception e) {
			JPA.em().getTransaction().rollback();
			JPA.em().createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
		}
	}

	@Transactional
	public static int selectSomaPontuacaoByProfessorId(int id) {
		String query = "SELECT SUM(pontuacao) FROM Aluno WHERE idProfessor = :idProfessor";
		List<Object> lo = JPA.em().createNativeQuery(query)
								.setParameter("idProfessor", id)
								.getResultList();
		
		if (lo != null && !lo.isEmpty() && lo.get(0) != null) {
			return (int)Double.parseDouble(""+lo.get(0));
		}
		return 0;
	}
	
	@Transactional
	public static int[] selectSomaPontuacaoPorLevelByAluno(int idAluno) {
		int[] pontuacaoPorLevel = {0,0,0,0};
		
		String query = "SELECT SUM(r.pontuacao) as pontuacao FROM ("
				+ "SELECT CASE "
				+ "	WHEN level BETWEEN 1 AND 5 THEN 1 "
				+ "	WHEN level BETWEEN 6 AND 10 THEN 2 "
				+ "	WHEN level BETWEEN 11 AND 15 THEN 3 "
				+ "	WHEN level BETWEEN 16 AND 20 THEN 4 "
				+ "	ELSE 21 END as level, pontuacao "
				+ "	FROM Resposta WHERE idAluno = :idAluno) r "
				+ "GROUP BY r.level ORDER BY r.level ASC";
		List<Object> lo = JPA.em().createNativeQuery(query)
								.setParameter("idAluno", idAluno)
								.getResultList();
		
		for (int i=0; i<lo.size(); i++) {	
			pontuacaoPorLevel[i] = Integer.parseInt(lo.get(i)+"");
		}
		return pontuacaoPorLevel;
	}
}
