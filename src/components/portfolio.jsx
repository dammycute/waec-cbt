import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Twitter, Download, ExternalLink, Code, Database, Server, Globe, ArrowRight, User } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const skills = {
    backend: ['Node.js', 'Python', 'Java', 'Go', 'REST APIs', 'GraphQL', 'Microservices'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'ElasticSearch'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Linux'],
    frontend: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind']
  };

  const projects = [
    {
      icon: <Server className="w-12 h-12" />,
      title: 'E-Commerce API',
      description: 'Scalable REST API with microservices architecture, handling 10k+ requests/minute. Built with Node.js, PostgreSQL, and Redis caching.',
      tech: ['Node.js', 'PostgreSQL', 'Redis', 'Microservices'],
      demo: '#',
      github: '#'
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: 'Data Analytics Dashboard',
      description: 'Full-stack analytics platform with real-time data processing. React frontend with Python backend and MongoDB storage.',
      tech: ['Python', 'React', 'MongoDB', 'WebSockets'],
      demo: '#',
      github: '#'
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Authentication Service',
      description: 'Secure OAuth2 authentication microservice with JWT tokens, rate limiting, and multi-factor authentication support.',
      tech: ['Node.js', 'JWT', 'OAuth2', 'Redis'],
      demo: '#',
      github: '#'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Real-Time Chat Application',
      description: 'WebSocket-based chat with message persistence, room management, and file sharing. Built with Socket.io and Express.',
      tech: ['Socket.io', 'Express', 'MongoDB', 'React'],
      demo: '#',
      github: '#'
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: 'Portfolio Website Builder',
      description: 'Frontend project allowing users to create custom portfolio sites with drag-and-drop interface and real-time preview.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
      demo: '#',
      github: '#'
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: 'Task Queue System',
      description: 'Distributed task processing system with priority queues and worker management. Uses Redis and Bull for job scheduling.',
      tech: ['Node.js', 'Redis', 'Bull', 'Docker'],
      demo: '#',
      github: '#'
    }
  ];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleDownloadResume = () => {
    alert('Add your resume PDF link here!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f1f5f9' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #334155',
        zIndex: 50 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <button 
              onClick={() => navigateTo('home')}
              style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              &lt;Ht-code/&gt;
            </button>
            
            {/* Desktop Navigation */}
            <div style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
              <button onClick={() => navigateTo('home')} style={{ color: currentPage === 'home' ? '#60a5fa' : '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Home</button>
              <button onClick={() => navigateTo('about')} style={{ color: currentPage === 'about' ? '#60a5fa' : '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>About</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('skills'), 100); }} style={{ color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Skills</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('projects'), 100); }} style={{ color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Projects</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('contact'), 100); }} style={{ color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Contact</button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ backgroundColor: '#0f172a', borderTop: '1px solid #334155' }}>
            <div style={{ padding: '0.5rem' }}>
              <button onClick={() => navigateTo('home')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}>Home</button>
              <button onClick={() => navigateTo('about')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}>About</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('skills'), 100); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}>Skills</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('projects'), 100); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}>Projects</button>
              <button onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('contact'), 100); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}>Contact</button>
            </div>
          </div>
        )}
      </nav>

      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section style={{ paddingTop: '8rem', paddingBottom: '5rem', padding: '8rem 1rem 5rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
                <div>
                  <div style={{ fontSize: '1rem', color: '#60a5fa', fontWeight: '600', marginBottom: '1rem' }}>
                    Hi, I'm a Backend Developer
                  </div>
                  <h1 style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    lineHeight: '1.1'
                  }}>
                    Building <span style={{
                      background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>Scalable Systems</span> & Robust APIs
                  </h1>
                  <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.8' }}>
                    Specialized in server-side architecture, microservices, and database optimization. I create efficient backend solutions that power modern applications with clean, maintainable code.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => scrollToSection('projects')}
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#2563eb', 
                        color: 'white', 
                        padding: '0.875rem 2rem', 
                        borderRadius: '0.5rem', 
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      View Projects
                      <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => navigateTo('about')}
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'transparent', 
                        color: '#cbd5e1', 
                        padding: '0.875rem 2rem', 
                        borderRadius: '0.5rem', 
                        fontWeight: '600',
                        border: '2px solid #334155',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      <User size={20} />
                      About Me
                    </button>
                  </div>
                  
                  {/* Quick Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '0.25rem' }}>5+</div>
                      <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Years Experience</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.25rem' }}>50+</div>
                      <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Projects Completed</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '0.25rem' }}>10+</div>
                      <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Technologies</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ 
                    width: '100%',
                    maxWidth: '28rem',
                    height: '28rem',
                    borderRadius: '1rem', 
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>
                    <span style={{ position: 'relative', zIndex: 1 }}>👨‍💻</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" style={{ padding: '5rem 1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Technical Skills</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'Backend', skills: skills.backend, color: '#60a5fa' },
                  { title: 'Databases', skills: skills.databases, color: '#a78bfa' },
                  { title: 'DevOps & Tools', skills: skills.devops, color: '#60a5fa' },
                  { title: 'Frontend', skills: skills.frontend, color: '#a78bfa' }
                ].map((category, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: '#0f172a', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #334155',
                    transition: 'border-color 0.3s'
                  }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: category.color, marginBottom: '1rem' }}>
                      {category.title}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {category.skills.map((skill, skillIdx) => (
                        <span key={skillIdx} style={{ 
                          backgroundColor: '#1e293b', 
                          color: '#cbd5e1', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem' 
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" style={{ padding: '5rem 1rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Featured Projects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {projects.map((project, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #334155',
                    overflow: 'hidden',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ 
                      background: 'linear-gradient(to bottom right, #2563eb, #7c3aed)',
                      height: '10rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      {project.icon}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{project.title}</h3>
                      <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{project.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {project.tech.map((tech, techIdx) => (
                          <span key={techIdx} style={{ 
                            backgroundColor: '#1e293b', 
                            color: '#cbd5e1', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '0.25rem', 
                            fontSize: '0.75rem' 
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <a href={project.demo} style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          backgroundColor: '#2563eb', 
                          color: 'white', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.5rem', 
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}>
                          <ExternalLink size={16} />
                          Demo
                        </a>
                        <a href={project.github} style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          backgroundColor: '#1e293b', 
                          color: 'white', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.5rem', 
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}>
                          <Github size={16} />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" style={{ padding: '5rem 1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
            <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Get In Touch</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '3rem' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: <Mail size={32} />, label: 'Email', href: 'mailto:your.email@example.com' },
                  { icon: <Github size={32} />, label: 'GitHub', href: 'https://github.com/yourusername' },
                  { icon: <Linkedin size={32} />, label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
                  { icon: <Twitter size={32} />, label: 'Twitter', href: 'https://twitter.com/yourusername' }
                ].map((contact, idx) => (
                  <a key={idx} href={contact.href} target="_blank" rel="noopener noreferrer" style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: '#0f172a', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #334155',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ color: '#60a5fa' }}>{contact.icon}</div>
                    <span style={{ fontWeight: '600' }}>{contact.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* About Page */
        <section style={{ paddingTop: '8rem', paddingBottom: '5rem', padding: '8rem 1rem 5rem', minHeight: 'calc(100vh - 200px)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>About Me</h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', textAlign: 'center', marginBottom: '4rem' }}>
              Get to know more about my journey and expertise
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'start' }} className="about-page-grid">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ 
                  width: '20rem', 
                  height: '20rem', 
                  borderRadius: '1rem', 
                  background: 'linear-gradient(to bottom right, #2563eb, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6rem'
                }}>
                  👨‍💻
                </div>
              </div>
              
              <div>
                <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #334155', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>My Journey</h2>
                  <p style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                    Hello! I'm a backend developer passionate about creating efficient, scalable systems that power amazing applications. My expertise lies in server-side architecture, API development, and database design.
                  </p>
                  <p style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: '1.8' }}>
                    I specialize in building robust microservices, designing RESTful and GraphQL APIs, and optimizing database performance. With over 5 years of experience, I've worked on projects ranging from small startups to enterprise-level applications.
                  </p>
                </div>
                
                <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #334155', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#a78bfa', marginBottom: '1rem' }}>What I Do</h2>
                  <p style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                    I believe in writing clean, maintainable code and following industry best practices. My approach involves understanding business requirements deeply and translating them into technical solutions that scale.
                  </p>
                  <p style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: '1.8' }}>
                    While my core strength is backend development, I've also built frontend projects that showcase my versatility and full-stack understanding. I'm constantly learning and adapting to new technologies to stay at the forefront of modern development.
                  </p>
                </div>
                
                <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #334155', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>Beyond Code</h2>
                  <p style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: '1.8' }}>
                    When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, and mentoring junior developers. I'm passionate about sharing knowledge and helping others grow in their development journey.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleDownloadResume}
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#2563eb', 
                      color: 'white', 
                      padding: '0.875rem 2rem', 
                      borderRadius: '0.5rem', 
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    <Download size={20} />
                    Download Resume
                  </button>
                  <button 
                    onClick={() => { navigateTo('home'); setTimeout(() => scrollToSection('contact'), 100); }}
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'transparent', 
                      color: '#cbd5e1', 
                      padding: '0.875rem 2rem', 
                      borderRadius: '0.5rem', 
                      fontWeight: '600',
                      border: '2px solid #334155',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    <Mail size={20} />
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#0f172a', 
        borderTop: '1px solid #334155',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        <p>&copy; 2025 Backend Developer Portfolio. All rights reserved.</p>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .hero-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
          .about-page-grid {
            grid-template-columns: 1fr 1.5fr !important;
          }
        }
        button:hover {
          opacity: 0.9;
        }
        a:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}