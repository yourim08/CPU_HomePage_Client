import { useState, useEffect } from 'react';
import { postQuestion } from '../lib/api';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import Navbar from "../components/Navbar.jsx";

// ── Layout ────────────────────────────────────────────────
const Page = styled.div`
  background-color: #04001B;
  width: 100%;
`;

// ── Hero ──────────────────────────────────────────────────
const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.vh(200)};
  gap: ${props => props.theme.vh(20)};
`;

const Title = styled.h1`
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(88)};
  font-weight: 700;
  color: #19d0a3;
  margin: 0;
  line-height: normal;
`;

const Subtitle = styled.p`
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(24)};
  font-weight: 500;
  color: #cdcdcd;
  margin: 0;
`;

const AskButton = styled.button`
  margin-top: ${props => props.theme.vh(70)};
  padding: ${props => props.theme.vh(24)} ${props => props.theme.vw(72)};
  background-color: #19d0a3;
  border-radius: ${props => props.theme.vw(35)};
  color: #04001B;
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(27)};
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #14b991;
  }
`;

// ── Question Label ────────────────────────────────────────
const QuestionLabel = styled.div`
  align-self: flex-start;
  margin-left: ${props => props.theme.vw(392)};
  margin-top: ${props => props.theme.vh(60)}; 
  
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(22)};
  font-weight: 600;
  color: #ffffff;
`;

const Required = styled.span`
  color: #FC6340;
`;

// ── Input Box ──────────────────────────────────
const QuestionInput = styled.input`
  width: ${props => props.theme.vw(1180)};
  height: ${props => props.theme.vh(86)};
  background-color: #363349;
  border-radius: ${props => props.theme.vw(20)};
  margin-left: ${props => props.theme.vw(370)};
  align-self: flex-start;
  
  /* 텍스트 입력 스타일 */
  padding: 0 ${props => props.theme.vw(30)};
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.8);
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(20)};
  font-weight: 400;
  outline: none;

  &::placeholder {
    color: #ababab;
  }
`;

// ── Component ─────────────────────────────────────────────
export default function Question2() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const onScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("질문을 입력해 주세요.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await postQuestion(question);
      navigate('/question');
    } catch (e) {
      setError(e.message || "질문 등록 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Navbar $isVisible={isVisible} onScroll={onScroll} />
      <Hero>
        <Title>Q&A</Title>
        <Subtitle>CPU에 대해 궁금한 것을 질문하세요</Subtitle>
        <QuestionLabel>
          질문 <Required>*</Required>
        </QuestionLabel>
        <QuestionInput
          placeholder="질문 내용을 입력해 주세요."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
        />
        {error && <div style={{ color: '#FC6340', marginTop: 10 }}>{error}</div>}
        <AskButton type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? '질문 등록 중...' : '질문하기'}
        </AskButton>
      </Hero>
    </Page>
  );
}