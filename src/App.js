import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import profilePic from './IMG_6649.jpg';
import CV from './Nandi_s_Résumé.pdf';
import agp from './uist-24-augmented-physics.png';
import agppdf from './uist-24-augmented-physics.pdf';
import reach from './chi-24-to-reach-the-unreachable.png';
import reachpdf from './chi-24-to-reach-the-unreachable.pdf';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  max-width: 800px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

const RightColumn = styled.div``;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 20px;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  // border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const PublicationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px; // Adjust this value as needed
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
`;

const PublicationImage = styled.img`
  width: 260px;
  height: 180px;
  object-fit: cover;
`;

const PublicationContent = styled.div`
  padding: 10px;
  flex: 1;
`;

const PublicationTitle = styled.h4`
  margin: 0 0 3px 0;
`;

const PublicationParagraph = styled.p`
  margin: 0 0 2px 0; // Reduced bottom margin
  line-height: 1.3;
`;

const ItalicParagraph = styled(PublicationParagraph)`
  font-style: italic;
  margin-top: 0; // Ensures no extra space above this paragraph
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

const IconLink = styled.a`
  color: black;
  text-decoration: none;
  margin: 1px 0;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
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
          <h1>Nandi Zhang</h1>
          <p>I am a second-year MSc student in Computer Science at <a href="https://www.ucalgary.ca/" style={{ color: 'black'}}>University of Calgary</a>, advised by <a href='https://ryosuzuki.org/' style={{ color: 'black'}}>Prof. Ryo Suzuki</a>.</p>
          <p>My research in <strong>Human-Computer Interaction (HCI)</strong> focuses on <strong>Mixed Reality</strong> and <strong>Human-Robot Interaction</strong>. I seek to explore and understand how computers that we built shape our perceptions, capabilities and behaviors.</p>
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
              <Button href={agppdf}>PDF</Button>
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
                <Button href={reachpdf}>PDF</Button>
              </ButtonContainer>
            </PublicationContent>
          </PublicationItem>
      </PublicationList>
    </PublicationsSection>
      </div>
  );
};

export default App;