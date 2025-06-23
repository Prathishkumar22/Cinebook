import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <a href="/"><button>Back</button></a>
        <h1>About <span className="brand">CineBook</span></h1>
        
        <div className="about-content">
          <p>
            Welcome to <strong>CineBook</strong>, your ultimate movie discovery platform! 
            Whether you're searching for the latest blockbusters, timeless classics, 
            or hidden gems, CineBook helps you find the perfect film to watch. 
          </p>
          
          <p>
            Browse by genre, release year, ratings, or popularity—CineBook has it all. 
            Save favorites, create watchlists, and stay updated on trending films.
          </p>
          
          <div className="founder-social">
            <p className="founder-info">
              <strong>Founded by Prathish Kumar</strong>,<strong>Logo Designed by Harishya</strong>, CineBook is designed for movie lovers, by movie lovers.
            </p>
            
            <div className="social-icons">
              <a href="https://facebook.com/cinebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="icon" />
              </a>
              <a href="https://twitter.com/cinebook" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon" />
              </a>
              <a href="https://instagram.com/cinebook" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon" />
              </a>
              <a href="https://linkedin.com/company/cinebook" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="icon" />
              </a>
              <a href="https://youtube.com/cinebook" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2>Get in Touch</h2>
          <ul className="contact-list">
            <li>📧 <a href="mailto:prathishaarth100@gmail.com">prathishaarth100@gmail.com</a></li>
            <li>📞 <a href="tel:+91887077497">+91 8870774597</a></li>
            <li>📍 <a href="https://maps.app.goo.gl/Mq9NBB7JGXZcTJJ6A" target="_blank" rel="noopener noreferrer">Rathinam Technical Campus,Coimbatore,Tamilnadu,India</a></li>
          </ul>
          
          {/* <div className="map-container">
            <div className="map-placeholder">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.0035586198087!2d76.97436737412404!3d10.93315825628508!
             2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85a5b0a224951%3A0xae661c49913444c0!2sRathinam%20Technical%20Campus!5e1!3m2!
             1sen!2sin!4v1750576481444!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div> */}
        </div>
      </section>

      <footer className="copyright-footer">
        <p>© {new Date().getFullYear()} CineBook. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;