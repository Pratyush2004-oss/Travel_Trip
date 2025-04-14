import { Button } from "../ui/button";
import ViewTripDialog from "./ViewTripDialog";

function Header() {
  return (
    <div className="flex items-center justify-between h-12 border-b pr-3">
      <h1 className="text-2xl font-bold font-mono bg-gradient-to-r from-emerald-900 via-emerald-600 to-green-500 bg-clip-text text-transparent">
        Travel-<span className="">Manager</span>
      </h1>
      <ViewTripDialog>
        <Button
          variant={"outline"}
          size={"sm"}
          className="text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-500 text-white cursor-pointer"
        >
          View Your Trip
        </Button>
      </ViewTripDialog>
    </div>
  );
}

export default Header;
