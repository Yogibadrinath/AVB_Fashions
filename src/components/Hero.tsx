import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <OwlCarousel items={1} loop autoplay>
        <div className="single-hero-items set-bg" style={{ backgroundImage: "url('/img/hero-1.jpg')" }}>
          <div className="container">
            <h1>Black Friday</h1>
            <a href="#" className="primary-btn">Shop Now</a>
          </div>
        </div>
      </OwlCarousel>
    </section>
  );
};

export default Hero;
