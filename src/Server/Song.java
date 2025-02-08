

class Song {
    private final String name;
    private final String artist;
    private final String city;
    private final int popularity;
    private final int address;


    public Song(String name, String artist, String city, int popularity) {
        this.name = name;
        this.artist = artist;
        this.city = city;
        this.popularity = popularity;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Song song = (Song) obj;
        return popularity == song.popularity &&
               address == song.address &&
               name.equals(song.name) &&
               artist.equals(song.artist) &&
               city.equals(song.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, artist, city, popularity, address);
    }

    
}
