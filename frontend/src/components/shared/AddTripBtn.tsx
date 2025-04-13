import { Button } from "@/components/ui/button";
import { State, City } from "country-state-city";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_API_URL } from "../../../contants/api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Place } from "../../../types/types";
import { Textarea } from "../ui/textarea";
import { Loader, X } from "lucide-react";
function AddTripBtn() {
  const selectedCountryCode = "IN";
  const [selectedState, setselectedState] = useState("");
  const [images, setimages] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const [input, setinput] = useState<Place>({
    name: "",
    city: "",
    description: "",
    image: [],
    country: "India",
    state: "",
    _id: "",
  });

  const addImage = async (image: string) => {
    if (!image) return;

    // check whether the URL pasted is valid
    try {
      setinput({
        ...input,
        image: [...input.image, image],
      });
      setimages("");
    } catch (error) {
      console.log("Error in adding image : " + error);
      return;
    }
  };

  const onSubmit = async () => {
    try {
      if (!input.name || !input.city || !input.state || !input.description)
        return toast.error("Please fill all the fields");

      if (input.image.length === 0)
        return toast.error("Please add at least one image");
      setloading(true);
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/places/`,
        input
      );
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      setinput({
        name: "",
        city: "",
        description: "",
        image: [],
        country: "India",
        state: "",
        _id: "",
      });
      setselectedState("");
      setimages("");
      setopenDialog(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setopenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Add Tourist Place
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tourist Place</DialogTitle>
        </DialogHeader>
        {/* Name of the place */}
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label className="ml-2">Name</Label>
            <Input
              placeholder="Enter place name"
              className="col-span-3"
              value={input.name}
              onChange={(e) => setinput({ ...input, name: e.target.value })}
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-2">
            <Label className="ml-2">State</Label>
            <Select
              onValueChange={(state) => {
                setselectedState(state);
                setinput({
                  ...input,
                  state:
                    State.getStateByCodeAndCountry(state, selectedCountryCode)
                      ?.name ?? "",
                });
              }}
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {State.getStatesOfCountry(selectedCountryCode).map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <Label className="ml-2">City</Label>
            <Select onValueChange={(city) => setinput({ ...input, city })}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {City.getCitiesOfState(selectedCountryCode, selectedState).map(
                  (city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label className="ml-2">Description</Label>
            <Textarea
              aria-describedby="description"
              placeholder="Enter Description"
              className="col-span-3"
              value={input.description}
              onChange={(e) =>
                setinput({ ...input, description: e.target.value })
              }
            />
          </div>

          {/* Adding Image URL */}
          <div className="flex flex-col gap-2 relative">
            <Label className="ml-2">Image URLs</Label>
            <Input
              placeholder="Enter Image Url"
              className="col-span-3"
              value={images}
              onChange={(e) => setimages(e.target.value)}
            />
            <div className="absolute right-0 top-5.5">
              <Button
                disabled={!images}
                onClick={() => addImage(images)}
                size={"icon"}
                variant={"outline"}
                className="cursor-pointer bg-green-500"
              >
                +
              </Button>
            </div>
          </div>

          {/* Displaying Images which were added */}
          {input.image.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {input.image.map((image, idx) => (
                <div key={idx} className="relative p-1">
                  <img
                    src={image}
                    alt="Image"
                    width={100}
                    height={100}
                    className="rounded-full size-16"
                  />
                  <X
                    className="absolute top-0 right-0 size-5"
                    onClick={() =>
                      setinput({
                        ...input,
                        image: input.image.filter((_, i) => i !== idx),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500">No Images Added yet</div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={loading || !input.image.length}>
            {loading ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTripBtn;
