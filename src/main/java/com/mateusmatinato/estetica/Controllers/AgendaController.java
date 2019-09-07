/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Controllers;

import com.mateusmatinato.estetica.Models.Atendimento;
import com.mateusmatinato.estetica.Models.Cliente;
import com.mateusmatinato.estetica.Models.Servico;
import com.mateusmatinato.estetica.Models.StatusAtendimento;
import com.mateusmatinato.estetica.Repository.AtendimentoRepository;
import com.mateusmatinato.estetica.Repository.ClienteRepository;
import com.mateusmatinato.estetica.Repository.ServicosRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @Autowired
    ClienteRepository clienteDAO;

    @GetMapping("/agenda")
    public ModelAndView agendaPage() {
        ModelAndView agenda = new ModelAndView("agendamentos");
        List<Servico> servicos = servicoDAO.findAll();
        agenda.addObject("servicos", servicos);

        return agenda;
    }

    @GetMapping("listaAgendamentos")
    public @ResponseBody
    String listaAgendamentos() {
        List<Atendimento> atendimentos = atendimentoDAO.listaAtendimentosAgenda();
        JSONArray atendimentosJson = new JSONArray();

        for (Atendimento a : atendimentos) {
            JSONObject at = new JSONObject();
            at.put("title", a.getCliente().getNome() + " - " + a.getServico().getNome());
            at.put("start", a.getDataInicioAtendimento().toString());
            at.put("end", a.getDataFimAtendimento().toString());
            at.put("className", "bg-" + a.getServico().getId());

            // Dados para o modal
            at.put("idAtendimento", a.getId());
            at.put("nomeCliente", a.getCliente().getNome());
            at.put("idCliente", a.getCliente().getId());
            at.put("idServico", a.getServico().getId());
            at.put("cartao", a.isCartao());
            at.put("preco", a.getPreco());
            at.put("promocao", a.getPreco() == a.getServico().getPreco() ? false : true);
            at.put("duracao", (a.getDataFimAtendimento().getTime() - a.getDataInicioAtendimento().getTime()) / 1000);

            atendimentosJson.put(at);
        }

        return atendimentosJson.toString();
    }

    @RequestMapping("autocompleteNome")
    public @ResponseBody
    String autocompletePacienteEmergencia(@RequestParam(value = "query") String term) throws JSONException {

        JSONArray json = new JSONArray();
        List<Cliente> clientes = clienteDAO.findByNomeStartingWith(term);
        for (Cliente c : clientes) {
            JSONObject o = new JSONObject();
            o.put("value", c.getNome());
            o.put("idCliente", c.getId());
            json.put(o);
        }

        String tmp = "{\"query\": \"Unit\",\n"
                + "    \"suggestions\":" + json.toString() + "}";
        return tmp;
    }

    @RequestMapping("salvarAtendimento")
    public @ResponseBody
    String salvarAtendimento(Atendimento atendimento, HttpServletRequest request) throws ParseException {
        int idAtendimento = Integer.parseInt(request.getParameter("id"));

        Date dataInicioAtendimento = new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(request.getParameter("dataInicioAtendimento"));
        atendimento.setDataInicioAtendimento(dataInicioAtendimento);

        Calendar dataFimAtendimento = Calendar.getInstance();
        dataFimAtendimento.setTime(atendimento.getDataInicioAtendimento());

        String duracao[] = String.valueOf(request.getParameter("duracaoAtendimento")).split(":");
        dataFimAtendimento.add(Calendar.MINUTE, Integer.parseInt(duracao[1]));
        dataFimAtendimento.add(Calendar.HOUR_OF_DAY, Integer.parseInt(duracao[0]));
        atendimento.setDataFimAtendimento(dataFimAtendimento.getTime());
        atendimento.setStatus(StatusAtendimento.AGENDADO);

        if (idAtendimento != 0) {
            //Está editando um atendimento, deve verificar se existe algum atendimento na data atual
            List<Atendimento> atendimentos = atendimentoDAO.findAllByDataInicioAtendimentoLessThanAndDataFimAtendimentoGreaterThan(atendimento.getDataFimAtendimento(), atendimento.getDataInicioAtendimento());
            if (atendimentos.size() == 1 && atendimentos.get(0).getId() == idAtendimento) {
                //Pode alterar o horário
                atendimentoDAO.save(atendimento);
                return "sucesso";
            } else {
                //Não pode alterar o horário
                return "erro";
            }
        }

        if (atendimentoDAO.findAllByDataInicioAtendimentoLessThanAndDataFimAtendimentoGreaterThan(atendimento.getDataFimAtendimento(), atendimento.getDataInicioAtendimento()).isEmpty()) {
            atendimentoDAO.save(atendimento);
            return "sucesso";
        } else {
            return "erro";
        }

    }

    @RequestMapping("excluirAtendimento")
    public @ResponseBody
    String excluirAtendimento(@RequestParam("id") long id) {
        try {
            atendimentoDAO.deleteById(id);
            return "sucesso";
        }
        catch(Exception e){
            e.printStackTrace();
            return "erro";
        }
    }

}
