package Backend;

import Backend.RequestTypes.SignInRequest;
import Backend.Security.JwtUtils;
import Backend.Services.UserService;
import Backend.Setup.BackendSetup;
import Backend.Types.User;
import Backend.ResponseTypes.SignInResponse;
import jakarta.annotation.PostConstruct;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@RestController
public class BackendApplication {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	private UserService userService;
	private BCryptPasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostConstruct
	public void setup() {
		// Database setup
		int status = BackendSetup.setup(jdbcTemplate);
		if (status == 0) {
			System.out.println("Successful setup");
		} else {
			System.out.println("Setup error");
			System.exit(-1);
		}
		// Passwords encoder setup
		passwordEncoder = new BCryptPasswordEncoder();

		// Controllers setup
		userService = new UserService(jdbcTemplate);
		// TODO Dashboard
		// TODO Dashboard_Employees
		// TODO Dashboard_Tasks
	}

	@GetMapping("/hello")
	public ResponseEntity<String> hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		userService.insert(new User(20L, "test@gmail.com", "123", "Employee"));
		User user = userService.findByEmail("test@gmail.com");
		System.out.println(user);

		// Test JWT
		String token = JwtUtils.generateToken(1L);
		System.out.println(token);
		// System.out.println(JwtUtil.validateToken(
		// "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzE0ODMyMzA4LCJpYXQiOjE3MTM5NjgzMDh9.nT4Je2y-eGh6IeJzd1Ii6ewQNssAra7v6RhFqM9J0uA",
		// 1L));

		if (user != null) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/api/signup")
	public ResponseEntity<String> signup(@RequestBody @NotNull User user) {
		if (!user.isValid()) {
			return ResponseEntity.badRequest().build();
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (userService.create(user) != 0) {
			return ResponseEntity.status(409).build();
		} else {
			return ResponseEntity.ok().build();
		}
	}

	@PostMapping("/api/signin")
	public ResponseEntity<SignInResponse> signin(@RequestBody @NotNull SignInRequest signInRequest) {
		if (!signInRequest.isValid()) {
			return ResponseEntity.badRequest().build();
		}

		User user = userService.findByEmail(signInRequest.getEmail());
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		if (!passwordEncoder.matches(signInRequest.getPassword(), user.getPassword())) {
			return ResponseEntity.badRequest().build();
		}

		user.setPassword(null);
		return ResponseEntity.ok().body(new SignInResponse(
				user,
				JwtUtils.generateToken(user.getId())));
	}
}