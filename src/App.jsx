import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Orders from "./screens/Orders";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
