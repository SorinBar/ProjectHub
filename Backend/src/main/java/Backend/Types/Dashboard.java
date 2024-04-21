package Backend.Types;

public class Dashboard {
    private Long id;
    private String name;
    private Long pmId;

    public Dashboard(String name, Long pmId) {
        this.name = name;
        this.pmId = pmId;
    }

    public Dashboard(Long id, String name, Long pmId) {
        this(name, pmId);
        this.id = id;
    }

    @Override
    public String toString() {
        return "Dashboard Details:\n" +
                "ID: " + id + "\n" +
                "Name: " + name + "\n" +
                "PM ID: " + pmId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getPmId() {
        return pmId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPmId(Long pmId) {
        this.pmId = pmId;
    }
}

