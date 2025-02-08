package Server;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

public class API {

String clientID;
String clientSecret;
String tokenURL = "https://accounts.spotify.com/api/token";
    
    public API(String clientID, String clientSecret) {
        this.clientID = clientID;
        this.clientSecret = clientSecret;
    }

    public void access() {
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

            System.out.println("Response: " + response.body());

        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        API api = new API("fd3d6f23a06b4bae9b6dc9bcf3794fe4","fbd4eea464684530ba65bb383f2632eb");
        api.access();
    }
}
