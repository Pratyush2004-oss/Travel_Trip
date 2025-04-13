import AddTripBtn from "@/components/shared/AddTripBtn";

function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-end h-12 items-center">
        <AddTripBtn />
      </div>
    </div>
  );
}

export default Home;
