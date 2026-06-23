import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaLeaf, 
  FaWater, 
  FaGlobe, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaChevronRight,
  FaUserTie,
  FaBuilding,
  FaStar,
  FaSeedling,
  FaPaw,
  FaFish
} from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import './index.css';

const IconMap = {
  FaLeaf: <FaLeaf />,
  FaWater: <FaWater />,
  FaUserTie: <FaUserTie />,
  FaGlobe: <FaGlobe />,
  FaFacebook: <FaFacebook />,
  FaInstagram: <FaInstagram />,
  FaTwitter: <FaTwitter />,
  FaSeedling: <FaSeedling />,
  FaPaw: <FaPaw />,
  FaFish: <FaFish />,
  VanshLogo: <img src="/logo.png" alt="Vansh Logo" style={{ width: '1.5em', height: '1.5em', objectFit: 'contain', transform: 'scale(1.4)' }} />,
  MllLogo: <img src="/mll-logo.png" alt="MLL Agro Logo" style={{ width: '1.5em', height: '1.5em', objectFit: 'contain', transform: 'scale(1.4)' }} />
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch CMS data from local JSON
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        // Add a slight delay to show the sleek skeleton animation
        setTimeout(() => {
          setData(json);
          setLoading(false);
        }, 1200);
      })
      .catch(err => {
        console.error("Failed to fetch CMS data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* 3D Abstract Background Elements */}
      <img src="/bg-leaf.png" className="bg-3d-element leaf-3d" alt="" />
      <img src="/bg-seed.png" className="bg-3d-element seed-3d" alt="" />

      <div className="app-container">
        
        {/* Tiny Top-Nav Branding */}
        <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 30px 0' }}>
          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Vansh Group Hub
          </div>
        </nav>

        {/* Profile Header */}
        <header className="profile-header">
          <div className="cover-photo">
            <div className="cover-overlay"></div>
            {!loading && data && data.posterProducts && (
              <div className="poster-content">
                <h2 className="poster-tagline">{data.profile.tagline}</h2>
                <div className="poster-companies">
                  {data.companies.map(c => (
                    <span key={c.id} className="poster-company-name">{c.name}</span>
                  ))}
                </div>
                <div className="poster-products">
                  {data.posterProducts.map((p, idx) => (
                    <div key={idx} className="poster-product-card">
                      <img src={p.image} alt={p.name} />
                      <span className="poster-product-name">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="avatar-wrapper">
            <div className="avatar-inner">
              <img src="/logo.png" alt="Vansh Group Logo" className="avatar-img" />
            </div>
          </div>
          
          <div className="profile-info">
            {loading || !data ? (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div className="skeleton skeleton-title" style={{ width: '40%', height: '36px' }}></div>
                <div className="skeleton skeleton-title" style={{ width: '60%', height: '24px', marginTop: '8px' }}></div>
                <div className="skeleton skeleton-text" style={{ marginTop: '16px', width: '80%' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '16px' }}>
                  <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                </div>
              </div>
            ) : (
              <>
                <div className="profile-name-container">
                  <h1 className="profile-name">{data.profile.name}</h1>
                  {data.profile.isVerified && <FaCheckCircle className="verified-badge" />}
                </div>
                <p className="profile-bio">{data.profile.bio}</p>
                <div className="profile-stats clay-box">
                  {data.profile.stats.map((stat, idx) => (
                    <span key={idx} className="stat"><strong>{stat.value}</strong> {stat.label}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Hero Product Spotlight */}
        {!loading && data && data.heroProduct && (
          <section className="hero-section">
            <div className="hero-product clay-box">
              <div className="hero-product-image-container">
                <video 
                  src={data.heroProduct.video || "/Second_AI_Product_Shoot_Prom.mp4"} 
                  autoPlay 

                  loop 
                  muted 
                  playsInline
                  className="hero-product-video"
                />
              </div>
              <div className="hero-product-info">
                <div className="hero-badge"><FaStar style={{marginRight: '6px'}}/> {data.heroProduct.subtitle}</div>
                <h2>{data.heroProduct.title}</h2>
                <p>{data.heroProduct.description}</p>
                <a href={data.heroProduct.buttonUrl} target="_blank" rel="noopener noreferrer" className="clay-btn hero-btn">
                  {data.heroProduct.buttonText} <FaChevronRight style={{marginLeft: '8px'}} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Tabs */}
        <nav className="tabs-container">
          <button className="clay-btn active">Featured Feed</button>
          <button className="clay-btn">Agriculture</button>
          <button className="clay-btn">Nutrition</button>
        </nav>

        <main className="feed">
          {/* Companies Grid */}
          {!loading && data && data.companies && (
            <section className="companies-section">
              <h3 className="section-title">Our Companies</h3>
              <div className="companies-grid">
                {data.companies.map(company => (
                  <a key={company.id} href={company.url} target="_blank" rel="noopener noreferrer" className="company-card clay-box">
                    <div className="company-icon" style={{ color: company.color }}>
                      {IconMap[company.icon]}
                    </div>
                    <div className="company-details">
                      <h4>{company.name}</h4>
                      <span>{company.focus}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Social Feed Posts */}
          {loading || !data ? (
            <>
              <article className="post-card clay-box">
                <div className="post-header">
                  <div className="skeleton skeleton-avatar"></div>
                  <div className="post-author-info" style={{ width: '100%' }}>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text short"></div>
                  </div>
                </div>
                <div className="post-body">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text short"></div>
                </div>
                <div className="post-links">
                  <div className="skeleton skeleton-link"></div>
                  <div className="skeleton skeleton-link"></div>
                </div>
              </article>
            </>
          ) : (
            data.posts.map(post => (
              <article key={post.id} className="post-card clay-box">
                <div className="post-header">
                  <div className={`post-avatar ${post.type}`}>
                    {IconMap[post.icon]}
                  </div>
                  <div className="post-author-info" style={{ width: '100%' }}>
                    <h3>{post.title}</h3>
                    {post.subtitle && <p>{post.subtitle}</p>}
                  </div>
                </div>
                
                <div className="post-body">
                  <p>{post.body}</p>
                </div>
                
                <div className="post-links">
                  {post.links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="post-link-item colored-box"
                      style={{ background: link.color, color: '#ffffff', border: 'none' }}
                    >
                      <div className="link-left">
                        <div className="link-icon-wrapper" style={{color: '#ffffff'}}>{IconMap[link.icon]}</div>
                        <span style={{ fontWeight: 600 }}>{link.label}</span>
                      </div>
                      <div className="link-right-wrapper">
                        <div className="qr-container" style={{ position: 'relative' }}>
                          <QRCodeSVG value={link.url} size={80} level="H" />
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#ffffff',
                            padding: '4px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                          }}>
                            <div style={{color: link.iconColor || link.color, fontSize: '20px', display: 'flex'}}>
                              {IconMap[link.icon]}
                            </div>
                          </div>
                        </div>
                        <FaChevronRight className="link-right" style={{ color: 'rgba(255,255,255,0.8)' }} />
                      </div>
                    </a>
                  ))}
                </div>
              </article>
            ))
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-logo">Vansh Group</div>
          <p className="footer-text">© {new Date().getFullYear()} Vansh Group of Companies. All rights reserved.</p>
          <p className="footer-text" style={{ fontSize: '0.85rem', marginTop: '12px' }}>Empowering farmers in Barabanki, Uttar Pradesh, India</p>
        </footer>

      </div>
    </>
  );
}

export default App;
