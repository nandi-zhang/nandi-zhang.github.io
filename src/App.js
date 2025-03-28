import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import profilePic from './IMG_9003.JPG';
import CV from './Nandi_s_Resume.pdf';
import agp from './uist-24-augmented-physics.png';
import agppdf from './uist-24-augmented-physics.pdf';
import reach from './chi-24-to-reach-the-unreachable.png';
import reachpdf from './chi-24-to-reach-the-unreachable.pdf';
import reflect from './chi-25-from-following-to-understanding.png'
import intention from './chi-25-signaling-human-intentions.png'

const MainPage = () => {
  return (
    <div className="global-style">
      <div className="main-container">
        <div className="left-column">
          <img src={profilePic} alt="Profile" className="profile-image" />
          <a href="mailto:nandi.zhang@ucalgary.ca" className="icon-link">📧 Email</a>
          <a href={CV} className="icon-link">📄 CV</a>
          <a href="https://scholar.google.ca/citations?user=zvPQR94AAAAJ&hl=en" className="icon-link">🎓 Google Scholar</a>
          <a href="https://ca.linkedin.com/in/nandi-zhang" className="icon-link">💼 LinkedIn</a>
          <a href="https://x.com/nandizhang_" className="icon-link">𝕏 X</a>
        </div>

        <div className="main-content">
          <section className="intro-section">
            <h2>Nandi Zhang | 张南迪</h2>
            <p className="bio-text">
              I am a second-year MSc student in Computer Science at{' '}
              <a href="https://www.ucalgary.ca/" className="clean-link">University of Calgary</a>,
              advised by{' '}
              <a href='https://ryosuzuki.org/' className="clean-link">Prof. Ryo Suzuki</a>.
              I will join the{' '}
              <a href="https://rochester-bear-lab.github.io/index" className="clean-link">BEAR lab</a>{' '}
              at the{' '}
              <a href="https://www.rochester.edu/" className="clean-link">University of Rochester</a>{' '}
              as a PhD student in Computer Science, working with{' '}
              <a href="https://rochester-bear-lab.github.io/yukang" className="clean-link">Prof. Yukang Yan</a>.
              I received my bachelor's degree in Data Science and Technology from the{' '}
              <a href="https://hkust.edu.hk" className="clean-link">Hong Kong University of Science and Technology</a>,
              where I was advised by{' '}
              <a href='https://www.cse.ust.hk/~mxj/' className="clean-link">Prof. Xiaojuan Ma</a>.
            </p>
            <p>My research focuses on <strong>Mixed Reality</strong> and <strong>Human-Robot Interaction</strong>. I seek to computationally explore and explain how computers that we built shape our perception, capabilities and behaviors.</p>
          </section>

          <div className="news-section">
            <h2>Latest News</h2>
            <div className="news-item">
              <h3 className="news-title">PhD Offer Accepted</h3>
              <span className="news-date">Feb 25, 2025</span>
              <p className="news-description">I will be Yukang's PhD student. :)</p>
            </div>
            <div className="news-item">
              <h3 className="news-title">Two Papers Accepted by CHI 2024</h3>
              <span className="news-date">Jan 16, 2025</span>
              <p className="news-description">And the paper with Hanfang got Honorable Mention! Congrats to Hanfang!</p>
            </div>
          </div>

          <section className="publications-section" id="publications">
            <h2>Publications</h2>
            <div className="publication-item">
              <div className="publication-row">
                <img src={reflect} alt="Publication" className="publication-image" />
                <div className="publication-text">
                  <h3 className="publication-title">From Following to Understanding: Investigating the Role of Reflective Prompts in AR-Guided Tasks to Promote User Understanding</h3>
                  <p className="publication-authors"><strong>Nandi Zhang</strong>, Yukang Yan, Ryo Suzuki</p>
                  <p className="publication-venue">In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI) 2025</p>
                  <div className="publication-links">
                    <a href="" className="clean-link">DOI</a>
                    <a href="" className="clean-link">Video</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="publication-item">
              <div className="publication-row">
                <img src={intention} alt="Publication" className="publication-image" />
                <div className="publication-text">
                  <h3 className="publication-title">Signaling Human Intentions to Service Robots: Understanding the Use of Social Cues during In-Person Conversations</h3>
                  <p className="publication-authors">Hanfang Lyu, Xiaoyu Wang, <strong>Nandi Zhang</strong>, Shuai Ma, Qian Zhu, Yuhan Luo, Fugee Tsung, Xiaojuan Ma</p>
                  <p className="publication-venue">In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI) 2025<span className="award-badge">• Honorable Mention</span></p>
                  <div className="publication-links">
                    <a href="" className="clean-link">DOI</a>
                    <a href="" className="clean-link">Video</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="publication-item">
              <div className="publication-row">
                <img src={agp} alt="Publication" className="publication-image" />
                <div className="publication-text">
                  <h3 className="publication-title">Augmented Physics: Creating Interactive and Embedded Physics Simulations from Static Textbook Diagrams</h3>
                  <p className="publication-authors">Aditya Gunturu, Yi Wen, <strong>Nandi Zhang</strong>, Jarin Thundathil, Rubaiat Habib Kazi, Ryo Suzuki</p>
                  <p className="publication-venue">In Proceedings of the Annual ACM Symposium on User Interface Software and Technology (UIST) 2024<span className="award-badge">• Best Paper</span></p>
                  <div className="publication-links">
                    <a href="https://dl.acm.org/doi/10.1145/3654777.3676392" className="clean-link">DOI</a>
                    <a href={agppdf} className="clean-link">PDF</a>
                    <a href="https://www.youtube.com/watch?v=GqZnQJpfFSg" className="clean-link">Video</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="publication-item">
              <div className="publication-row">
                <img src={reach} alt="Publication" className="publication-image" />
                <div className="publication-text">
                  <h3 className="publication-title">To Reach the Unreachable: Exploring the Potential of VR Hand Redirection for Upper Limb Rehabilitation</h3>
                  <p className="publication-authors">Peixuan Xiong, Yukai Zhang, <strong>Nandi Zhang</strong>, Shihan Fu, Xin Li, Yadan Zheng, Jinni Zhou, Xiquan Hu, Mingming Fan</p>
                  <p className="publication-venue">In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI) 2024</p>
                  <div className="publication-links">
                    <a href="https://dl.acm.org/doi/10.1145/3613904.3642912" className="clean-link">DOI</a>
                    <a href={reachpdf} className="clean-link">PDF</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
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