/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author mateusmatinato
 */

@Entity
@Table(name = "atendimento")
public class Atendimento implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    
    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date dataInicioAtendimento;
    
    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date dataFimAtendimento;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servico_id")
    private Servico servico;
    
    @Enumerated
    private StatusAtendimento status;
    
    @NotNull
    private double preco;
    
    @NotNull
    private boolean cartao;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Date getDataInicioAtendimento() {
        return dataInicioAtendimento;
    }

    public void setDataInicioAtendimento(Date dataInicioAtendimento) {
        this.dataInicioAtendimento = dataInicioAtendimento;
    }

    public Date getDataFimAtendimento() {
        return dataFimAtendimento;
    }

    public void setDataFimAtendimento(Date dataFimAtendimento) {
        this.dataFimAtendimento = dataFimAtendimento;
    }

    public StatusAtendimento getStatus() {
        return status;
    }

    public void setStatus(StatusAtendimento status) {
        this.status = status;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public boolean isCartao() {
        return cartao;
    }

    public void setCartao(boolean isCartao) {
        this.cartao = isCartao;
    }
    
}
