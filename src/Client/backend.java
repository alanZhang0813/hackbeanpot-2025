import java.util.*;
import java.io.*;
import java.net.*;
import com.google.gson.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class Backend {
    public static void main(String[] args) {
        Backend backend = new Backend();
        List<Song> playlist = backend.generatePlaylist("...");
        for (Song song : playlist) {
            System.out.println(song);
        }
        
    }

    public List<Song> generatePlaylist(String city) {
        List<Song> localSongs = searchSongs(city);  
        List<Song> localArtists = searchLocalArtists(city); 
        List<Song> Playlist = new Map<>();

 
        Playlist.addAll(localSongs);
        Playlist.addAll(localArtists);

        return Playlist;
    }


    private List<Song> searchSongs(String City) {
       List<Song> songs = new ArrayList<>();
        try {
            URL url = new URL(SPOTIFY_API_URL + "search?q=" + URLEncoder.encode(city, "UTF-8") + "&type=track");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();

            JsonObject jsonResponse = JsonParser.parseString(response.toString()).getAsJsonObject();
            JsonArray tracks = jsonResponse.getAsJsonObject("tracks").getAsJsonArray("items");

            for (JsonElement track : tracks) {
                String trackName = track.getAsJsonObject().get("name").getAsString();
                String artist = track.getAsJsonObject().getAsJsonArray("artists").get(0).getAsJsonObject().get("name").getAsString();
                String city = track.getAsJsonObject().get("city");
                int popularity = track.getAsJsonObject().get("popularity").getAsInt();
                int address = track.getAsJsonObject().get("address");
                songs.add(new Song(trackName, artist, city, popularity, address));  
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return songs;
    }
}
 
