package Backend.ResponseTypes;

import Backend.Types.User;

public class SignInResponse {
    private final User user;
    private final String jwtToken;

    public SignInResponse(User user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public User getUser() {
        return user;
    }

    public String getJwtToken() {
        return jwtToken;
    }
}
