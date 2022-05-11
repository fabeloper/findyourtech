import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './pages/Upload/';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
