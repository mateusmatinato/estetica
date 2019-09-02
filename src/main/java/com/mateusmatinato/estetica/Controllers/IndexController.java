/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mateusmatinato.estetica.Controllers;

import com.mateusmatinato.estetica.Models.Usuario;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author mateusmatinato
 */
@Controller
public class IndexController {
    
    @RequestMapping("/")
    public ModelAndView indexPage(HttpSession session){
        ModelAndView index = new ModelAndView("index");
        
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
        index.addObject("usuarioLogado", usuarioLogado);
        return index;
    }
    
    @GetMapping("home")
    public ModelAndView HomePage(){
        return new ModelAndView("home");
    }
    
    
}
