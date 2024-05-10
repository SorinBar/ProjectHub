package Backend.Mappers;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import Backend.Types.User;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        Long id = rs.getLong("ID");
        String email = rs.getString("EMAIL");
        String password = rs.getString("PASSWORD");
        String role = rs.getString("ROLE");
        return new User(id, email, password, role);
    }
}

