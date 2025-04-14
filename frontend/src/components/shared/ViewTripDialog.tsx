import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Booking } from "types/types";
import axios from "axios";
import { BASE_API_URL } from "../../contants/api";
import { toast } from "sonner";
import PlaceDetails from "./PlaceDetails";
import TripDetails from "./TripDetails";

function ViewTripDialog({ children }: { children: React.ReactElement }) {
  const [open, setopen] = useState(false);
  const [input, setinput] = useState({
    referenceId: "",
    email: "",
  });
  const [loading, setloading] = useState(false);
  const [fetchedData, setfetchedData] = useState<Booking | null>(null);
  const handleSubmit = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/bookings/getById`,
        input
      );
      if (response.status === 404) throw new Error(response.data.message);
      setfetchedData(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  const handleDownload = () => {
    // Get the window print of the current page
    window.print();
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setopen(!open);
        setinput({
          referenceId: "",
          email: "",
        });
        setfetchedData(null);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Your Trip</DialogTitle>
        </DialogHeader>
        {fetchedData ? (
          <>
            <div id="print-area">
              <PlaceDetails selectedPlace={fetchedData.place} />
              <TripDetails trip={fetchedData} />
            </div>
            <Button onClick={handleDownload}>Download</Button>
          </>
        ) : (
          <div className="grid mt-3 grid-cols-1 gap-3">
            <div className="flex flex-col gap-1">
              <Label>Reference Number</Label>
              <Input
                placeholder="Enter Reference Number"
                value={input.referenceId}
                onChange={(e) =>
                  setinput({ ...input, referenceId: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={input.email}
                onChange={(e) => setinput({ ...input, email: e.target.value })}
              />
            </div>
            <Button
              className="cursor-pointer rounded-full"
              onClick={handleSubmit}
            >
              {loading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewTripDialog;
