import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/shared/Header";

function App() {
  return (
    <div className="min-h-screen p-3 px-5 max-w-7xl mx-auto w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
