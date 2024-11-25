import SearchPage from "./SearchPage"
import ManualPage from "./ManualPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/man/:section/:name" element={<ManualPage />} />
      </Routes>
  </Router>
  )
}

export default App
