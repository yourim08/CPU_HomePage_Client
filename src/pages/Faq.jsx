import { useState } from 'react';
import styled from 'styled-components';
import Vector from '../assets/Vector.svg';
import Vector1 from '../assets/Vector1.svg';

const Layout = styled.div`
  height: ${props => props.theme.vh(850)};
  background-color: #04001B;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.vh(80)} ${props => props.theme.vw(20)};
  margin: 0;
  box-sizing: border-box;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.vh(68)};
`;

const MainTitle = styled.h1`
  font-family: 'NexonLv2Gothic', sans-serif;
  color: #19D0A3;
  margin-bottom: ${props => props.theme.vh(34)};
  font-size: ${props => props.theme.vw(50)};
  font-weight: 600; 
  letter-spacing: ${props => props.theme.vw(2)};
`;

const SubTitle = styled.p`
  font-family: 'NexonLv2Gothic', sans-serif;
  color: #cdcdcd;
  font-size: ${props => props.theme.vw(24)};
  font-weight: 400; 
  line-height: ${props => props.theme.vh(30)};
  margin: 0;
`;

const ListGroup = styled.div`
  width: 100%;
  max-width: ${props => props.theme.vw(1124)};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.vh(25)};
`;

const Card = styled.div`
  background-color: #363349;
  border-radius: ${props => props.theme.vw(8)};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 ${props => props.theme.vh(4)} ${props => props.theme.vw(20)} rgba(0, 0, 0, 0.4);
  
  /* --- 애니메이션 핵심: 닫혔을 때와 열렸을 때의 높이 차이 --- */
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: ${props => (props.$isOpen ? props.theme.vh(600) : props.theme.vh(90))};
`;

const Trigger = styled.button`
  width: 100%;
  height: ${props => props.theme.vh(90)};
  padding: 0 ${props => props.theme.vw(40)} 0 ${props => props.theme.vw(40)}; 
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: ${props => props.theme.vw(20)};
  font-weight: 500;
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
  
  padding: 0 ${props => props.theme.vw(37)} ${props => props.theme.vh(24)} ${props => props.theme.vw(40)};
`;

const Answer = styled.div`
  color: #fff;
  font-weight: 300;
  font-size: ${props => props.theme.vw(18)};
  line-height: 1.6;
  border-top: 1.5px solid rgba(255, 255, 255, 0.6);
  padding-top: ${props => props.theme.vh(24)};
`;

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <Card $isOpen={isOpen}>
      <Trigger onClick={onClick}>
        <span>{question}</span>
        <IconBox>
          <Arrow 
            src={isOpen ? Vector1 : Vector} 
            alt="toggle arrow"
          />
        </IconBox>
      </Trigger>
      <ContentArea $isOpen={isOpen}>
        <Answer>
          {answer}
        </Answer>
      </ContentArea>
    </Card>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "CPU는 무엇을 하는 동아리인가요?",
      answer: "CPU에서는 프로그래밍 언어 학습, 공모전 및 해커톤 참가, 전공 스터디, 동아리 자체 프로젝트, 타 동아리와 협력 프로젝트, 학년별 IT쇼 전시 등 다양한 활동을 합니다!"
    },
    {
      question: "CPU에 지원하는 방법이 궁금해요!",
      answer: "CPU 웹사이트를 통해 지원 가능합니다!"
    },
    {
      question: "면접에서 전공 질문 수준이 어느정도인가요?",
      answer: "정말 기초적인 수준이니 부담 갖지 마시고 편하게 지원해주세요!"
    },
    {
      question: "이외의 궁금한 사항은 어디에 문의하면 될까요?",
      answer: "CPU 웹사이트의 QnA 게시판을 이용하시거나, 인스타(@cpu_mirim)로 문의해 주세요!"
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <Header>
        <MainTitle>FAQ</MainTitle>
        <SubTitle>CPU에 대한 궁금증을 해소해드리겠습니다</SubTitle>
      </Header>

      <ListGroup>
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </ListGroup>
    </Layout>
  );
};

export default Faq;