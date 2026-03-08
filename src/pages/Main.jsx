import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import HeroContent from '../components/HeroContent';
import bg from '../assets/main_bg.svg';
import Gallery from './Gallery.jsx';
import Project from './Project.jsx';
import MainEnd from './MainEnd.jsx';
import Awards from './Awards.jsx';
// import PlasmaOverlay from '../components/PlasmaOverlay';
import { AnimatedBg } from '../components/AnimatedBg.jsx';
import Faq from './Faq.jsx';

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color: #04001B;
`;

const MainHeroSection = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  width: 100%;
  height: ${props => props.theme.vh(1332)};

  background-image: url("${bg}");
  background-repeat: no-repeat;
  background-size: ${props => props.theme.vw(2045)} auto;
  background-position: center ${props => props.theme.vh(500)};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Main = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true); // 최상단에서는 항상 보임
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // 아래로 스크롤 시 숨김
      } else {
        setIsVisible(true); // 위로 스크롤 시 나타남
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

  return (
    <PageWrapper>

      <MainHeroSection id="home">
        <AnimatedBg $bg={bg} />   
        <Navbar $isVisible={isVisible} onScroll={onScroll} />
        <div className="heroWrapper">
          <HeroContent />
        </div>
      </MainHeroSection>
      
      {/* <MainHeroSection id="home">
        <Navbar $isVisible={isVisible} onScroll={onScroll} />
        <div className="heroWrapper">
          <HeroContent />
        </div>
      </MainHeroSection> */}

      {/* <MainHeroSection id="home">
        <PlasmaOverlay />   
        <Navbar $isVisible={isVisible} onScroll={onScroll} />
        <div className="heroWrapper">
          <HeroContent />
        </div>
      </MainHeroSection> */}

      <section id="about"></section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="project">
        <Project />
      </section>
      <section id="awards">
        <Awards />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <section id="ending">
        <MainEnd />
      </section>

    </PageWrapper>
  );
};

export default Main;