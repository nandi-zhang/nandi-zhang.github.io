import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import profilePic from './IMG_9003.JPG';
import CV from './Nandi_s_Resume.pdf';
import agp from './uist-24-augmented-physics.png';
import agppdf from './uist-24-augmented-physics.pdf';
import reach from './chi-24-to-reach-the-unreachable.png';
import reachpdf from './chi-24-to-reach-the-unreachable.pdf';
import styled from 'styled-components';
import Portfolio from './components/portfolio';
import ProjectPage from './components/ProjectPage';

import project1Pic from './I2IGAN.png';
import project1Pdf from './Unsupervised-Prototypical-GAN.pdf';
import project2Pic from './SnapVR.png';

// Styled components
const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px 20px 0;
  margin-top: 70px; // Add this line to prevent content from going under the nav bar

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div``;

const ProfileImage = styled.img`
  width: 200px;
  height: 260px;
  object-fit: cover;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const IconLink = styled.a`
  color: black;
  text-decoration: none;
  margin: 1px 0;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const PublicationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PublicationHeading = styled.h2`
  text-align: left;
  margin-left: 0px;
  width: 100%;
  margin-bottom: 20px;
`;

const PublicationList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const PublicationItem = styled.li`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PublicationImage = styled.img`
  width: 260px;
  height: 180px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 180px;
  }
`;

const PublicationContent = styled.div`
  padding: 10px;
  flex: 1;
`;

const PublicationTitle = styled.h4`
  margin: 0 0 3px 0;
`;

const PublicationParagraph = styled.p`
  margin: 0 0 2px 0;
  line-height: 1.3;
`;

const ItalicParagraph = styled(PublicationParagraph)`
  font-style: italic;
  margin-top: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.a`
  display: inline-block;
  padding: 5px 10px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const ProjectsSection = styled(PublicationsSection)``;

const ProjectHeading = styled(PublicationHeading)``;

const ProjectList = styled(PublicationList)``;

const ProjectItem = styled(PublicationItem)``;

const ProjectImage = styled(PublicationImage)``;

const ProjectContent = styled(PublicationContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ProjectTitle = styled(PublicationTitle)`
  margin-right: 10px;
`;

const ProjectDate = styled.span`
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;
`;

const ProjectDescription = styled.p`
  margin: 0;
  line-height: 1.4;
`;

const PressCoverageSection = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PressCoverageHeading = styled.h2`
  text-align: left;
  margin-left: 0px;
  margin-bottom: 20px;
`;

const PressLinks = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PressItem = styled.li`
  margin-bottom: 15px;
`;

const PressLink = styled.a`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PressDate = styled.span`
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 8px 15px;
  border: 1px solid black;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const MainPage = () => {
  return (
    <div>
    <Container>
      <LeftColumn>
        <ProfileImage src={profilePic} alt="Profile Pic" />
        <IconLink href="mailto:nandi.zhang@ucalgary.ca">📧 nandi.zhang@ucalgary.ca</IconLink>
        <IconLink href={CV} target="_blank" rel="noopener noreferrer">📄 CV</IconLink>
        <IconLink href="https://scholar.google.ca/citations?user=zvPQR94AAAAJ&hl=en">🎓 Google Scholar</IconLink>
        <IconLink href="https://ca.linkedin.com/in/nandi-zhang">💼 LinkedIn</IconLink>
        <IconLink href="https://x.com/nandizhang_">𝕏 X</IconLink>
      </LeftColumn>
      <RightColumn>
        <h1>Nandi Zhang | 张南迪</h1>
        <p>I am a second-year MSc student in Computer Science at <a href="https://www.ucalgary.ca/" style={{ color: 'black'}}>University of Calgary</a>, advised by <a href='https://ryosuzuki.org/' style={{ color: 'black'}}>Prof. Ryo Suzuki</a>. I will join the <a href="https://rochester-bear-lab.github.io/index" style={{ color: 'black'}}>BEAR lab</a> at the <a href="https://www.rochester.edu/" style={{ color: 'black'}}>University of Rochester</a> as a PhD student, working with <a href="https://rochester-bear-lab.github.io/yukang" style={{ color: 'black'}}>Prof. Yukang Yan</a>.</p>
        <p>My research in <strong>Human-Computer Interaction (HCI)</strong> focuses on <strong>Mixed Reality</strong> and <strong>Human-Robot Interaction</strong>. I seek to computationally explore and explain how computers that we built shape our perception, capabilities and behaviors.</p>
        <p>Prior to joining UCalgary, I received my bachelor's degree in Data Science and Technology from <a href="https://hkust.edu.hk/" style={{ color: 'black'}}>Hong Kong University of Science and Technology</a>, advised by <a href='https://www.cse.ust.hk/~mxj/' style={{ color: 'black'}}>Prof. Xiaojuan Ma</a>.</p>
      </RightColumn>
    </Container>
    <PublicationsSection>
      <PublicationHeading>Publications</PublicationHeading>
      <PublicationList>
        <PublicationItem>
          <PublicationImage src={agp} alt="Publication 1" />
          <PublicationContent>
            <PublicationTitle>Augmented Physics: Creating Interactive and Embedded Physics Simulations from Static Textbook Diagrams</PublicationTitle>
            <PublicationParagraph>Aditya Gunturu, Yi Wen, <strong>Nandi Zhang</strong>, Jarin Thundathil, Rubaiat Habib Kazi, Ryo Suzuki</PublicationParagraph>
            <ItalicParagraph>In Proceedings of the Annual ACM Symposium on User Interface Software and Technology (UIST) 2024</ItalicParagraph>
            <ButtonContainer>
              <Button href="https://dl.acm.org/doi/10.1145/3654777.3676392">DOI</Button>
              <Button href={agppdf}>PDF</Button>
              <Button href="https://www.youtube.com/watch?v=GqZnQJpfFSg">Video</Button>
            </ButtonContainer>
          </PublicationContent>
        </PublicationItem>
        <PublicationItem>
          <PublicationImage src={reach} alt="Publication 2" />
          <PublicationContent>
            <PublicationTitle>To Reach the Unreachable: Exploring the Potential of VR Hand Redirection for Upper Limb Rehabilitation</PublicationTitle>
            <PublicationParagraph>Peixuan Xiong, Yukai Zhang, <strong>Nandi Zhang</strong>, Shihan Fu, Xin Li, Yadan Zheng, Jinni Zhou, Xiquan Hu, Mingming Fan</PublicationParagraph>
            <ItalicParagraph>In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI) 2024</ItalicParagraph>
            <ButtonContainer>
              <Button href="https://dl.acm.org/doi/10.1145/3613904.3642912">DOI</Button>
              <Button href={reachpdf}>PDF</Button>
            </ButtonContainer>
          </PublicationContent>
        </PublicationItem>
      </PublicationList>
    </PublicationsSection>
  </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;