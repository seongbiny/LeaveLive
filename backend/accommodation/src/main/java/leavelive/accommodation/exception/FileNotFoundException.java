package leavelive.accommodation.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
@Getter
@Setter
public class FileNotFoundException extends RuntimeException{
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
