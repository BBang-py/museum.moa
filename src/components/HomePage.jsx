import { useEffect, useRef, useState } from 'react';
import LanguageSwitch from './LanguageSwitch.jsx';

const duration = 5000;

const slides = [
  {
    region: 'Seoul',
    title: <>National Museum<br />of Korea</>,
    name: '국립중앙박물관',
    description: '한국의 역사와 문화를 대표하는 유물과 전시를 폭넓게 만날 수 있는 대표 박물관입니다.',
    site: 'https://www.museum.go.kr',
  },
  {
    region: 'Seoul',
    title: <>National Folk<br />Museum of Korea</>,
    name: '국립민속박물관',
    description: '한국인의 생활문화와 민속 자료를 폭넓게 다루는 대표 박물관입니다.',
    site: 'https://www.nfm.go.kr',
  },
  {
    region: 'Gangwon',
    title: <>Chuncheon<br />National Museum</>,
    name: '국립춘천박물관',
    description: '강원 지역의 역사와 문화유산을 소개하는 박물관입니다.',
    site: 'https://chuncheon.museum.go.kr',
  },
  {
    region: 'Gyeongsang',
    title: <>Gyeongju<br />National Museum</>,
    name: '국립경주박물관',
    description: '신라 문화유산을 중심으로 구성된 대표 박물관입니다.',
    site: 'https://gyeongju.museum.go.kr',
  },
  {
    region: 'Gyeongsang',
    title: <>Gimhae<br />National Museum</>,
    name: '국립김해박물관',
    description: '가야의 역사와 문화를 중심으로 전시를 구성한 박물관입니다.',
    site: 'https://gimhae.museum.go.kr',
  },
  {
    region: 'Chungcheong',
    title: <>Gongju<br />National Museum</>,
    name: '국립공주박물관',
    description: '백제 문화권을 이해하는 데 중요한 대표 박물관입니다.',
    site: 'https://gongju.museum.go.kr',
  },
  {
    region: 'Chungcheong',
    title: <>Buyeo<br />National Museum</>,
    name: '국립부여박물관',
    description: '부여를 중심으로 한 백제 문화유산을 폭넓게 다루는 박물관입니다.',
    site: 'https://buyeo.museum.go.kr',
  },
  {
    region: 'Jeolla',
    title: <>Jeonju<br />National Museum</>,
    name: '국립전주박물관',
    description: '전북 지역의 역사와 문화를 바탕으로 전시를 구성한 박물관입니다.',
    site: 'https://jeonju.museum.go.kr',
  },
  {
    region: 'Jeolla',
    title: <>Naju<br />National Museum</>,
    name: '국립나주박물관',
    description: '영산강 유역 고분문화와 지역 문화를 중심으로 전시를 구성한 박물관입니다.',
    site: 'https://naju.museum.go.kr',
  },
  {
    region: 'Jeju',
    title: <>Jeju<br />National Museum</>,
    name: '국립제주박물관',
    description: '제주의 역사와 해양 문화, 지역적 특성을 함께 보여주는 박물관입니다.',
    site: 'https://jeju.museum.go.kr',
  },
];

const slideTranslations = [
  {
    name: 'National Museum of Korea',
    description: 'A flagship museum where visitors can explore Korea’s history, culture, and major collections in one place.',
  },
  {
    name: 'National Folk Museum of Korea',
    description: 'A museum dedicated to Korean everyday life, folk traditions, and cultural heritage.',
  },
  {
    name: 'Chuncheon National Museum',
    description: 'A regional museum introducing the history and cultural heritage of Gangwon Province.',
  },
  {
    name: 'Gyeongju National Museum',
    description: 'A leading museum centered on the art, history, and heritage of the Silla kingdom.',
  },
  {
    name: 'Gimhae National Museum',
    description: 'A museum focused on the history and culture of Gaya, an ancient kingdom in southern Korea.',
  },
  {
    name: 'Gongju National Museum',
    description: 'A key museum for understanding Baekje culture and the heritage of the Gongju region.',
  },
  {
    name: 'Buyeo National Museum',
    description: 'A museum presenting Baekje cultural heritage centered around Buyeo.',
  },
  {
    name: 'Jeonju National Museum',
    description: 'A museum built around the history and cultural identity of the Jeonbuk region.',
  },
  {
    name: 'Naju National Museum',
    description: 'A museum highlighting ancient tomb culture and regional history around the Yeongsan River.',
  },
  {
    name: 'Jeju National Museum',
    description: 'A museum showcasing Jeju’s history, maritime culture, and island identity.',
  },
];

export default function HomePage({ language, onLanguageChange, onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const wheelLocked = useRef(false);

  const moveTo = (next) => {
    setCurrent((next + slides.length) % slides.length);
    setProgressKey((key) => key + 1);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      moveTo(current + 1);
    }, duration);
    return () => window.clearInterval(timer);
  }, [current]);

  useEffect(() => {
    const onWheel = (event) => {
      if (wheelLocked.current) return;
      wheelLocked.current = true;
      moveTo(current + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 900);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current]);

  return (
    <main className="home-page">
      <header className="home-header">
        <button type="button" className="logo logo-image" onClick={() => onNavigate('home')}>
          <img src="/assets/museum_moa_main_transparent_logo (1).png" alt="뮤지엄모아 로고" />
        </button>
        <div className="home-header-actions">
          <LanguageSwitch language={language} onLanguageChange={onLanguageChange} label="언어 선택" />
          <button type="button" className="top-explore-btn" onClick={() => onNavigate('explore')}>
            {language === 'eng' ? 'Explore Museums' : '다른 박물관 둘러보기'}
          </button>
        </div>
      </header>

      <div className="slider-wrap">
        <div className="page-indicator">
          <span>{String(current + 1).padStart(2, '0')}</span> / {slides.length}
        </div>

        <div className="slider" style={{ transform: `translateX(-${current * 100}vw)` }}>
          {slides.map((slide, index) => (
            <section className={`slide s${index + 1}`} key={slide.name}>
              <div className="slide-content">
                <div className="slide-sub">{slide.region}</div>
                <h1>{slide.title}</h1>
                <div className="museum-name">{language === 'eng' ? slideTranslations[index].name : slide.name}</div>
                <p>{language === 'eng' ? slideTranslations[index].description : slide.description}</p>
                <div className="slide-links">
                  <a href={slide.site} target="_blank" rel="noreferrer" className="slide-link">
                    {language === 'eng' ? 'Visit Official Website' : '공식 홈페이지 보기'}
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="arrow">
          <button type="button" onClick={() => moveTo(current - 1)}>‹</button>
          <button type="button" onClick={() => moveTo(current + 1)}>›</button>
        </div>

        <div className="dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.name}
              className={`dot ${index === current ? 'active' : ''}`}
              aria-label={`${index + 1}번째 슬라이드`}
              onClick={() => moveTo(index)}
            />
          ))}
        </div>

        <div className="progress-wrap">
          <div key={progressKey} className="progress-fill" />
        </div>
      </div>
    </main>
  );
}
