package leavelive.accommodation.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
@Getter
@Setter
public class LoginException extends RuntimeException{
    public LoginException() {
        super();
    }
    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }
    public LoginException(String message) {
        super(message);
    }
    public LoginException(Throwable cause) {
        super(cause);
    }
}
