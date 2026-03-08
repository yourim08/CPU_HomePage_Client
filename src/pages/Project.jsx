import { useState, useCallback, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import project_1  from '../assets/project/project_1.svg';
import project_2  from '../assets/project/project_2.svg';
import project_3  from '../assets/project/project_3.svg';
import project_4  from '../assets/project/project_4.svg';
import project_5  from '../assets/project/project_5.svg';
import project_6  from '../assets/project/project_6.svg';
import project_7  from '../assets/project/project_7.svg';
import project_8  from '../assets/project/project_8.svg';
import project_10 from '../assets/project/project_10.svg';
import project_11 from '../assets/project/project_11.svg';
import project_12 from '../assets/project/project_12.svg';
import project_13 from '../assets/project/project_13.svg';

// ── 애니메이션 ──────────────────────────────────────────────

const arrowPulse = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(25, 208, 163, 0.3); }
    50%       { box-shadow: 0 0 0 ${p => p.theme.vw(10)} rgba(25, 208, 163, 0); }
`;

// ── 스타일드 컴포넌트 ────────────────────────────────────────

const ProjectContainer = styled.div`
    -webkit-user-select: none;
    user-select: none;
    position: relative;
    height: ${p => p.theme.vh(1100)};
    background-color: #04001B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    font-family: 'NexonLv2Gothic';
`;

const TitleArea = styled.div`
    text-align: center;
    margin-top: ${p => p.theme.vh(148)};
    z-index: 20;
`;

const MainTitle = styled.h2`
    font-family: 'NexonLv2Gothic', sans-serif;
    font-weight: 700;
    font-size: ${p => p.theme.vw(50)};
    color: #19D0A3;
    margin-bottom: ${p => p.theme.vh(34)};
`;

const SubTitle = styled.p`
    font-family: 'NexonLv2Gothic', sans-serif;
    font-weight: 400;
    color: #CDCDCD;
    font-size: ${p => p.theme.vw(24)};
    line-height: 1.5;
    white-space: pre-line;
`;

const SliderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${p => p.theme.vw(32)};
    margin-top: ${p => p.theme.vh(150)};
    width: 100%;
`;

const CardViewport = styled.div`
    width: ${p => p.theme.vw(512)};
    height: ${p => p.theme.vh(383)};
    overflow: hidden;
    border-radius: ${p => p.theme.vw(20)};
    position: relative;
`;

const Track = styled.div`
    display: flex;
    width: 300%;
    height: 100%;
    will-change: transform;
    transform: translateX(-33.333%);
`;

const Slot = styled.div`
    flex: 0 0 33.333%;
    height: 100%;
    padding: 0 ${p => p.theme.vw(16)};
    box-sizing: border-box;
`;

const SlotInner = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${p => p.$img});
    background-size: cover;
    background-position: center;
    border-radius: ${p => p.theme.vw(20)};
`;

const ArrowButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${p => p.theme.vw(56)};
    height: ${p => p.theme.vw(56)};
    border-radius: 50%;
    border: ${p => p.theme.vw(2)} solid rgba(25, 208, 163, 0.5);
    background: rgba(25, 208, 163, 0.08);
    color: #19D0A3;
    cursor: pointer;
    transition: background 0.25s, border-color 0.25s, transform 0.2s;
    flex-shrink: 0;

    svg {
        width: ${p => p.theme.vw(22)};
        height: ${p => p.theme.vw(22)};
        transition: transform 0.2s;
    }
    &:hover {
        background: rgba(25, 208, 163, 0.18);
        border-color: #19D0A3;
        animation: ${arrowPulse} 1.2s ease infinite;
        svg { transform: ${p => p.$dir === 'left' ? `translateX(-${p.theme.vw(3)})` : `translateX(${p.theme.vw(3)})`}; }
    }
    &:active   { transform: scale(0.93); }
    &:disabled { opacity: 0.3; cursor: default; animation: none; }
`;


// ── Dot ────────────────────────────────────

const DotsRow = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: ${p => p.theme.vh(36)};
    height: ${p => p.theme.vw(28)}; /* 컨테이너 높이 조정 */
`;

const DotWrapper = styled.div`
    width: ${p => p.theme.vw(28)}; /* 전체적인 간격 밸런스 조정 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Dot = styled.button`
    width: ${p => p.theme.vw(10)}; /* 요청하신 10 수치 적용 */
    height: ${p => p.theme.vw(10)};
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.22);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s;
    z-index: 2;
    &:hover { background: rgba(255, 255, 255, 0.45); }
`;

const ActivePill = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: ${p => p.theme.vw(10)}; /* Dot 높이와 통일 */
    width: ${p => p.theme.vw(28)};  /* 너무 길지 않게 28로 조정 */
    border-radius: ${p => p.theme.vw(5)};
    background: #19D0A3;
    pointer-events: none;
    z-index: 3;
    transition: left 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    left: ${p => p.$left}px;
`;
// ── 상수 ──────────────────────────────────────────────────────

const DURATION = 580;
const EASING   = 'cubic-bezier(0.4, 0, 0.2, 1)';

const POS = {
    prev:    'translateX(0%)',
    current: 'translateX(-33.333%)',
    next:    'translateX(-66.666%)',
};

// ── 컴포넌트 ─────────────────────────────────────────────────

export default function Project() {
    const projectImages = [
        project_1, project_2, project_3,
        project_4, project_5, project_6,
        project_7, project_8,
        project_10, project_11, project_12, project_13,
    ];
    const total = projectImages.length;

    const trackRef    = useRef(null);
    const dotsRowRef  = useRef(null);
    const animating   = useRef(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pillLeft, setPillLeft] = useState(0);

    const getSlots = useCallback((idx) => ({
        prev:    (idx - 1 + total) % total,
        current: idx,
        next:    (idx + 1) % total,
    }), [total]);

    const [slots, setSlots] = useState(() => getSlots(0));

    const updatePillPosition = useCallback((idx) => {
        if (!dotsRowRef.current) return;
        const wrappers = dotsRowRef.current.querySelectorAll('.dot-wrapper');
        if (wrappers[idx]) {
            setPillLeft(wrappers[idx].offsetLeft);
        }
    }, []);

    useEffect(() => {
        updatePillPosition(currentIndex);
        
        // 창 크기가 변할 때 offsetLeft를 다시 계산하도록 리스너 추가 (반응형 대응)
        window.addEventListener('resize', () => updatePillPosition(currentIndex));
        return () => window.removeEventListener('resize', () => updatePillPosition(currentIndex));
    }, [updatePillPosition, currentIndex]);

    const slide = useCallback((dir) => {
        if (animating.current) return;
        animating.current = true;

        const nextIndex = dir === 'next'
            ? (currentIndex + 1) % total
            : (currentIndex - 1 + total) % total;

        const track = trackRef.current;
        track.style.transition = 'none';
        track.style.transform  = POS.current;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = `transform ${DURATION}ms ${EASING}`;
                track.style.transform  = dir === 'next' ? POS.next : POS.prev;
            });
        });

        updatePillPosition(nextIndex);

        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform  = POS.current;
            setSlots(getSlots(nextIndex));
            setCurrentIndex(nextIndex);
            animating.current = false;
        }, DURATION + 30);

    }, [currentIndex, total, getSlots, updatePillPosition]);

    const goTo = useCallback((idx) => {
        if (idx === currentIndex || animating.current) return;
        animating.current = true;

        const track = trackRef.current;
        const dir   = idx > currentIndex ? 'next' : 'prev';

        setSlots({
            prev:    dir === 'prev' ? idx : (idx - 1 + total) % total,
            current: dir === 'next' ? currentIndex : (currentIndex),
            next:    dir === 'next' ? idx : (idx + 1) % total,
        });

        updatePillPosition(idx);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'none';
                track.style.transform  = POS.current;

                requestAnimationFrame(() => {
                    track.style.transition = `transform ${DURATION}ms ${EASING}`;
                    track.style.transform  = dir === 'next' ? POS.next : POS.prev;
                });
            });
        });

        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform  = POS.current;
            setSlots(getSlots(idx));
            setCurrentIndex(idx);
            animating.current = false;
        }, DURATION + 30);

    }, [currentIndex, total, getSlots, updatePillPosition]);

    return (
        <ProjectContainer>
            <TitleArea>
                <MainTitle>Project</MainTitle>
                <SubTitle>{`CPU에서 기획부터 개발, 전시까지\n진행된 프로젝트 둘러보기`}</SubTitle>
            </TitleArea>

            <SliderRow>
                <ArrowButton $dir="left" onClick={() => slide('prev')} aria-label="이전 프로젝트">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </ArrowButton>

                <CardViewport>
                    <Track ref={trackRef}>
                        <Slot><SlotInner $img={projectImages[slots.prev]} /></Slot>
                        <Slot><SlotInner $img={projectImages[slots.current]} /></Slot>
                        <Slot><SlotInner $img={projectImages[slots.next]} /></Slot>
                    </Track>
                </CardViewport>

                <ArrowButton $dir="right" onClick={() => slide('next')} aria-label="다음 프로젝트">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </ArrowButton>
            </SliderRow>

            <DotsRow ref={dotsRowRef}>
                <ActivePill $left={pillLeft} />
                {projectImages.map((_, idx) => (
                    <DotWrapper key={idx} className="dot-wrapper">
                        <Dot
                            onClick={() => goTo(idx)}
                            aria-label={`프로젝트 ${idx + 1}`}
                        />
                    </DotWrapper>
                ))}
            </DotsRow>
        </ProjectContainer>
    );
}