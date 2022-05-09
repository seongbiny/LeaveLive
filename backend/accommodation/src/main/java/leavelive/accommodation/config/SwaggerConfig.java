package com.soboksobok.soboksobok.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
    //	Swagger 설정 확인
//	http://localhost:8000/{your-app-root}/v2/api-docs
//	Swagger-UI 확인
//	http://localhost:8080/{your-app-root}/swagger-ui.html

    private String version = "V1";
    private String title = "Leave, Live API " + version;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30).consumes(getConsumeContentTypes()).produces(getProduceContentTypes())
                .apiInfo(apiInfo()).groupName(version).select()
                .apis(RequestHandlerSelectors.basePackage("leavelive.accommodation.controller"))
                .paths(PathSelectors.any()).build()
                .useDefaultResponseMessages(false);
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title(title)
                .description("<h3>Leave, Live API Reference for Developers</h3>")
                .contact(new Contact("Leave, Live", "https://edu.ssafy.com", "ssafy@ssafy.com"))
                .license("Leave, Live License")
                .version("1.0").build();
    }
}
