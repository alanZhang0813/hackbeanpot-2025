package Server;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import Server.Playlists;

public class API {

private String clientID = "fd3d6f23a06b4bae9b6dc9bcf3794fe4";
private String clientSecret = "fbd4eea464684530ba65bb383f2632eb";
String tokenURL = "https://accounts.spotify.com/api/token";
private static final String API_URL = "https://api.spotify.com/v1/search";
private String token = this.access();
    
    public API() {}

    public String access() {
        try {
            HttpClient client = HttpClient.newHttpClient();

            String credentials = clientID + ":" + clientSecret;
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

            String requestBody = "grant_type=client_credentials";

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(tokenURL))
                .header("Authorization", "Basic " + encodedCredentials)  // Basic Auth header
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            Map<String, String> results = parseJson(response.body());
            System.out.println("API Key: " + results.get("access_token"));
            return results.get("access_token");
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    private Map<String, String> parseJson(String json) {
        Map<String, String> map = new HashMap<>();
        String parse = json.trim().replaceAll("[{}\"]", "");

        for (String pair : parse.split(",")) {
            String[] entry = pair.split(":", 2);
            if (entry.length == 2) {
                map.put(entry[0].trim(), entry[1].trim());
            }
        }
        return map;
    }    

    public Map<String, String> scrapePlaylists(String keywords) {
        Map<String, String> playlistResults = new HashMap<>();
        System.out.println("got here");
        try {
            String query = keywords.replace(" ", "%20");
            String requestUrl = API_URL + "?q=" + query + "&type=playlist&limit=5";
            URL url = new URL(requestUrl);
            System.out.println("got here");

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + token);
            conn.setRequestProperty("Accept", "application/json");

            int responseCode = conn.getResponseCode();
            System.out.println(responseCode);
            if (responseCode == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = in.readLine()) != null) {
                    response.append(line);
                }
                in.close();

                playlistResults = parseJson(response.toString());
            } 
            else {
                System.out.println("Failed to fetch data: " + responseCode);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return playlistResults;
    }


    public static void main(String[] args) {
        API api = new API();
        System.out.println(api.scrapePlaylists("Boston"));
    }
}
