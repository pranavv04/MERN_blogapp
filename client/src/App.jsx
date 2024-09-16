import { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import CreateBlog from './components/CreateBlog'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import SingleBlog from './components/SingleBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar at the top */}
          <Navbar />

          {/* Main content */}
          <div className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create-blog' element={<CreateBlog />} />
              <Route path='/singleblog/:id' element={<SingleBlog />} />
            </Routes>
          </div>

          {/* Footer at the bottom */}
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
