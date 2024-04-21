package Backend;
import Backend.Setup.BackendSetup;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
@RestController
public class BackendApplication {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostConstruct
	public void setup() {
		int status = BackendSetup.setup(jdbcTemplate);
		if (status == 0) {
			System.out.println("Successful setup");
		} else {
			System.out.println("Setup error");
			System.exit(-1);
		}
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		String sql = "INSERT INTO USERS (EMAIL, PASSWORD, ROLE) VALUES ('test@gmail.com', 'hash1', 'Project Manager')";


		int rows = jdbcTemplate.update(sql);
		if (rows > 0) {
			System.out.println("A new row has been inserted.");
		}
		return String.format("Hello %s!", name);
	}

}
