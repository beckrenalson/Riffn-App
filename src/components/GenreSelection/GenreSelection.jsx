import BackBtn from "../BackBtn"
import Continue from "./Continue";
import SubGenreList from "./SubGenreList"
import { useParams } from "react-router";

function GenreSelection() {

    let { type } = useParams();
    let genres = [];

    const rockGenres = [
        { genreName: "Classic Rock" },
        { genreName: "Hard Rock" },
        { genreName: "Punk Rock" },
        { genreName: "Alternative Rock" },
        { genreName: "Indie Rock" },
        { genreName: "Progressive Rock" },
        { genreName: "Psychedelic Rock" },
        { genreName: "Garage Rock" },
        { genreName: "Grunge" },
        { genreName: "Post-Rock" }
    ];

    const popGenres = [
        { genreName: "Mainstream Pop" },
        { genreName: "Dance Pop" },
        { genreName: "Indie Pop" },
        { genreName: "Electropop" },
        { genreName: "Teen Pop" },
        { genreName: "Synthpop" }
    ];

    const electronicGenres = [
        { genreName: "House" },
        { genreName: "Techno" },
        { genreName: "Trance" },
        { genreName: "Drum and Bass" },
        { genreName: "Dubstep" },
        { genreName: "EDM" },
        { genreName: "Electro" },
        { genreName: "Ambient" },
        { genreName: "IDM" },
        { genreName: "Future Bass" }
    ];

    const rapGenres = [
        { genreName: "East Coast Rap" },
        { genreName: "West Coast Rap" },
        { genreName: "Trap" },
        { genreName: "Boom Bap" },
        { genreName: "Conscious Rap" },
        { genreName: "Gangsta Rap" },
        { genreName: "Lo-fi Hip Hop" },
        { genreName: "Experimental Hip Hop" }
    ];

    const classicalGenres = [
        { genreName: "Baroque" },
        { genreName: "Romantic" },
        { genreName: "Modern Classical" },
        { genreName: "Minimalism" },
        { genreName: "Contemporary Classical" },
        { genreName: "Chamber Music" },
        { genreName: "Opera" }
    ];

    const jazzbluesGenres = [
        { genreName: "Bebop" },
        { genreName: "Swing" },
        { genreName: "Cool Jazz" },
        { genreName: "Fusion" },
        { genreName: "Smooth Jazz" },
        { genreName: "Traditional Blues" },
        { genreName: "Delta Blues" },
        { genreName: "Electric Blues" }
    ];

    const countryGenres = [
        { genreName: "Classic Country" },
        { genreName: "Contemporary Country" },
        { genreName: "Bluegrass" },
        { genreName: "Americana" },
        { genreName: "Folk Rock" },
        { genreName: "Singer-Songwriter" }
    ];

    const worldGenres = [
        { genreName: "Afrobeat" },
        { genreName: "Reggae" },
        { genreName: "Dancehall" },
        { genreName: "Salsa" },
        { genreName: "Bachata" },
        { genreName: "Reggaeton" },
        { genreName: "K-Pop" },
        { genreName: "J-Pop" },
        { genreName: "Flamenco" },
        { genreName: "Celtic" },
        { genreName: "Bhangra" }
    ];

    const otherGenres = [
        { genreName: "Soundtrack" },
        { genreName: "Lo-fi" },
        { genreName: "Chiptune" },
        { genreName: "Experimental" },
        { genreName: "Noise" },
        { genreName: "Industrial" },
        { genreName: "Spoken Word" }
    ];

    if (type == "Rock") {
        genres = rockGenres;
    } else if (type == "Pop") {
        genres = popGenres;
    } else if (type == "Electronic") {
        genres = electronicGenres;
    } else if (type == "HipHop") {
        genres = rapGenres;
    } else if (type == "Classical") {
        genres = classicalGenres;
    } else if (type == "Jazz") {
        genres = jazzbluesGenres;
    } else if (type == "Country") {
        genres = countryGenres;
    } else if (type == "World") {
        genres = worldGenres;
    } else if (type == "Other") {
        genres = otherGenres;
    }


    return (
        <>
            <BackBtn />
            <div className="flex justify-center mb-24">
                <SubGenreList
                    genres={genres}
                />
                <Continue />
            </div>

        </>
    )
}

export default GenreSelection