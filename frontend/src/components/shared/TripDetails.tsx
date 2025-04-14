import { Booking } from "types/types";

function TripDetails({ trip }: { trip: Booking }) {
  return (
    <div className="flex flex-col gap-2 text-lg">
      <h1 className="font-bold text-xl border-b-4 border-emerald-500 px-1">
        Details
      </h1>
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Name:</h1> <p>{trip.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Email:</h1> <p>{trip.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Phone:</h1> <p>{trip.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Start Date:</h1>{" "}
          <p>{trip.startDate.toString().split("T")[0]}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold">End Date:</h1>{" "}
          <p>{trip.startDate.toString().split("T")[0]}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold">No. of People:</h1> <p>{trip.people}</p>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
