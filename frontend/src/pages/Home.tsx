import AddTripBtn from "@/components/shared/AddTripBtn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlacesStore } from "../../store/Places.store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BookTripDialog from "@/components/shared/BookTripDialog";
import { Loader2 } from "lucide-react";
import { Place } from "types/types";
function Home() {
  const { fetchPlaces, places, error, loading } = usePlacesStore();
  const [selectedPlace, setselectedPlace] = useState<Place | null>(null);
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);
  return (
    <div className="h-screen">
      <div className="flex justify-end h-12 items-center mt-3">
        <AddTripBtn />
      </div>
      {!loading && !error ? (
        <ScrollArea>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {places.map((place) => (
              <div
                key={place._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={place.image[0]}
                  alt={place.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <h2 className="text-lg font-semibold">{place.name}</h2>
                <p className="text-gray-600">
                  {place.city}, {place.state}, ({place.country})
                </p>
                <p className="text-gray-600">{place.description}</p>
                <BookTripDialog selectedPlace={selectedPlace}>
                  <Button
                    onClick={() => setselectedPlace(place)}
                    variant={"secondary"}
                    className="w-full mt-4 bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-500 cursor-pointer"
                  >
                    Book Trip
                  </Button>
                </BookTripDialog>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        loading && (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="size-24 text-green-500 animate-spin" />
          </div>
        )
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Home;
