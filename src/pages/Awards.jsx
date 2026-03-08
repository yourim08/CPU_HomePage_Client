import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import lineImg from "../assets/awards/line_icon.png";
import UserIcon from "../assets/icons/user_icon.svg";
import AwardIcon from "../assets/icons/award_icon.svg";

// 상장 이미지 임포트
import award1 from "../assets/awards/14th e-ICON World Contest_동상.png";
import award2 from "../assets/awards/2024 K-디지털 플랫폼 앱잼_장려상.png";
import award3 from "../assets/awards/2024 관악구 표창장.png";
import award4 from "../assets/awards/2024 학교연합 로봇AI캠프_장려상.png";
import award5 from "../assets/awards/2024미림소프트웨어챌린지_개발부문2위.png";
import award6 from "../assets/awards/2024미림소프트웨어챌린지_기획부문3위.png";
import award7 from "../assets/awards/2025 과학 독후감 대회 우수상.png";
import award8 from "../assets/awards/2025 미림 전교회장 당선증.png";
import award9 from "../assets/awards/2024 미림 표창장.png";
import award10 from "../assets/awards/2024 Certificate of achievement 수여증.png";
import award11 from "../assets/awards/28회앱잼_최우수상.png";
import award12 from "../assets/awards/과목별 교과 우수상.png";
import award13 from "../assets/awards/미림소프트웨어챌린지 개발부문3위.png";
import award14 from "../assets/awards/Australia.jpeg";
import award15 from "../assets/awards/2학년 1학기 전과목 교과우수상_전유림.png";
import award16 from "../assets/awards/전교부회장.jpeg";
import award17 from "../assets/awards/1학년 회장 임명장_신채은.jpeg";
import award18 from "../assets/awards/2학년 회장 임명장_신채은.jpeg";
import award19 from "../assets/awards/1학년_선행상_신채은.jpeg";
import award20 from "../assets/awards/2학년_선행상_신채은.jpeg";
import award21 from "../assets/awards/2학년교과우수상_신채은.jpeg";
import award22 from "../assets/awards/esg.svg";
import award23 from "../assets/awards/ai_genius.png";
import award24 from "../assets/awards/2학년교과우수상_조현진.jpeg";
import award25 from "../assets/awards/영마이스터.png";
import award26 from "../assets/awards/2학년 2학기 전과목 교과우수상_전유림.jpeg"

const awardsData = [
  { id: 1, image: award9, date: "2024.05.10", title: "1학년 봉사상", person: "전유림" },
  { id: 2, image: award8, date: "2025.07.21", title: "2025 전교회장 당선증", person: "전유림" },
  { id: 3, image: award16, date: "2025.07.21", title: "2025 전교부회장 당선증", person: "육준성" },

  { id: 4, image: award25, date: "2025.11.12", title: "제 16회 전국 영마이스터 학술제 동상", person: "전유림, 육준성" },

  { id: 5, image: award3, date: "2024.05.31", title: "관악구 표창장", person: "이소리" },
  { id: 6, image: award10, date: "2024.12.07", title: "2024 태국 글로벌 인턴십 수료증", person: "전유림" },
  { id: 7, image: award14, date: "2026.02.06", title: "2025 호주 글로벌 인턴십 수료증", person: "전유림" },
  { id: 8, image: award1, date: "2024.08.08", title: "제 14회 e-ICON 3위", person: "이소리", appName: "SkillSprint" },
  { id: 9, image: award11, date: "2024.12.22", title: "제 28회 앱잼 최우수상", person: "전유림", appName: "HousePick" },
  { id: 10, image: award2, date: "2024.08.06", title: "K-디지털 플랫폼 앱잼 장려상", person: "이소리", appName: "워커쉴드" },
  { id: 11, image: award15, date: "2025.08.10", title: "2학년 1학기 전과목 교과 우수상", person: "전유림" },
  { id: 12, image: award26, date: "2026.01.22", title: "2학년 2학기 전과목 교과 우수상", person: "전유림" },
  { id: 13, image: award5, date: "2024.11.25", title: "2024 SW 챌린지 개발부문 2위", person: "전유림", appName: "너겟" },
  { id: 14, image: award6, date: "2024.11.25", title: "2024 SW 챌린지 기획부문 3위", person: "전유림", appName: "PhotoDrop" },
  { id: 15, image: award13, date: "2025.12.22", title: "2025 SW 챌린지 개발부문 3위", person: "신채은", appName: "온말" },
  { id: 16, image: award4, date: "2024.12.12", title: "2024 학교 연합 로봇 AI 캠프", person: "전유림" },

  { id: 17, image: award22, date: "2025.07.22", title: "AI ESG SCHOOL 수료증", person: "전유림" },
  { id: 18, image: award23, date: "2025.07.22", title: "AI GENIUS ACADEMY 수료증", person: "전유림" },

  { id: 19, image: award12, date: "2025.01.23", title: "2학년 교과 우수상", person: "이소리" },
  { id: 20, image: award21, date: "2026.01.22", title: "2학년 교과 우수상", person: "신채은" },
  { id: 21, image: award24, date: "2026.01.22", title: "2학년 교과 우수상", person: "조현진" },
  { id: 22, image: award19, date: "2024.07.19", title: "1학년 선행상", person: "신채은" },
  { id: 23, image: award20, date: "2025.06.02", title: "2학년 선행상", person: "신채은" },
  { id: 24, image: award7, date: "2025.06.02", title: "과학독후감대회 우수상", person: "전유림" },
  { id: 25, image: award17, date: "2025.03.24", title: "1학년 회장 임명장", person: "신채은" },
  { id: 26, image: award18, date: "2024.03.25", title: "2학년 회장 임명장", person: "신채은" },
];

const spin = keyframes`
from { transform: translateX(0); }
to { transform: translateX(-33.333%); }
`;

const Container = styled.div`
  font-family: "NexonLv2Gothic";
  background: #04001B;
  text-align: center;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
  height: ${props => props.theme.vh(1200)};
`;

const Title = styled.h1`
  font-family: "NexonLv2Gothic", sans-serif;
  color: #19d0a3;
  margin-top: ${props => props.theme.vh(100)};
  font-size: ${props => props.theme.vw(50)};
  font-weight: 600;
`;

const Text = styled.p`
  font-family: "NexonLv2Gothic", sans-serif;
  margin-top: ${props => props.theme.vh(34)};
  color: #cdcdcd;
  font-size: ${props => props.theme.vw(24)};
  font-weight: 400;
`;

const Carousel = styled.div`
  margin: ${props => props.theme.vh(80)} auto;
  width: 100%;
  padding-top: ${props => props.theme.vh(80)};
  overflow-x: auto;
  white-space: nowrap;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.vw(80)};
  width: max-content;
  padding-left: 5.5em;
  animation: ${spin} 60s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
`;

const Group = styled.div`
  display: flex;
  gap: ${props => props.theme.vw(80)};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 ${props => props.theme.vw(330)};
  position: relative;
  z-index: ${({ $selected }) => ($selected ? 10 : 1)};
  transform-origin: center;
  transform: ${({ $selected }) => ($selected ? `scale(${1.1})` : "scale(1)")};
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.theme.vh(471)};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const Image = styled.img`
  width: 100%;
  height: ${props => props.$isSpecial ? props.theme.vh(234) : "100%"};
  border-radius: ${props => props.theme.vw(8)};
  cursor: pointer;
  display: block;
  object-fit: cover;
`;

const AwardsInfo = styled.div`
  text-align: left;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  margin-top: ${props => props.theme.vh(22)};

  .award-date {
    font-family: "Pretendard", sans-serif;
    font-size: ${props => props.theme.vw(17)};
    font-weight: 400; /* Regular */
    color: #CDCDCD;
    margin: 0;
  }

  .award-title {
    font-family: "Pretendard", sans-serif;
    font-size: ${props => props.theme.vw(18)};
    font-weight: 600;
    color: #FFFFFF;
    margin: ${props => props.theme.vh(6)} 0 0 0;
    white-space: normal; /* 제목이 길 경우 줄바꿈 허용 */
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(17, 17, 17, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  transition: opacity 250ms ease;
  border-radius: ${props => props.theme.vw(8)};
  pointer-events: none;
`;

const OverlayText = styled.div`
  transform: ${({ $selected }) => ($selected ? `scale(${1 / 1.1})` : "scale(1)")};
  transform-origin: center;
  color: #fff;
  text-align: center;
  h3, p { margin: 0; }
  .title { font-size: ${props => props.theme.vw(24)}; font-weight: 700; }
  .date { margin-top: ${props => props.theme.vh(12)}; font-size: ${props => props.theme.vw(16)}; font-weight: 400; }
`;

const IconRow = styled.div`
  margin-top: ${props => props.theme.vh(27.5)};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.vw(13)};
  font-size: ${props => props.theme.vw(16)};
  font-weight: 400;
`;

const Icon = styled.img`
  width: ${props => props.theme.vw(25)};
  height: ${props => props.theme.vw(25)};
  object-fit: contain;
  display: block;
`;

const LineImg = styled.img`
  width: ${props => props.theme.vw(316)};
  height: ${props => props.theme.vh(2)};
  margin: ${props => props.theme.vh(28)} auto 0 auto;
  display: block;
  object-fit: contain;
`;

const Awards = () => {
  const [hoveredAward, setHoveredAward] = useState(null);
  const carouselRef = useRef(null);
  const loopData = [...awardsData, ...awardsData, ...awardsData];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carousel.scrollLeft = scrollLeft - (scrollWidth / 3);
      } else if (scrollLeft <= 10) {
        carousel.scrollLeft = scrollLeft + (scrollWidth / 3);
      }
    };
    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Title>Awards</Title>
      <Text>CPU의 수상내역입니다</Text>
      <Carousel ref={carouselRef}>
        <Slide $paused={!!hoveredAward}>
          <Group>
            {loopData.map((award, index) => {
              const isHovered = hoveredAward === index;
              const isSpecial = award.id === 4 || award.id === 17 || award.id === 18;

              return (
                <Card
                  key={`${award.id}-${index}`}
                  $selected={isHovered}
                  onMouseEnter={() => setHoveredAward(index)}
                  onMouseLeave={() => setHoveredAward(null)}
                >
                  <ImageWrapper>
                    <Image 
                      src={award.image} 
                      alt={award.title} 
                      $isSpecial={isSpecial} 
                    />
                    <CardOverlay $selected={isHovered}>
                      <OverlayText $selected={isHovered}>
                        <h3 className="title">{award.title}</h3>
                        <p className="date">{award.date}</p>
                        <LineImg src={lineImg} alt="divider line" />
                        {award.appName && (
                          <IconRow>
                            <Icon src={AwardIcon} />
                            <span>{award.appName}</span>
                          </IconRow>
                        )}
                        <IconRow>
                          <Icon src={UserIcon} />
                          <span>{award.person}</span>
                        </IconRow>
                      </OverlayText>
                    </CardOverlay>
                  </ImageWrapper>
                  <AwardsInfo $hidden={isHovered}>
                    <p className="award-date">{award.date}</p>
                    <h3 className="award-title">{award.title}</h3>
                  </AwardsInfo>
                </Card>
              );
            })}
          </Group>
        </Slide>
      </Carousel>
    </Container>
  );
};

export default Awards;