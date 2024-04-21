package Backend.Controlers;
import Backend.Types.User;
import Backend.Mappers.UserRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserController {
    private final JdbcTemplate jdbcTemplate;

    public UserController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void insert(User user) {
        String sql = "INSERT INTO USERS (ID, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getId(), user.getEmail(), user.getPassword(), user.getRole());
    }

    public User findById(Long id) {
        String sql = "SELECT ID, EMAIL, PASSWORD, ROLE FROM USERS WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }
}