package Backend.RequestTypes;

public class SignInRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public boolean isValid() {
        return email != null && password != null;
    }
}
