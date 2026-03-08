import styled, { keyframes } from 'styled-components';

// 상하 폭과 스케일 변화를 유지하여 역동적인 움직임 강조
const breathe = keyframes`
  0%, 100% { transform: scale(1.0) translateY(0px); }
  50%      { transform: scale(1.1) translateY(-40px); } 
`;

export const AnimatedBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  background-image: url("${({ $bg }) => $bg}");
  background-repeat: no-repeat;
  /* 테마 기반 사이즈 및 위치 설정 유지 */
  background-size: ${props => props.theme.vw(2045)} auto;
  background-position: center ${props => props.theme.vh(500)};

  /* - 색상 변화(colorPop) 제거
     - 상하 움직임 속도 4s 유지 (필요에 따라 5~6s로 늘리면 더 부드러워집니다)
  */
  animation: ${breathe} 4s ease-in-out infinite;

  /* 하드웨어 가속 강제 (애니메이션 부드럽게 유지) */
  will-change: transform;
`;