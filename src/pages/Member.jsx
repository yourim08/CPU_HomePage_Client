import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../components/Navbar.jsx";

// 이미지 임포트
import team09_1 from "../assets/member/9기_전유림.svg";
import team09_2 from "../assets/member/9기_육준성.svg";
import team09_3 from "../assets/member/9기_이상희.svg";
import team09_4 from "../assets/member/9기_신채은.svg";
import team09_5 from "../assets/member/9기_조현진.svg";
import team09_6 from "../assets/member/9기_정다운.svg";
import team10_1 from "../assets/member/10기_정재희.svg";
import team10_2 from "../assets/member/10기_이연수.svg";
import team10_3 from "../assets/member/10기_이건우.svg";
import team10_4 from "../assets/member/10기_방예린.svg";
import team10_5 from "../assets/member/10기_최명준.svg";
import team10_6 from "../assets/member/10기_안이현.svg";

const team09Data = [
  { id: 1, image: team09_1, name: "전유림", motto: "이타의 가치를\n코드로 실현하는 개발자,\n전유림입니다!" },
  { id: 2, image: team09_2, name: "육준성", motto: "완성에 그치지 않고\n계속 업데이트 하는 개발자,\n육준성입니다!" },
  { id: 3, image: team09_3, name: "이상희", motto: "기술과 사람을\n연결하는 개발자,\n이상희입니다!" },
  { id: 4, image: team09_4, name: "신채은", motto: "세계를 이해하는 개발자,\n신채은입니다!" },
  { id: 5, image: team09_5, name: "조현진", motto: "작은 호기심에서 시작해\n큰 가치를 만드는 개발자,\n조현진입니다!" },
  { id: 6, image: team09_6, name: "정다운", motto: "문제를 발견하고 해결할 때\n기쁨을 얻는 개발자,\n정다운입니다!" },
];

const team10Data = [
    { id: 1, image: team10_1, name: "정재희", motto: "사용자에게 가치있는 것을\n개발하는 개발자,\n정재희입니다!" },
    { id: 2, image: team10_2, name: "이연수", motto: "성실함을 기반으로\n성장하며 소프트웨어\n세계를 탐험하는 개발자,\n이연수입니다!" },
    { id: 3, image: team10_3, name: "이건우", motto: "계속 성장하는 개발자,\n이건우입니다!" },
    { id: 4, image: team10_4, name: "방예린", motto: "작은 코드 한 줄로\n큰 가치를 만드는 개발자,\n방예린입니다!" },
    { id: 5, image: team10_5, name: "최명준", motto: "호기심으로 시작해\n답을 찾아 노력하는 개발자,\n최명준입니다!" },
    { id: 6, image: team10_6, name: "안이현", motto: "시각적인 즐거움을 넘어\n편리한 일상을 설계하는 \n디자이너, 안이현입니다!!" },
];

const marginList = ["161px", "103px", "192px", "135px", "74px", "190px"];

// ── Styles ────────────────────────────────────────────────
const Page = styled.div`
  background-color: #04001B;
  width: 100%;
  min-height: 100vh;
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.vh(170)};
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: ${props => props.theme.vw(46)};
  font-weight: 600;
  color: #19d0a3;
  margin: 0;
`;

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  width: ${props => props.theme.vw(326)};
  height: ${props => props.theme.vh(56)};
  border-radius: ${props => props.theme.vw(240)};
  border: ${props => props.theme.vw(1.6)} solid #19d0a3;
  margin-top: ${props => props.theme.vh(40)};
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
`;

const SlidingBackground = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.$activeTab === '9기' ? '0' : '50%')};
  width: 50%;
  height: 100%;
  border-radius: ${props => props.theme.vw(240)};
  background-color: #19d0a3;
  transition: all 0.3s ease-in-out;
  z-index: 1;
`;

const Tab = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-size: ${props => props.theme.vw(22)};
  font-weight: ${props => (props.$active ? 700 : 400)};
  color: ${props => (props.$active ? '#04001B' : '#FFFFFF')};
  z-index: 2;
  transition: color 0.3s ease;
`;

const MemberSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.vh(80)};
  padding-bottom: ${props => props.theme.vh(100)};
`;

const MemberGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${props => props.theme.vw(38)};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 0, 27, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.theme.vw(20)};
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
`;

const MemberCard = styled.div`
  position: relative;
  width: ${props => props.theme.vw(218)};
  border-radius: 8px;
  height: ${props => props.theme.vh(445)};
  margin-bottom: ${props => props.theme.vh(parseInt(marginList[props.$index]))};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const NameTag = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${props => props.theme.vw(12)};
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: ${props => props.theme.vw(16)};
  color: #FFFFFF;
  z-index: 2;
`;

const PositionText = styled.div`
  position: absolute;
  bottom: ${props => props.theme.vh(34)};
  left: ${props => props.theme.vw(12)};
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: ${props => props.theme.vw(16)};
  color: #19D0a3;
  z-index: 2;
`;

const NameText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: ${props => props.theme.vw(20)};
  color: #FFFFFF;
`;

const Divider = styled.div`
  width: ${props => props.theme.vw(155)};
  height: ${props => props.theme.vh(1)};
  background-color: #FFFFFF;
  margin: ${props => `${props.theme.vh(5)} 0 ${props.theme.vh(20)} 0`};
`;

const MottoText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: ${props => props.theme.vw(16)};
  color: #FFFFFF;
  line-height: 1.5;
  white-space: pre-line;
`;

// ── Component ─────────────────────────────────────────────
export default function Member() {
  const [activeTab, setActiveTab] = useState('9기');
  const [isVisible] = useState(true);

  const currentData = activeTab === '9기' ? team09Data : team10Data;

  const onScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Page>
      <Navbar $isVisible={isVisible} onScroll={onScroll} />
      <Hero>
        <Title>CPU의 부원을 소개합니다</Title>
        <ToggleContainer onClick={() => setActiveTab(prev => prev === '9기' ? '10기' : '9기')}>
          <SlidingBackground $activeTab={activeTab} />
          <Tab $active={activeTab === '9기'}>9기</Tab>
          <Tab $active={activeTab === '10기'}>10기</Tab>
        </ToggleContainer>
      </Hero>

      <MemberSection>
        <MemberGrid>
          {currentData.map((member, index) => (
            <MemberCard key={`${activeTab}-${member.id}`} $index={index}>
              <img src={member.image} alt={member.name} />
              {(index === 0 || index === 1) && (
                <PositionText>{index === 0 ? "부장" : "차장"}</PositionText>
              )}
              <NameTag>{member.name}</NameTag>
              <Overlay>
                <NameText>{member.name}</NameText>
                <Divider />
                <MottoText>{member.motto}</MottoText>
              </Overlay>
            </MemberCard>
          ))}
        </MemberGrid>
      </MemberSection>
    </Page>
  );
}