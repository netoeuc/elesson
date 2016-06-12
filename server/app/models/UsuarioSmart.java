package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Index;

import util.Seguranca;

@Entity
public class UsuarioSmart {
	
	@Id	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	@Index(name = "email")
	private String email;
	
	@Column(nullable = false)
	private String senha;
	
	public UsuarioSmart(){}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) throws Exception{
		this.senha = Seguranca.encryptString(senha);
	}
	
	
}
