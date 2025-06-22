import { Link } from 'react-router-dom'
import logo from '../images/CinebookLogo-removebg-preview.png'
import styles from '../pages/Home.module.css'
import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'

function Home() {
  const movies = [
    { title: "Inception", image: 'src/images/inception.jpg' },
    { title: "Inception", image: 'src/images/inception.jpg' },
    { title: "Inception", image: 'src/images/inception.jpg' },
    { title: "Inception", image: 'src/images/inception.jpg' }
  ]

  // State for auth modal
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [modalPosition, setModalPosition] = useState(0)
  const [startY, setStartY] = useState(0)
  const modalRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!isLogin && !formData.name) newErrors.name = 'Name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register'
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      console.log('Auth successful:', data)
      setShowAuthModal(false)
    } catch (err) {
      setErrors({ form: err.message })
    }
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    
    // Only allow downward swipe to close
    if (diff > 0) {
      setModalPosition(diff)
    }
  }

  const handleTouchEnd = () => {
    // If swiped down more than 100px, close the modal
    if (modalPosition > 100) {
      setShowAuthModal(false)
    }
    setModalPosition(0)
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowAuthModal(false)
      }
    }

    if (showAuthModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAuthModal])

  return (
    <>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <h1>Cinebook</h1>
      </div>
      <nav className={styles.navbar}>
        <a href="/"><button>Home</button></a>
        <button onClick={() => setShowAuthModal(true)}>Login</button>
        <Link to="/about"><button>About</button></Link>
      </nav>
      <div className={styles.panel}>
        <h1>Cinebook is for seeing the movie Details</h1>
        <a href="/movie"><button>Get to Know about Cinema</button></a>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className={styles.modalOverlay}>
          <div 
            ref={modalRef}
            className={styles.modalContainer}
            style={{ transform: `translateY(${modalPosition}px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.modalDragHandle}></div>
            <button className={styles.closeButton} onClick={() => setShowAuthModal(false)}>
              <FaTimes />
            </button>
            
            <h2>{isLogin ? 'Welcome Back' : 'Join CineBook'}</h2>
            <p>{isLogin ? 'Sign in to access your watchlist' : 'Create an account to get started'}</p>
            
            {errors.form && <div className={styles.errorMessage}>{errors.form}</div>}
            
            <form onSubmit={handleSubmit} className={styles.authForm}>
              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.error : ''}
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.error : ''}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? styles.error : ''}
                />
                {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
              </div>
              
              <button type="submit" className={styles.authButton}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
              
              <div className={styles.toggleAuth}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>

              <div className={styles.socialLogin}>
                <button type="button" className={styles.socialButton}>
                  <FaFacebook /> Continue with Facebook
                </button>
                <button type="button" className={styles.socialButton}>
                  <FaGoogle /> Continue with Google
                </button>
                <button type="button" className={styles.socialButton}>
                  <FaTwitter /> Continue with Twitter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Home