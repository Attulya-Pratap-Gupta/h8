import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";
import Logo from "./assets/imgs/Logo2.svg";
import Logo2 from "./assets/imgs/Logo3.svg";
import PadPop from "./assets/imgs/PadPop.svg";
import Menu from "./assets/imgs/Menu.svg";
import ArrowRight from "./assets/imgs/ArrowRight.svg";
import Icon1 from "./assets/imgs/Icon1.svg";
import Icon2 from "./assets/imgs/Icon2.svg";
import Icon3 from "./assets/imgs/Icon3.svg";
import Icon4 from "./assets/imgs/Icon4.svg";
import Icon5 from "./assets/imgs/Icon5.svg";
import Icon6 from "./assets/imgs/Icon6.svg";
import Icon7 from "./assets/imgs/Icon7.svg";
import Icon8 from "./assets/imgs/Icon8.svg";
import Partner1 from "./assets/imgs/Partner1.svg";
import Partner2 from "./assets/imgs/Partner2.svg";
import Partner3 from "./assets/imgs/Partner3.svg";
import Partner4 from "./assets/imgs/Partner4.svg";
import Partner5 from "./assets/imgs/Partner5.svg";
import Mobile1 from "./assets/imgs/MobileImg1.png";
import Mobile2 from "./assets/imgs/MobileImg2.png";
import Mobile3 from "./assets/imgs/MobileImg3.png";
import Mobile4 from "./assets/imgs/MobileImg4.png";
import TestR from "./assets/imgs/test_right.svg";
import TestL from "./assets/imgs/test_left.svg";
import DP1 from "./assets/imgs/dp1.jpg";
import DP2 from "./assets/imgs/dp2.jpg";
import DP3 from "./assets/imgs/dp3.jpg";
import DP4 from "./assets/imgs/dp4.jpg";
import Twitter from "./assets/imgs/twitter.svg";
import Facebook from "./assets/imgs/facebook.svg";
import Insta from "./assets/imgs/insta.svg";
import ClientsBar from "./assets/imgs/clients-bars.png";
import TwitterCircle from "./assets/imgs/twitter-circle.svg";
import InstaCircle from "./assets/imgs/InstaCircle.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import emailjs from '@emailjs/browser';

import gsap from "gsap";
import {
  Back,
  Power3,
  Power1,
  Power2,
  Power4,
  Linear,
  Expo,
  Circ,
} from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { BsXLg } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";

SwiperCore.use([Navigation]);
const App = () => {
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [prevClientName, setPrevClientName] = useState("");
  const [nextClientName, setNextClientName] = useState("");
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const form = useRef();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubscribeStatus('Please enter an email address.');
      return;
    }
    
    setSubscribeStatus('Subscribing...');

    try {
      const result = await emailjs.sendForm(
        'service_s530k5r', // Replace with your EmailJS service ID
        'template_fdhad9c', // Replace with your EmailJS template ID
        form.current,
        '76BtYn8aPjPa9Qh9y' // Replace with your EmailJS public key
      );

      console.log(result.text);
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error(error.text);
      setSubscribeStatus('An error occurred. Please try again.');
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSlideChange = (swiper) => {
    setCenteredIndex(swiper.realIndex);
  };

  gsap.registerPlugin(
    Draggable,
    ScrollSmoother,
    SplitText,
    ScrollTrigger,
    ScrollToPlugin
  );

  const sectionRef = useRef(null);
  // Landing Animation
  useEffect(() => {
    // ScrollSmoother.create({
    //   smooth: 1.15,
    //   effects: true,
    //   smoothTouch: 0,
    // });

    // Text Spliting
    const HomeHeroHeading = new SplitText(".hero-content h2", {
      type: "words, lines",
      wordsClass: "hero-heading-word-++",
      reduceWhiteSpace: true,
    });
    const HomeHeroHeadingLines = HomeHeroHeading.lines;

    let landingAnim = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 50%",
      },
    });
    landingAnim
      .fromTo(
        HomeHeroHeadingLines,
        {
          y: "7.5rem",
          opacity: 0,
        },
        {
          y: "0",
          opacity: 1,
          duration: 0.75,
          ease: Power1.easeInOut,
          stagger: {
            each: 0.075,
          },
        }
      )
      .fromTo(
        ".hero-content .primary-btn",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );

    gsap.utils.toArray(".au-flex-content h4").forEach((element) => {
      const value = parseInt(element.dataset.value, 10);
      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: value,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 10%",
            onEnter: () => {
              gsap.to(element, {
                innerText: value,
                duration: 2,
                ease: "power3.out",
                snap: { innerText: 1 },
                stagger: 0.1,
                onUpdate: function () {
                  element.innerText = `${Math.round(element.innerText)}%`;
                },
              });
            },
            once: true,
          },
        }
      );
    });
  }, []);

  const [activeName, setActiveName] = useState("Jay Shetty");

  const clients = [
    {
      name: "Pop Shift",
      role: "South Asian x Pop Culture",
      videoId: "sp5O0Gz-hBE",
      instagram: "https://www.instagram.com/popshift/?hl=en",
      youtube: "https://www.youtube.com/@PopShift/featured",
    },
    {
      name: "BFunk",
      role: "Bollywood/Bhangra Dance",
      videoId: "W1z4zDlpxRM",
      instagram: "https://www.instagram.com/bfunk/?hl=en",
      youtube: "https://www.youtube.com/@BFunkDance",
    },
    {
      name: "JusReign",
      role: "@JusReign",
      videoId: "q73kY2GLWX0",
      instagram: "https://www.instagram.com/jusreign/?hl=en",
      youtube: "https://www.youtube.com/JusReign",
    },
    {
      name: "Jay Shetty",
      role: "@JayShettyPodcast",
      videoId: "g2cQ2kD6lzs",
      instagram: "https://www.instagram.com/jayshetty/?hl=en",
      youtube: "https://www.youtube.com/@JayShettyPodcast./featured",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className="padpop">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="padpop-content">
            <div className="fixed-box">
              <div className="marquee-box">
                <Marquee>
                  <div className="marquee-content">
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                    <img src={Logo} alt="" />
                  </div>
                </Marquee>
              </div>
              <section className="hero-section">
                <div
                  className={`header-section ${isScrolled ? "scrolled" : ""}`}
                >
                  <div className="box">
                    <header>
                      <div className="header-content">
                        <Link to="/">
                        <img src={isScrolled ? Logo2 : Logo} alt="" className="padpop" />
                        </Link>
                        {isMenuOpen ? (
                          <BsXLg
                            onClick={closeMenu}
                            className="desktop-close"
                          />
                        ) : (
                          <img
                            src={Menu}
                            alt="Menu Icon"
                            className="menu-icon"
                            onClick={toggleMenu}
                          />
                        )}
                      </div>
                    </header>
                    {isMenuOpen && (
                      <div className="mobile-menu">
                        <div className="mobile-menu-top">
                          <Link to="/">
                            <img src={Logo} alt="" />
                          </Link>
                          <BsXLg onClick={closeMenu} />
                        </div>
                        <div className="mobile-menu-bottom">
                          <a href="#aboutus" onClick={(e) => { e.preventDefault(); scrollToSection("aboutus"); }}>
                            About Us
                          </a>
                          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection("benefits"); }}>
                            Benefits
                          </a>
                          <a href="#ourclients" onClick={(e) => { e.preventDefault(); scrollToSection("ourclients"); }}>
                            Our Clients
                          </a>
                          <a href="#testimonial" onClick={(e) => { e.preventDefault(); scrollToSection("testimonial"); }}>
                            Testimonials
                          </a>
                          <a href="#contactus" onClick={(e) => { e.preventDefault(); scrollToSection("contactus"); }}>
                            Contact Us
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="box">
                  <div className="hero-content">
                    <h2>
                      JOIN US IN <br></br> CULTIVATING <br></br>
                      CULTURE AND <br></br> INSPIRING <br></br>
                      GENERATIONS
                    </h2>
                    <button
                      className="primary-btn"
                      onClick={() => scrollToSection("contactus")}
                    >
                      <span>JOIN US</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <section className="aboutus-section" ref={sectionRef} id="aboutus">
              <div className="box">
                <div className="aboutus-content">
                  <h3>About us</h3>
                  <p>
                  HYPHN8 Media is a unique platform dedicated to supporting and promoting content creators from South Asian communities. 
                  We understand the importance of preserving cultural heritage and strive to ensure your voice is heard. 
                  Our mission is to provide resources and support to help you grow your content, 
                  fostering cultural exchange and deeper understanding.
                  </p>
                  <div className="aboutus-flex">
                    <div className="aboutus-flex-gradient-container">
                      <div className="au-flex-content">
                        <h4 data-value="73%">73%</h4>
                        <h6>of homeowners list with agents who use video</h6>
                      </div>
                      <hr />
                      <div className="au-flex-content">
                        <h4 data-value="51%">51%</h4>
                        <h6>homebuyers use YouTube as #1 search tool</h6>
                      </div>
                      <hr />
                      <div className="au-flex-content">
                        <h4 data-value="66%">66%</h4>
                        <h6>more qualified leads from video listings</h6>
                      </div>
                  </div>
    </div>
                </div>
              </div>
            </section>
            <section className="benefits-section" id="benefits">
              <div className="benefits-content">
                <div className="benefits-heading">
                  <h3>Benefits of Joining</h3>
                </div>
                <div className="benefits-flex">
                  <div 
                    className="benefits-flex-box"
                    onMouseEnter={() => setHoveredBenefit(1)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <div>
                      <img src={hoveredBenefit === 1 ? Icon5 : Icon1} alt="" />
                      <h5>Direct Media Advertising</h5>
                      <p>We connect you with advertisers looking to celebrate South Asian culture, 
                        ensuring your content reaches and engaged audience.</p>
                    </div>
                    
                  </div>
                  <div 
                    className="benefits-flex-box"
                    onMouseEnter={() => setHoveredBenefit(2)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <div>
                      <img src={hoveredBenefit === 2 ? Icon6 : Icon2} alt="" />
                      <h5>Brand Integrations</h5>
                      <p>We pair you with premium brands that resonate with South Asian values and interests, 
                        creating authentic and profitable partnerships.</p>
                    </div>
                    
                  </div>
                  <div 
                    className="benefits-flex-box"
                    onMouseEnter={() => setHoveredBenefit(3)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <div>
                      <img src={hoveredBenefit === 3 ? Icon7 : Icon3} alt="" />
                      <h5>Channel optimization services </h5>
                      <p>Enhance your channel's performance with our expert optimization services, 
                        helping you reach your full potential on YouTube.</p>
                    </div>
                    
                  </div>
                  <div 
                    className="benefits-flex-box"
                    onMouseEnter={() => setHoveredBenefit(4)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <div>
                      <img src={hoveredBenefit === 4 ? Icon8 : Icon4} alt="" />
                      <h5>Curated Collaborations</h5>
                      <p>We offer various monetization programs and promotions to increase your revenue and visibility.</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </section>
            <section className="clients-section" id="ourclients">
              <div className="box">
                <div className="client-content">
                  <h3>MEET OUR CLIENTS</h3>
                  <div className="clients-swiper-box">
                    <div className="clients-bar">
                      <img src={ClientsBar} alt="" className="sm-cb" />
                      <div className="cb-text sm-text cb-text-reverse">
                        <h5>{prevClientName}</h5>
                      </div>
                    </div>
                    <div className="clients-bar">
                      <img src={ClientsBar} alt="" className="lg-cb" />
                      <div className="cb-text cb-text-reverse">
                        <h5>{activeName}</h5>
                        <span className="client-prev">
                          <img
                            src={ArrowRight}
                            alt=""
                            className="rotate-arrow "
                          />
                        </span>
                      </div>
                    </div>

                    <div className="clients-swiper">
                      <Swiper
                        spaceBetween={5}
                        slidesPerView={1}
                        modules={[Navigation]}
                        navigation={{
                          nextEl: ".client-next",
                          prevEl: ".client-prev",
                        }}
                        loop={true}
                        onSlideChange={(swiper) => {
                          const { realIndex } = swiper;
                          setActiveName(clients[realIndex].name);
                          setPrevClientName(clients[(realIndex - 1 + clients.length) % clients.length].name);
                          setNextClientName(clients[(realIndex + 1) % clients.length].name);
                        }}
                        breakpoints={{
                          750: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                          },
                          1100: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                        }}
                      >
                        {clients.map((client, index) => (
                          <SwiperSlide key={index}>
                            <div className="client-swiper-content">
                              <iframe
                                src={`https://www.youtube.com/embed/${client.videoId}?autoplay=1&mute=1`}
                                title={client.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                              <div className="csc-content">
                                <div className="csc-left">
                                  <h6>{client.name}</h6>
                                  <p>{client.role}</p>
                                  <p>2d ago</p>
                                </div>
                                <div className="csc-right">
                                  <Link
                                    to={client.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={InstaCircle} alt="Instagram" />
                                  </Link>
                                  <Link
                                    to={client.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={TwitterCircle} alt="YouTube" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="clients-bar">
                      <img src={ClientsBar} alt="" className="lg-cb" />
                      <div className="cb-text lg-text">
                        <h5>{activeName}</h5>
                        <span className="client-next">
                          <img src={ArrowRight} alt="" />
                        </span>
                      </div>
                    </div>
                    <div className="clients-bar">
                      <img src={ClientsBar} alt="" className="sm-cb" />
                      <div className="cb-text sm-text">
                        <h5>{nextClientName}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="testimonial-section" id="testimonial">
              <div className="box">
                <div className="testimonial-content">
                  <div className="testimonial-heading">
                    <h3>CLIENT <br></br> TESTIMONIALS</h3>
                    <div className="th-right">
                      <span className="testi-prev">
                        <img src={TestL} alt="" />
                      </span>
                      <span className="testi-next">
                        <img src={TestR} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="testimonial-swiper">
                    <Swiper
                      spaceBetween={30}
                      slidesPerView={1.25}
                      modules={[Navigation]}
                      onSlideChange={onSlideChange}
                      navigation={{
                        nextEl: ".testi-next",
                        prevEl: ".testi-prev",
                      }}
                      loop={true}
                      centeredSlides={true}
                      breakpoints={{
                        650: {
                          slidesPerView: 2.05,
                          spaceBetween: 30,
                        },
                        950: {
                          slidesPerView: 3.05,
                          spaceBetween: 30,
                        },
                        1250: {
                          slidesPerView: 4.05,
                          spaceBetween: 30,
                        },
                      }}
                    >
                      
                      <SwiperSlide
                        className={centeredIndex === 1 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile2} alt="" style={{ filter: 'brightness(0.8)' }}/>
                          <div className="swiper-text">
                            <p>
                            HYPHN8 Media has been a game-changer, providing invaluable resources to grow my audience and connect with creators.
                            </p>
                            <div className="client-info">
                              <img src={DP2} alt="" />
                              <div>
                                <h6>PopShift</h6>
                                <span>South asian x Pop culture</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className={centeredIndex === 2 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile3} alt="" style={{ filter: 'brightness(0.78)' }}/>
                          
                          <div className="swiper-text">
                            <p>
                            HYPHN8 Media has been a lifeline for my growth, offering unmatched support and resources!
                            </p>
                            <div className="client-info">
                              <img src={DP3} alt="" />
                              <div>
                                <h6>BFunk</h6>
                                <span>Bollywood x Bhangra</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className={centeredIndex === 3 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile4} alt="" style={{ filter: 'brightness(0.9)' }}/>
                          <div className="swiper-text">
                            <p>
                            HYPHN8 Media has transformed my YouTube channel, helping me amplify my reach while staying true to my heritage.
                            </p>
                            <div className="client-info">
                              <img src={DP4} alt="" />
                              <div>
                                <h6>Jay Shetty</h6>
                                <span>Youtube | Podcast</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide
                        className={centeredIndex === 5 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile2} alt="" style={{ filter: 'brightness(0.8)' }}/>
                          <div className="swiper-text">
                            <p>
                            HYPHN8 Media has been a game-changer, providing invaluable resources to grow my audience and connect with creators.
                            </p>
                            <div className="client-info">
                              <img src={DP2} alt="" />
                              <div>
                                <h6>PopShift</h6>
                                <span>South asian x Pop culture</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className={centeredIndex === 6 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile3} alt="" style={{ filter: 'brightness(0.78)' }}/>
                          <div className="swiper-text">
                            <p>
                            HYPHN8 Media has been a lifeline for my growth, offering unmatched support and resources!
                            </p>
                            <div className="client-info">
                              <img src={DP3} alt="" />
                              <div>
                                <h6>BFunk</h6>
                                <span>Bollywood x Bhangra</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className={centeredIndex === 7 ? "centered-slide" : ""}
                      >
                        <div className="swiper-content">
                          <img src={Mobile4} alt="" style={{ filter: 'brightness(0.9)' }}/>
                          <div className="swiper-text"> 
                            <p>
                            HYPHN8 Media has transformed my YouTube channel, helping me amplify my reach while staying true to my heritage.
                            </p>
                            <div className="client-info">
                              <img src={DP4} alt="" />
                              <div>
                                <h6>Jay Shetty</h6>
                                <span>Youtube | Podcast</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </section>
            <section className="partners-section">
              <div className="box">
                <div className="partners-box">
                  <Marquee>
                    <div className="partner-marquee">
                      <img src={Partner5} alt="" />
                      <img src={Partner4} alt="" />
                      <img src={Partner3} alt="" />
                      <img src={Partner2} alt="" />
                      <img src={Partner1} alt="" />
                    </div>
                  </Marquee>
                </div>
              </div>
            </section>
            <section className="subscribe-section" id="contactus">
              <div className="box">
                <div className="subscribe-content">
                  <h4>HIT THAT SUBSCRIBE BUTTON</h4>
                  <form ref={form} onSubmit={handleSubscribe} className="subscribe-field">
                    <input 
                      type="email" 
                      name="user_email" // This matches the {{user_email}} in the template
                      placeholder="Enter Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                      type="hidden" 
                      name="subscription_date" 
                      value={new Date().toLocaleString()} // This matches {{subscription_date}} in the template
                    />
                    <button type="submit" className="primary-btn">
                      <span>Subscribe</span>
                    </button>
                  </form>
                  {subscribeStatus && <p className="subscribe-status">{subscribeStatus}</p>}
                  <p>Embracing Diversity. Celebrating Culture. Amplifying Your Reach</p>
                </div>
              </div>
            </section>
            <footer>
              <div className="box">
                <div className="footer-content">
                  <Link to="/">
                    <img src={Logo2} alt="" className="padpop" />
                  </Link>
                  <div className="social-icons">
                    <Link to="/">
                      <img src={Twitter} alt="" />
                    </Link>
                    <Link to="/">
                      <img src={Facebook} alt="" />
                    </Link>
                    <Link to="/">
                      <img src={Insta} alt="" />
                    </Link>
                  </div>
                  <div className="footer-text">
                    <p>© Copyright 2024, All Rights Reserved</p>
                    <div className="footer-links">
                      <Link to="/">Terms & Conditions</Link>
                      <Link to="/">Privacy Policy</Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
