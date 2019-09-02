package com.mateusmatinato.estetica.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class InterceptorAppConfig implements WebMvcConfigurer {

    @Autowired
    Interceptor interceptador;

    public void addInterceptors(InterceptorRegistry interceptor){
        interceptor.addInterceptor(interceptador);
    }

}
