/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.RestControllers;

import com.mateusmatinato.estetica.Models.Cliente;
import com.mateusmatinato.estetica.Repository.ClienteRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mateu
 */
@RestController
public class ClienteRest {
    
    @Autowired
    private ClienteRepository clienteDAO;
    
    @GetMapping("/listClientes")
    public List<Cliente> listClientes(){
        return clienteDAO.findAll();
    }
    
    @GetMapping("/getCliente/{id}")
    public Cliente findCliente(@PathVariable long id){
        return clienteDAO.findById(id).get();
    }
    
    @PostMapping("/salvarCliente")
    public Cliente saveCliente(@RequestBody Cliente cliente){
        return clienteDAO.save(cliente);
    }
    
    @PutMapping("/editarCliente/{id}")
    public Cliente editCliente(@RequestBody Cliente clienteNovo, @PathVariable Long id){
        System.out.println("Cliente novo: "+clienteNovo.getNome());
        
        return clienteDAO.findById(id)
      .map(cliente -> {
        cliente.setNome(clienteNovo.getNome());
        cliente.setEmail(clienteNovo.getEmail());
        cliente.setCelular(clienteNovo.getCelular());
        cliente.setDataNascimento(clienteNovo.getDataNascimento());
        return clienteDAO.save(cliente);
      })
      .orElseGet(() -> {
        clienteNovo.setId(id);
        return clienteDAO.save(clienteNovo);
      });
    }
    
    @DeleteMapping("/deleteCliente/{id}")
    public void deleteClienteById(@PathVariable long id){
        clienteDAO.deleteById(id);
    }
}
