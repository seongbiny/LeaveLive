package leavelive.activity.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
@Getter
@Setter
public class FileNotFoundException extends RuntimeException {

    public FileNotFoundException() {
        super();
    }

    public FileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileNotFoundException(String message) {
        super(message);
    }

    public FileNotFoundException(Throwable cause) {
        super(cause);
    }
}
