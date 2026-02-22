import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import lineImg from "../assets/line_icon.png";
import { ReactComponent as UserIcon } from "../assets/icons/user_icon.svg";
import { ReactComponent as AwardIcon } from "../assets/icons/award_icon.svg";

// 상장 수 더 증가 할 수록 새 폴더&파일로 옮겨서 데이터만 따로 관리 필요(폴더 구조 망가질까봐 일단 그냥 여기에 떄려넣음)
import award1 from "../assets/14th e-ICON World Contest_동상.png";
import award2 from "../assets/2024 K-디지털 플랫폼 앱잼_장려상.png";
import award3 from "../assets/2024 관악구 표창장.png";
import award4 from "../assets/2024 학교연합 로봇AI캠프_장려상.png";
import award5 from "../assets/2024미림소프트웨어챌린지_개발부문2위.png";
import award6 from "../assets/2024미림소프트웨어챌린지_기획부문3위.png";
import award7 from "../assets/2025 과학 독후감 대회 우수상.png";
import award8 from "../assets/2025 미림 전교회장 당선증.png";
import award9 from "../assets/2024 미림 표창장.png";
import award10 from "../assets/2024 Certificate of achievement 수여증.png";
import award11 from "../assets/28회앱잼_최우수상.png";
import award12 from "../assets/과목별 교과 우수상.png";
import award13 from "../assets/미림소프트웨어챌린지 개발부문3위.png";

export const awardsData = [
  {
    id: 1,
    image: award9,
    date: "2024.05.10",
    title: "봉사상",
    person: "전유림",
  },
  {
    id: 2,
    image: award3,
    date: "2024.05.31",
    title: "관악구 표창장",
    person: "이소리",
  },
  {
    id: 3,
    image: award2,
    date: "2024.08.06",
    title: "앱잼 장려상",
    person: "이소리",
    appName: "워커쉴드",
  },
  {
    id: 4,
    image: award1,
    date: "2024.08.08",
    title: "제 14회 e-ICON 3위",
    person: "이소리",
    appName: "SkillSprint",
  },
  {
    id: 5,
    image: award5,
    date: "2024.11.25",
    title: "미소챌 개발부문 2위",
    person: "전유림",
    appName: "너겟",
  },
  {
    id: 6,
    image: award6,
    date: "2024.11.25",
    title: "미소챌 기획부문 3위",
    person: "전유림",
  },
  {
    id: 7,
    image: award10,
    date: "2024.12.07",
    title: "Global Skills 2024 수료증",
    person: "전유림",
  },
  {
    id: 8,
    image: award4,
    date: "2024.12.12",
    title: "교감능력 상",
    person: "전유림",
  },
  {
    id: 9,
    image: award11,
    date: "2024.12.22",
    title: "앱잼 최우수상",
    person: "전유림",
    appName: "HousePick",
  },
  {
    id: 10,
    image: award12,
    date: "2025.01.23",
    title: "교과 우수상",
    person: "이소리",
  },
  {
    id: 11,
    image: award7,
    date: "2025.06.02",
    title: "과학독후감대회 우수상",
    person: "전유림",
  },
  {
    id: 12,
    image: award8,
    date: "2025.07.21",
    title: "전교회장 당선증",
    person: "전유림",
  },
  {
    id: 13,
    image: award13,
    date: "2025.12.22",
    title: "미소챌 개발부문 3위",
    person: "신채은",
    appName: "온말",
  },
];

const spin = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Container = styled.div`
  background: #111;
  text-align: center;

  height: 100vh;      
  overflow-y: auto;   
  overflow-x: hidden;

   //Edge
  -ms-overflow-style: none;

  // Chrome
  &::-webkit-scrollbar {
    display: none;          
  } 
`;
const Title = styled.h1`
  color: #19d0a3;
  margin-top: 100px;
  font-size: 48px;
  font-weight: 700;
`;

const Text = styled.p`
  color: #cdcdcd;
  font-size: 16px;
  font-weight: 700;
`;

const Carousel = styled.div`
  margin: 80px auto;
  width: 100%;
  overflow: hidden; 
  padding: 80px ;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  width: max-content;
  padding-left: 5.5em;
  animation: ${spin} 50s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
`;

const Group = styled.div`
  display: flex;
  gap: 80px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 330px;

  position: relative;
  z-index: ${({ $selected }) => ($selected ? 10 : 1)};

  transform-origin: center;
  transform: ${({ $selected }) => $selected ? "scale(1.2)" : "scale(1)"};

  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 471px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  object-fit: cover;
`;

const AwardsInfo = styled.div`
  color: #cdcdcd;
  font-size: 15px;
  text-align: left;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(17, 17, 17, 0.75);
  display: flex;
  justify-content: center;
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  transition: opacity 250ms ease;
  border-radius: 8px;
  pointer-events: none;
`;

const OverlayText = styled.div`
  transform: ${({ $selected }) =>
    $selected ? `scale(${1 / 1.2})` : "scale(1)"}; // 글자 사이즈 유지
  transform-origin: center;
  color: #fff;
  text-align: center;

  h3,
  p {
    margin: 0;
  }

  .title {
    margin-top: 106px;
    font-size: 24px;
    font-weight: 700;
  }
  .date {
    margin-top: 12px;
  }
  .line {
    margin-top: 28px;
    color: #cdcdcd;
  }
  .person {
    margin-top: 27.5px;
    text-align: left;
  }
  .date,
  .person {
    font-size: 16px;
    font-weight: 400;
  }
`;
const IconRow = styled.div`
  margin-top: 27.5px;
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 16px;
  font-weight: 400;
`;

const Icon = styled.svg`
  width: 25px;
  height: 25px;
  object-fit: contain;
  display: block;
`;

const LineImg = styled.img`
  width: 316px;
  height: 2px;
  margin: 28px auto 0 auto;
  display: block;
  object-fit: contain;
`;

const Awards = () => {
  const [selectAward, setSelectAward] = useState(null);

  const loopData = [...awardsData, ...awardsData];

  return (
    <Container>
      <Title>AWARDS</Title>
      <Text>CPU의 수상내역입니다</Text>
      <Carousel>
        <Slide $paused={!!selectAward}>
          <Group>
            {loopData.map((award, index) => {
              const selected = selectAward?.id === award.id;
              const notSelected = !!selectAward && !selected;

              return (
                <Card
                  key={`${award.id}-${index}`}
                  $selected={selected}
                  $notSelected={notSelected}
                >
                  <ImageWrapper>
                    <Image
                      src={award.image}
                      alt={award.title}
                      onClick={() => setSelectAward(selected ? null : award)}
                    />

                    <CardOverlay $selected={selected}>
                      <OverlayText $selected={selected}>
                        <h3 className="title">{award.title}</h3>
                        <p className="date">{award.date}</p>
                        <LineImg src={lineImg} alt="divider line" />

                        {award.appName && (
                          <IconRow>
                            <Icon as={AwardIcon} />
                            <span>{award.appName}</span>
                          </IconRow>
                        )}

                        <IconRow>
                          <Icon as={UserIcon} />
                          <span>{award.person}</span>
                        </IconRow>
                      </OverlayText>
                    </CardOverlay>
                  </ImageWrapper>

                  <AwardsInfo $hidden={selected}>
                    <p>{award.date}</p>
                    <h3>{award.title}</h3>
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
