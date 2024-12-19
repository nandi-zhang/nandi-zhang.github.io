import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import projectsData from './projectsData.js';

const ProjectContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0066cc;
  }

  &:before {
    content: '←';
    margin-right: 8px;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const ProjectTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 2rem;
  color: #1a1a1a;
`;

const ProjectMeta = styled.div`
  color: #666;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 50px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #1a1a1a;
  font-size: 1.8rem;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;
    padding-left: 24px;
    position: relative;

    &:before {
      content: '•';
      color: #0066cc;
      position: absolute;
      left: 0;
    }
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  height: 250px;
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px 15px;
  font-size: 0.9rem;
`;

const PublicationCard = styled.a`
  display: block;
  padding: 20px;
  margin-bottom: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f2f5;
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 10px 0;
    color: #0066cc;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90vh;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    background: #f0f0f0;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SideBar = styled.div`
  position: sticky;
  top: 40px;
  align-self: start;
`;

const RoleCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

const RoleTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;
`;

const RoleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;
    padding-left: 20px;
    position: relative;
    font-size: 0.95rem;
    line-height: 1.4;
    color: #555;

    &:before {
      content: '•';
      color: #0066cc;
      position: absolute;
      left: 0;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const Tag = styled.span`
  background: #e9ecef;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #495057;
`;

const MediaSection = styled.section`
  margin: 40px 0;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const GalleryImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.2s;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    border-radius: 0 0 8px 8px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 20px 0;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;

const PaperSection = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const PaperLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
  
  &:hover {
    background: #0052a3;
  }
`;

const ProjectPage = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
  
    // Add console.log to debug
    console.log('id:', id);
    console.log('projectsData:', projectsData);
  
    const project = projectsData.find(p => p.id === id);
  
    // Add console.log to debug
    console.log('found project:', project);
  
    if (!project) {
      return <div>Project not found</div>;
    }
  
    return (
        <ProjectContainer>
          <BackButton to="/portfolio">Back to Portfolio</BackButton>
          
          <ProjectHeader>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectMeta>Year: {project.year}</ProjectMeta>
          </ProjectHeader>
          <TwoColumnLayout>
          <SideBar>
            <RoleCard>
              <RoleTitle>My Role</RoleTitle>
              <RoleList>
                {project.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </RoleList>
              <TagsContainer>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </RoleCard>
          </SideBar>

          <MainContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <p>{project.overview}</p>
          </Section>

          <MediaSection>
            <SectionTitle>Publication</SectionTitle>
            <PaperSection>
              <h4>{project.paper.title}</h4>
              <PaperLink href={project.paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                PDF
              </PaperLink>
            </PaperSection>
          </MediaSection>

          <MediaSection>
            <SectionTitle>Project Gallery</SectionTitle>
            <ImageGallery>
              {project.gallery.map((image, index) => (
                <GalleryImage key={index}>
                  <img src={image.src} alt={image.caption} />
                  <div className="caption">{image.caption}</div>
                </GalleryImage>
              ))}
            </ImageGallery>
          </MediaSection>

          <MediaSection>
            <SectionTitle>Project Video</SectionTitle>
            {project.videos.map((video, index) => (
              <VideoContainer key={index}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>
            ))}
          </MediaSection>
        </MainContent>
        </TwoColumnLayout>
        </ProjectContainer>
    );
};

export default ProjectPage;