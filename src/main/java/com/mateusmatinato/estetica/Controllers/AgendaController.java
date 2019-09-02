/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Controllers;

import com.mateusmatinato.estetica.Models.Atendimento;
import com.mateusmatinato.estetica.Models.Servico;
import com.mateusmatinato.estetica.Repository.AtendimentoRepository;
import com.mateusmatinato.estetica.Repository.ServicosRepository;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author mateu
 */
@Controller
public class AgendaController {
    
    @Autowired
    ServicosRepository servicoDAO;
    
    @Autowired
    AtendimentoRepository atendimentoDAO;
    
    @GetMapping("/agenda")
    public ModelAndView agendaPage(){
        ModelAndView agenda = new ModelAndView("agendamentos");
        List<Servico> servicos = servicoDAO.findAll();
        agenda.addObject("servicos", servicos);
        
        
        return agenda;
    }
    
    @GetMapping("listaAgendamentos")
    public @ResponseBody String listaAgendamentos(){
        List<Atendimento> atendimentos = atendimentoDAO.listaAtendimentosAgenda();
        JSONArray atendimentosJson = new JSONArray();
        
        for(Atendimento a : atendimentos){
            JSONObject at = new JSONObject();
            at.put("title", a.getCliente().getNome()+" - "+a.getServico().getNome());
            at.put("start",a.getDataInicioAtendimento().toString());
            at.put("end", a.getDataFimAtendimento().toString());
            at.put("className", "bg-"+a.getServico().getId());
            
            atendimentosJson.put(at);
        }
        
        return atendimentosJson.toString();
    }
    
}
