import { Place } from "types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { MapPin } from "lucide-react";
function PlaceDetails({ selectedPlace }: { selectedPlace: Place | null }) {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-3">
        {selectedPlace?.name}
      </h1>
      <Carousel>
        <CarouselContent>
          {selectedPlace?.image.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <img
                src={image}
                alt={selectedPlace?.name}
                height={400}
                width={400}
                className="h-52 md:h-64 w-full object-cover"
              />
              <div className="absolute z-10 -bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="font-bold text-white">
                  {index + 1}/{selectedPlace?.image.length}
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="flex items-center mt-4 gap-2 text-xl font-bold ">
        <MapPin className="mt-1" />
        <span>
          {selectedPlace?.city},{selectedPlace?.state}, (
          {selectedPlace?.country})
        </span>
      </p>
      <p className="mt-2 ml-2">
        <strong className="text-lg font-mono">Description:</strong>{" "}
        {selectedPlace?.description}
      </p>
    </div>
  );
}

export default PlaceDetails;
