package com.mateusmatinato.estetica.Controllers;

import com.mateusmatinato.estetica.Models.Usuario;
import com.mateusmatinato.estetica.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    UsuarioRepository usuarioDAO;

    @GetMapping("/login")
    public ModelAndView login(HttpSession session) {
        if (session.getAttribute("usuarioLogado") == null) {
            return new ModelAndView("login");
        }
        else{
            return new ModelAndView("redirect:/");
        }
    }

    @PostMapping("/login")
    public ModelAndView loginPost(Usuario usuarioLogin, HttpSession session) {
        System.out.println("USUARIO: " + usuarioLogin.getEmail() + "/ " + usuarioLogin.getSenha());
        Usuario usuarioLogado = usuarioDAO.findByEmailAndSenha(usuarioLogin.getEmail(), usuarioLogin.getSenha());
        if (usuarioLogado != null) {
            session.setAttribute("usuarioLogado", usuarioLogado);
            return new ModelAndView("redirect:/");
        } else {
            ModelAndView login = new ModelAndView("login");
            login.addObject("erro", "true");
            return login;
        }
    }

    @GetMapping("/logout")
    public ModelAndView logout(HttpSession session) {
        session.removeAttribute("usuarioLogado");
        return new ModelAndView("redirect:login");
    }
}
