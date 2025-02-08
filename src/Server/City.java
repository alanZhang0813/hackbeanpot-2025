package Server;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LocationController {

    @PostMapping("/location")
    public ResponseEntity<Map<String, String>> receiveLocationName(@RequestBody LocationRequest request) {
        String locCity = request.getLocCity();
        System.out.println("Received location name: " + locCity);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Location name received");
        response.put("locCity", locCity);

        return ResponseEntity.ok(response);
    }
}