package Server;

import java.util.HashMap;
import java.util.Map;


public class Playlists {
    
    private Map<String, String> playlists;

    public Playlists(Map<String, String> playlists) {
        this.playlists = playlists;
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