package leavelive.activity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
//	Swagger-UI 확인
//	http://localhost:8085/swagger-ui/index.html

    private String version = "V1";
    private String title = "Leave, Live API " + version;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30).consumes(getConsumeContentTypes()).produces(getProduceContentTypes())
                .apiInfo(apiInfo()).groupName(version).select()
                .apis(RequestHandlerSelectors.basePackage("leavelive.activity.controller"))
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
                .contact(new Contact("Leave, Live", "http://k6c105.p.ssafy.io/", "ssafy@ssafy.com"))
                .license("Leave, Live License")
                .version("1.0").build();
    }
}
