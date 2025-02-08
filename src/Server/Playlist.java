package Server;

import java.util.HashMap;
import java.util.Map;


public class Playlist {
    
    private final String name;
    private final String id;
    private final String owner;
    private final String description;
    private final String url;
    private final String imageUrl;


    public Playlist(String json) {
        Map<String, String> jsonMap = parseJson(json);
        this.name = jsonMap.getOrDefault("name", "");
        this.id = jsonMap.getOrDefault("id", "");
        this.owner = jsonMap.getOrDefault("owner", "");
        this.description = jsonMap.getOrDefault("description", "");
        this.url = jsonMap.getOrDefault("url", "");
        this.imageUrl = jsonMap.getOrDefault("imageUrl", "");
    }


    private Map<String, String> parseJson(String json) {
        Map<String, String> map = new HashMap<>();
        String parse = json.trim().replaceAll("[{}\"]", ""); // Remove curly braces and quotes

        for (String pair : parse.split(",")) {
            String[] entry = pair.split(":", 2);
            if (entry.length == 2) {
                map.put(entry[0].trim(), entry[1].trim());
            }
        }
        return map;
    }
    
}