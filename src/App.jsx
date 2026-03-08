import './App.css'
import { Routes, Route } from "react-router-dom";
import Main from './pages/Main.jsx'
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Project from './pages/Project';
import QuestionHome from './pages/QuestionHome';
import Question2 from './pages/Question2';
import ApplyForm from './pages/ApplyForm';
import ApplyForm2_NoDorm from './pages/ApplyForm2_NoDorm';
import ApplyForm2_YesDorm from './pages/ApplyForm2_YesDorm';
import NotFound from './pages/NotFound';
import Member from './pages/Member.jsx';
import ScrollToTop from './styles/ScrollToTop.js'; // 이미 import는 잘 되어 있네요!


function App() {

  return (
    <ThemeProvider theme={theme}>
      {/* 1. Routes 외부에 배치하여 경로 변경 시마다 실행되게 합니다 */}
      <ScrollToTop /> 
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project" element={<Project />} />
        <Route path="/members" element={<Member />} />
        <Route path="/question" element={<QuestionHome />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/apply/no-dorm" element={<ApplyForm2_NoDorm />} />
        <Route path="/apply/yes-dorm" element={<ApplyForm2_YesDorm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App