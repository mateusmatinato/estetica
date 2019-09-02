/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Repository;

import com.mateusmatinato.estetica.Models.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author mateu
 */

public interface ServicosRepository extends JpaRepository<Servico, Long> {
    
}
