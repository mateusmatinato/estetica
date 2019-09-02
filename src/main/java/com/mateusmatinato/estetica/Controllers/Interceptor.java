package com.mateusmatinato.estetica.Controllers;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class Interceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String uri = request.getRequestURI();
        
        if(uri.contains("resources") || uri.contains("login")){
            // Páginas que podem ser acessadas sem login
            return true;
        }
        else{
            //Páginas que precisam de login para serem acessadas
            HttpSession session = request.getSession();
            if(session.getAttribute("usuarioLogado") != null){
                return true;
            }
            else{
                response.sendRedirect("login");
                return false;
            }
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) throws Exception {

    }

}
