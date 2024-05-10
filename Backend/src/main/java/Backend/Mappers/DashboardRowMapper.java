package Backend.Mappers;
import Backend.Types.Dashboard;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DashboardRowMapper implements RowMapper<Dashboard> {
    @Override
    public Dashboard mapRow(ResultSet rs, int rowNum) throws SQLException {
        Long id = rs.getLong("ID");
        String email = rs.getString("NAME");
        Long pmId = rs.getLong("PM_ID");
        return new Dashboard(id, email, pmId);
    }
}