package Backend.Services;
import Backend.Types.User;
import Backend.Mappers.UserRowMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserService {
    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void create(User user) {
        String sql = "INSERT INTO USERS (EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getRole());
    }

    public void insert(User user) {
        String sql = "INSERT INTO USERS (ID, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getId(), user.getEmail(), user.getPassword(), user.getRole());
    }

    public User findById(Long id) {
        try {
            String sql = "SELECT ID, EMAIL, PASSWORD, ROLE FROM USERS WHERE ID = ?";
            return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User findByEmail(String email) {
        try {
            String sql = "SELECT ID, EMAIL, PASSWORD, ROLE FROM USERS WHERE EMAIL = ?";
            return jdbcTemplate.queryForObject(sql, new UserRowMapper(), email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public int deleteById(Long id) {
        String sql = "DELETE FROM USERS WHERE ID = ?";
        return jdbcTemplate.update(sql, id);
    }

    public int deleteByEmail(String email) {
        String sql = "DELETE FROM USERS WHERE EMAIL = ?";
        return jdbcTemplate.update(sql, email);
    }
}