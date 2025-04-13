import { Place, Booking } from "types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarSearch } from "lucide-react";

function InputContent({ selectedPlace }: { selectedPlace: Place }) {
  const [input, setinput] = useState<Booking>({
    name: "",
    email: "",
    phone: "",
    startDate: new Date(),
    endDate: new Date(),
    people: 0,
    place: selectedPlace,
    referenceId: "",
    _id: "",
  });
  return (
    selectedPlace && (
      <ScrollArea>
        <div className="p-2 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label className="ml-2">Name</Label>
              <Input
                placeholder="John Doe"
                value={input.name}
                onChange={(e) => setinput({ ...input, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="ml-2">Email</Label>
              <Input
                placeholder="john.doe@me.com"
                value={input.email}
                type="email"
                onChange={(e) => setinput({ ...input, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label className="ml-2">Phone</Label>
              <Input
                placeholder="123456789"
                value={input.phone}
                onChange={(e) => setinput({ ...input, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="ml-2">Number of People</Label>
              <Input
                type="number"
                placeholder="4 - 5"
                value={input.people}
                min={1}
                max={10}
                onChange={(e) =>
                  setinput({ ...input, people: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Start date */}
            <div className="flex flex-col gap-2">
              <Label className="ml-2">Start Date</Label>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !input.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarSearch className="mr-2 h-4 w-4" />
                    {input.startDate
                      ? new Date(input.startDate).toDateString()
                      : "Pick a Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    disabled={(date) => date < new Date()}
                    selected={input.startDate}
                    onSelect={(date) =>
                      date && setinput({ ...input, startDate: new Date(date) })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <Label className="ml-2">End Date</Label>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !input.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarSearch className="mr-2 h-4 w-4" />
                    {input.startDate
                      ? new Date(input.endDate).toDateString()
                      : "Pick a Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    disabled={(date) => date < input.startDate}
                    selected={input.endDate}
                    onSelect={(date) =>
                      date && setinput({ ...input, endDate: new Date(date) })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>{" "}
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-emerald-700 to-green-500 text-white py-2 rounded-md"
            onClick={() => console.log(input)}
          >
            Book Now
          </Button>
        </div>
      </ScrollArea>
    )
  );
}

export default InputContent;
