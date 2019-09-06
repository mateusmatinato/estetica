/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Repository;

import com.mateusmatinato.estetica.Models.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author mateusmatinato
 */
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    public List<Cliente> findByNomeStartingWith(String term);
    
}
