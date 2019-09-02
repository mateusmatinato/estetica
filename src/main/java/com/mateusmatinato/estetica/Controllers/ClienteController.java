/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Controllers;

import com.mateusmatinato.estetica.Models.Cliente;
import com.mateusmatinato.estetica.Repository.ClienteRepository;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author mateusmatinato
 */
@Controller
public class ClienteController {

    @Autowired
    private ClienteRepository clienteDAO;

    @GetMapping(value = "/clientes")
    public ModelAndView cadastroClienteGET() {
        return new ModelAndView("clientes");
    }

    @PostMapping(value = "/cadastrarCliente")
    public String cadastroClientePOST(Cliente cliente) {

        clienteDAO.save(cliente);

        return "";
    }

}
