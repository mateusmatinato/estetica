/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Repository;

import com.mateusmatinato.estetica.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author mateusmatinato
 */
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    @Query("SELECT u FROM Usuario u WHERE u.email = ?1 AND u.senha = ?2")
    public Usuario findByEmailAndSenha(String email, String senha);
    
}
