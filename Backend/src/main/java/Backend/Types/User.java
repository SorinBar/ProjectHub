package Backend.Types;

public class User {
    private Long id;
    private String email;
    private String password;
    private String role;

    public User() {}

    public User(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(Long id, String email, String password, String role) {
        this(email, password, role);
        this.id = id;
    }

    @Override
    public String toString() {
        return "User Details:\n" +
                "ID: " + id + "\n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n" +
                "Role: " + role;
    }


    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isValid() {
        return email != null && password != null && role != null && (role.equals("Employee") || role.equals("Project Manager"));
    }
}
