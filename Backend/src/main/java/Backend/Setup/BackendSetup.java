package Backend.Setup;

import org.springframework.jdbc.core.JdbcTemplate;

public class BackendSetup {
    public static int setup(JdbcTemplate jdbcTemplate) {
        int dropStatus = dropTables(jdbcTemplate);
        int createStatus = createTables(jdbcTemplate);

        if (dropStatus != 0) {
            System.out.println("Drop tables error");
            return -1;
        }
        if (createStatus != 0) {
            System.out.println("Create tables error");
            return -1;
        }

        return 0;
    }

    private static int dropTables(JdbcTemplate jdbcTemplate) {
        String sql;
        int status;

        sql = "DROP TABLE IF EXISTS DASHBOARDS_TASKS";
        status = jdbcTemplate.update(sql);
        if (status >= 0) {
            System.out.println("The DASHBOARDS_TASKS table has been dropped successfully.");
        } else {
            System.out.println("An error occurred while dropping the DASHBOARDS_TASKS table.");
            return -1;
        }
        sql = "DROP TABLE IF EXISTS DASHBOARDS_EMPLOYEES";
        status = jdbcTemplate.update(sql);
        if (status >= 0) {
            System.out.println("The DASHBOARDS_EMPLOYEES table has been dropped successfully.");
        } else {
            System.out.println("An error occurred while dropping the DASHBOARDS_EMPLOYEES table.");
            return -1;
        }
        sql = "DROP TABLE IF EXISTS DASHBOARDS";
        status = jdbcTemplate.update(sql);
        if (status >= 0) {
            System.out.println("The DASHBOARDS table has been dropped successfully.");
        } else {
            System.out.println("An error occurred while dropping the DASHBOARDS table.");
            return -1;
        }
        sql = "DROP TABLE IF EXISTS USERS";
        status = jdbcTemplate.update(sql);
        if (status >= 0) {
            System.out.println("The USERS table has been dropped successfully.");
        } else {
            System.out.println("An error occurred while dropping the USERS table.");
            return -1;
        }

        return 0;
    }

    private static int createTables(JdbcTemplate jdbcTemplate) {
        String sql;
        int status;

        sql = "CREATE TABLE USERS ("
                + "ID SERIAL PRIMARY KEY,"
                + "EMAIL VARCHAR(255) UNIQUE NOT NULL,"
                + "PASSWORD VARCHAR(255) NOT NULL,"
                + "ROLE VARCHAR(50)"
                + ");";
        try {
            status = jdbcTemplate.update(sql);
            if (status >= 0) {
                System.out.println("The USERS table has been created successfully.");
            } else {
                System.out.println("An error occurred while creating the users USERS.");
                return -1;
            }
        } catch (Exception e) {
            System.out.println("An error occurred while creating the USERS table: " + e.getMessage());
            return -1;
        }

        sql = "CREATE TABLE DASHBOARDS ("
                + "ID SERIAL PRIMARY KEY,"
                + "NAME VARCHAR(255) NOT NULL,"
                + "PM_ID INTEGER,"
                + "FOREIGN KEY (PM_ID) REFERENCES USERS(ID)"
                + ");";
        try {
            status = jdbcTemplate.update(sql);
            if (status >= 0) {
                System.out.println("The DASHBOARDS table has been created successfully.");
            } else {
                System.out.println("An error occurred while creating the users DASHBOARDS.");
                return -1;
            }
        } catch (Exception e) {
            System.out.println("An error occurred while creating the DASHBOARDS table: " + e.getMessage());
            return -1;
        }

        sql = "CREATE TABLE DASHBOARDS_EMPLOYEES ("
                + "id SERIAL PRIMARY KEY,"
                + "DASH_ID INTEGER NOT NULL,"
                + "EMP_ID INTEGER NOT NULL,"
                + "FOREIGN KEY (DASH_ID) REFERENCES DASHBOARDS(ID),"
                + "FOREIGN KEY (EMP_ID) REFERENCES USERS(ID)"
                + ");";
        try {
            status = jdbcTemplate.update(sql);
            if (status >= 0) {
                System.out.println("The DASHBOARDS_EMPLOYEES table has been created successfully.");
            } else {
                System.out.println("An error occurred while creating the users DASHBOARDS_EMPLOYEES.");
                return -1;
            }
        } catch (Exception e) {
            System.out.println("An error occurred while creating the DASHBOARDS_EMPLOYEES table: " + e.getMessage());
            return -1;
        }

        sql = "CREATE TABLE DASHBOARDS_TASKS ("
                + "ID SERIAL PRIMARY KEY,"
                + "TASK_NAME VARCHAR(255) NOT NULL,"
                + "TASK_DESC TEXT,"
                + "DASH_ID INTEGER,"
                + "FOREIGN KEY (DASH_ID) REFERENCES DASHBOARDS(ID)"
                + ");";
        try {
            status = jdbcTemplate.update(sql);
            if (status >= 0) {
                System.out.println("The DASHBOARDS_TASKS table has been created successfully.");
            } else {
                System.out.println("An error occurred while creating the users DASHBOARDS_TASKS.");
                return -1;
            }
        } catch (Exception e) {
            System.out.println("An error occurred while creating the DASHBOARDS_TASKS table: " + e.getMessage());
            return -1;
        }

        return 0;
    }
}
