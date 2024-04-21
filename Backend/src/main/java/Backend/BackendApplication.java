package Backend;
import Backend.Security.JwtUtil;
import Backend.Services.UserService;
import Backend.Setup.BackendSetup;
import Backend.Types.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
@RestController
public class BackendApplication {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostConstruct
	public void setup() {
		//	Database setup
		int status = BackendSetup.setup(jdbcTemplate);
		if (status == 0) {
			System.out.println("Successful setup");
		} else {
			System.out.println("Setup error");
			System.exit(-1);
		}

		// Controllers setup
		userService = new UserService(jdbcTemplate);
		// TODO Dashboard
		// TODO Dashboard_Employees
		// TODO Dashboard_Tasks
	}

	@GetMapping("/hello")
	public ResponseEntity<String> hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		userService.insert(new User(20L, "test@gmail.com", "123", "Employee"));
		User user =  userService.findByEmail("test@gmail.com");

		//	Test JWT

		String token = JwtUtil.generateToken(1L);
		String token1 = JwtUtil.generateToken(1L);
		System.out.println(token);
		System.out.println(JwtUtil.validateToken(token, 1L));
		System.out.println(JwtUtil.validateToken(token, 2L));

		if (user != null) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
