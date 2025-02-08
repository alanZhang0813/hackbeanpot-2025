// package Server;

// import com.sun.net.httpserver.HttpServer;
// import com.sun.net.httpserver.HttpHandler;
// import com.sun.net.httpserver.HttpExchange;

// import java.io.IOException;
// import java.io.OutputStream;
// import java.net.InetSocketAddress;

// public class City {
//     public static void main(String[] args) throws IOException {
//         // server on port 8080
//         HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
//         // endpoint context
//         server.createContext("/api/location", new LocationHandler());
//         server.start();
//         System.out.println("Server started on port 8080");
//     }

//     // Handler for the "/api/location" endpoint
//     static class LocationHandler implements HttpHandler {
//         @Override
//         public void handle(HttpExchange exchange) throws IOException {
//             if ("POST".equals(exchange.getRequestMethod())) {
//                 String requestBody = new String(exchange.getRequestBody().readAllBytes());
//                 String locCity = requestBody.split(":")[1].replaceAll("[{}\"]", "").trim();
//                 System.out.println("Received location name: " + locCity);

//                 String response = "Location name received: " + locCity;
//                 exchange.sendResponseHeaders(200, response.length());
//                 OutputStream os = exchange.getResponseBody();
//                 os.write(response.getBytes());
//                 os.close();
//             } else {
//                 String response = "Unsupported method";
//                 exchange.sendResponseHeaders(405, response.length());
//                 OutputStream os = exchange.getResponseBody();
//                 os.write(response.getBytes());
//                 os.close();
//             }
//         }
//     }
// }

package Server;
//everyone download this: https://maven.apache.org/download.cgi

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LocationController {

    @PostMapping("/location")
    public ResponseEntity<Map<String, String>> receiveLocationName(@RequestBody LocationRequest request) {
        String locCity = request.getLocCity(); // Access locCity
        System.out.println("Received location name: " + locCity); // Log the locCity

        // Create a response object
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Location name received");
        response.put("locCity", locCity);

        return ResponseEntity.ok(response);
    }
}