package Backend;
import Backend.Controlers.UserController;
import Backend.Setup.BackendSetup;
import Backend.Types.User;
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
	private UserController userController;

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
		userController = new UserController(jdbcTemplate);


	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		userController.insert(new User(1L, "test@gmail.com", "123", "Employee"));

		return String.format("Hello %s!", name);
	}


//	public void insert(Employee employee) {
//		String sql = "INSERT INTO employees (id, name, age, salary) VALUES (?, ?, ?, ?)";
//		jdbcTemplate.update(sql, employee.getId(), employee.getName(), employee.getAge(), employee.getSalary());
//	}
//
//	public Employee findById(Long id) {
//		String sql = "SELECT id, name, age, salary FROM employees WHERE id = ?";
//		return jdbcTemplate.queryForObject(sql, new EmployeeRowMapper(), id);
//	}

}
