import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Place } from "types/types";
import InputContent from "./InputContent";
import PlaceDetails from "./PlaceDetails";

function BookTripDialog({
  children,
  selectedPlace,
}: {
  children: React.ReactNode;
  selectedPlace: Place | null;
}) {
  const [openDialog, setopenDialog] = useState<boolean>(false);
  return (
    <Dialog open={openDialog} onOpenChange={setopenDialog}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Trip</DialogTitle>
        </DialogHeader>
        <PlaceDetails selectedPlace={selectedPlace} />
        {selectedPlace && <InputContent selectedPlace={selectedPlace} />}
      </DialogContent>
    </Dialog>
  );
}

export default BookTripDialog;
