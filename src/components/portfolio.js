import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import agp from './uist-24-augmented-physics.png';
import reach from './chi-24-to-reach-the-unreachable.png';
import project1Pic from './I2IGAN.png';
import project2Pic from './SnapVR.png';
import projectsData from './projectsData';

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Introduction = styled.section`
  margin-bottom: 60px;
  max-width: 800px;
  margin: 0 auto 60px auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const ProjectCard = styled(Link)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.4rem;
`;

const ProjectDescription = styled.p`
  color: #666;
  margin: 0 0 15px 0;
  flex-grow: 1;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #555;
`;

const Portfolio = () => {
  return (
    <PortfolioContainer>
      <Introduction>
        <h1>Research Portfolio</h1>
        <p>
          My research focuses on Human-Computer Interaction (HCI), particularly in understanding human cognition Mixed Reality and Human-Robot Interaction, and leveraging such understanding to enhance or reshape the perceived reality.
          Below are selected projects that demonstrate my research interests, technical skills, and collaborative abilities.
        </p>
      </Introduction>

      <ProjectsGrid>
        {projectsData.map((project) => (
          <ProjectCard key={project.id} to={`/portfolio/${project.id}`}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagContainer>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagContainer>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PortfolioContainer>
  );
};


export default Portfolio;