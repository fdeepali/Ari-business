import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UrlStats from './pages/UrlStats'
import ContactFormSubmissions from './pages/ContactFormSubmissions'
import QuesionnaireSubmissions from './pages/QuesionnaireSubmissions'
import ContactForm from './pages/ContactForm'
import Questionnaire from './pages/Quesionnaire'
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<UrlStats />} />
          <Route path="/contact-forms" element={<ContactFormSubmissions />} />
          <Route path="/contact-forms/:id" element={<ContactForm />} />
          <Route path="/questionnaires" element={<QuesionnaireSubmissions />} />
          <Route path="/questionnaires/:id" element={<Questionnaire />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
