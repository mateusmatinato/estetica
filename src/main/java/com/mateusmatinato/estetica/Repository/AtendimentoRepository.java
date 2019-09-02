/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Repository;

import com.mateusmatinato.estetica.Models.Atendimento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author mateu
 */
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
    
    @Query(value = "SELECT a FROM Atendimento a LEFT JOIN FETCH a.cliente LEFT JOIN FETCH a.servico")
    public List<Atendimento> listaAtendimentosAgenda();
    
}
