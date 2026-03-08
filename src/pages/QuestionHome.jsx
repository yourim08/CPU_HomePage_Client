import { useState, useEffect } from 'react';
import { fetchQuestions, fetchQuestionDetail } from '../lib/api';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import Navbar from "../components/Navbar.jsx";
import Vector from '../assets/Vector.svg';
import Vector1 from '../assets/Vector1.svg';

// 질문 목록은 API에서 받아옴

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
  margin-top: ${props => props.theme.vh(35)};
  padding: ${props => props.theme.vh(21)} ${props => props.theme.vw(63)};
  background-color: #19d0a3;
  border-radius: ${props => props.theme.vw(35)};
  color: #04001B;
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(24)};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #14b991;
  }
`;

// ── FAQ List (새로운 스타일 적용) ───────────────────────────
const FaqList = styled.div`
  width: 100%;
  max-width: ${props => props.theme.vw(1124)};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.vh(20)};
  /* 질문하기 버튼으로부터 80px 떨어진 곳에서 시작 */
  margin: ${props => props.theme.vh(80)} auto ${props => props.theme.vh(80)};
`;

const Card = styled.div`
  background-color: #363349;
  border-radius: ${props => props.theme.vw(8)};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 ${props => props.theme.vh(4)} ${props => props.theme.vw(20)} rgba(0, 0, 0, 0.4);
  
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: ${props => (props.$isOpen ? props.theme.vh(600) : props.theme.vh(88))};
`;

const Trigger = styled.button`
  width: 100%;
  height: ${props => props.theme.vh(88)};
  padding: 0 ${props => props.theme.vw(40)} 0 ${props => props.theme.vw(40)}; 
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-family: 'NexonLv2Gothic', sans-serif;
  font-size: ${props => props.theme.vw(20)};
  font-weight: 600;
  text-align: left;
  transition: background-color 0.4s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const IconBox = styled.div`
  width: ${props => props.theme.vw(36)};
  height: ${props => props.theme.vw(36)}; 
  border-radius: 50%;
  background-color: #2d5a4a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Arrow = styled.img`
  width: ${props => props.theme.vw(16)};
  height: ${props => props.theme.vw(16)};
`;

const ContentArea = styled.div`
  opacity: ${props => (props.$isOpen ? "1" : "0")};
  transition: opacity 0.5s ease;
  padding: 0 ${props => props.theme.vw(40)} ${props => props.theme.vh(24)} ${props => props.theme.vw(40)};
`;

const AnswerText = styled.div`
  color: #fff;
  font-family: 'NexonLv2Gothic', sans-serif;
  font-weight: 500;
  font-size: ${props => props.theme.vw(18)};
  line-height: 1.6;
  border-top: 1.5px solid rgba(255, 255, 255, 0.6);
  padding-top: ${props => props.theme.vh(24)};
  white-space: pre-line;
`;

// ── Component ─────────────────────────────────────────────
export default function QuestionHome() {
  const [questions, setQuestions] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchQuestions().then(setQuestions).catch(() => setQuestions([]));
  }, []);

  const toggle = async (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    if (!answers[id]) {
      setLoading(true);
      try {
        const detail = await fetchQuestionDetail(id);
        setAnswers((prev) => ({ ...prev, [id]: detail }));
      } catch {
        setAnswers((prev) => ({ ...prev, [id]: null }));
      } finally {
        setLoading(false);
      }
    }
  };

  const onScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Page>
      <Navbar $isVisible={isVisible} onScroll={onScroll} />
      <Hero>
        <Title>Q&A</Title>
        <Subtitle>CPU에 대해 궁금한 것을 질문하세요</Subtitle>
        <AskButton type="button" onClick={() => navigate('/question2')}>질문하기</AskButton>
      </Hero>
      <FaqList>
        {questions.map((q) => {
          const isOpen = openId === q.id;
          const answer = answers[q.id]?.answer;
          return (
            <Card key={q.id} $isOpen={isOpen}>
              <Trigger onClick={() => toggle(q.id)}>
                <span>{q.question}</span>
                <IconBox>
                  <Arrow src={isOpen ? Vector : Vector1} alt="toggle arrow" />
                </IconBox>
              </Trigger>
              <ContentArea $isOpen={isOpen}>
                <AnswerText>
                  {loading && isOpen ? '불러오는 중...' : (answer ? answer : '답변 대기중입니다!')}
                </AnswerText>
              </ContentArea>
            </Card>
          );
        })}
      </FaqList>
    </Page>
  );
}