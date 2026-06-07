import { useEffect, useMemo, useState } from 'react';
import { museums, regions } from '../data/museums.js';
import LanguageSwitch from './LanguageSwitch.jsx';

const REVIEW_API_URL = 'https://script.google.com/macros/s/AKfycbwymkciLPN3TBHxog03Jz-G6r8uQlY9k5Usct2ly-nG83ZA5Nie94nfqiXTdyy5Bsv3nA/exec';

const discoveryItems = [
  {
    href: 'http://www.jewelmuseum.go.kr',
    name: '익산 보석박물관',
    nameEn: 'Iksan Jewelry Museum',
    description: '화려하고 진귀한 보석을 만나보세요',
    descriptionEn: 'Colorful gems and jewelry.',
  },
  {
    href: 'https://www.gica.or.kr/Ani/M10000/M10100/html',
    name: '애니메이션박물관',
    nameEn: 'Animation Museum',
    description: '우리의 과거와 미래가 소통하는 공간',
    descriptionEn: 'Animation across time.',
  },
  {
    href: 'http://uhangridinopia.haenam.go.kr/',
    name: '해남공룡박물관',
    nameEn: 'Haenam Dinosaur Museum',
    description: '세계 최대의 익룡발자국이 발견된 곳',
    descriptionEn: 'Rare dinosaur-era footprints.',
  },
  {
    href: 'https://ijcf.or.kr/main/space/museum4.jsp',
    name: '짜장면박물관',
    nameEn: 'Jjajangmyeon Museum',
    description: '국내 최초의 짜장면 테마박물관',
    descriptionEn: 'Korea’s first jjajangmyeon museum.',
  },
  {
    href: 'http://www.ywmuseum.com/museum/index.do?museum_no=8',
    name: '단종역사관',
    nameEn: 'Danjong History Museum',
    description: '역사의 그림자에 가려졌던 별',
    descriptionEn: 'Remembering King Danjong.',
  },
];

const benefitSlides = [
  {
    href: 'https://www.mnuri.kr/main/main.do',
    image: '/assets/banner_1_문화누리카드_만들고_지원금액_받기.png',
    label: '문화누리카드 만들고 지원금액 받기',
    labelEn: 'Culture Nuri Card Support',
  },
  {
    href: 'https://youthculturepass.or.kr/',
    image: '/assets/banner_2_청년_문화예술패스.png',
    label: '청년 문화예술패스',
    labelEn: 'Youth Culture Pass',
  },
  {
    href: 'https://www.culture.go.kr/local/wday/cltrDay.do',
    image: '/assets/banner_3_문화가_있는_날.png',
    label: '문화가 있는 날',
    labelEn: 'Culture Day',
  },
];

const reviewCategories = [
  { key: 'transport', label: '교통 접근성' },
  { key: 'commerce', label: '주변 상권' },
  { key: 'content', label: '전시 콘텐츠' },
  { key: 'comfort', label: '관람 편의성' },
];

const exploreText = {
  kor: {
    discoveryLabel: '흥미로운 박물관 소개',
    discoveryTitle: '오늘의 발견',
    previousPick: '이전 추천',
    nextPick: '다음 추천',
    pause: '일시정지',
    play: '재생',
    home: <>메인으로<br />돌아가기</>,
    findMuseum: <>박물관<br />찾기</>,
    reportInfo: <>정보 수정<br />제보</>,
    heroTitle: <>대한민국엔 수많은<br />박물관이 있습니다.</>,
    heroDesc: <>전국 곳곳의 국립·공립 박물관을<br />한곳에서 쉽게 찾아볼 수 있도록 정리했습니다.</>,
    total: '전체',
    national: '국립',
    public: '공립',
    heroScroll: '박물관 둘러보기 ↓',
    benefitTitle: <>가기 전에,<br />챙길 수 있는 혜택부터</>,
    benefitDesc: '박물관을 고르기 전에 이용할 수 있는 각종 문화 혜택을 확인해보세요.',
    filter: '필터',
    search: '검색',
    searchPlaceholder: '박물관명, 지역, 주소 검색',
    region: '지역',
    type: '운영 유형',
    fee: '관람료',
    all: '전체',
    free: '무료',
    paid: '유료',
    reset: '필터 초기화',
    showing: '현재',
    showingSuffix: '개 박물관 표시 중',
    resultSuffix: '개의 박물관',
    resultSearchPlaceholder: '결과 안에서 빠르게 검색',
    resultHint: '카드를 누르면 상세 정보를 볼 수 있습니다.',
    recentTitle: '최근 본 박물관',
    recentEmpty: '아직 열어본 박물관이 없습니다.',
    favoriteOnly: '즐겨찾기만 보기',
    favoriteAdd: '즐겨찾기에 추가',
    favoriteRemove: '즐겨찾기에서 제거',
    empty: '조건에 맞는 박물관이 없습니다.',
    feedbackTitle: <>정보가 다르다면<br />알려주세요.</>,
    feedbackDesc: '운영 시간, 관람료, 휴관일 등 바뀐 정보를 제보하면 더 정확한 박물관 아카이브를 만들 수 있습니다.',
    museumName: '박물관명',
    feedbackMuseumPlaceholder: '예: 국립중앙박물관',
    feedbackText: '수정 내용',
    feedbackTextPlaceholder: '어떤 정보가 잘못되었는지 적어주세요.',
    feedbackImage: '이미지 첨부',
    chooseFile: '파일 선택',
    noFileSelected: '선택된 파일 없음',
    submit: '제보하기',
    detail: '상세 정보 보기',
    weekday: '평일',
    holiday: '공휴일',
    closed: '휴관일',
    feeText: '관람료',
    phone: '전화',
    address: '주소',
    officialSite: '공식 홈페이지 보기',
    reviewTitle: '다른 사람의 리뷰를 확인해보세요',
    reviewDesc: '교통, 주변 상권, 전시 콘텐츠, 관람 편의성에 대한 방문자 반응을 가볍게 남겨볼 수 있습니다.',
    reviewBubbleFirst: '다른 사람의',
    reviewBubbleSecond: '리뷰를 확인해보세요',
  },
  eng: {
    discoveryLabel: 'Featured museum picks',
    discoveryTitle: 'Today’s Pick',
    previousPick: 'Previous pick',
    nextPick: 'Next pick',
    pause: 'Pause',
    play: 'Play',
    home: <>Back to<br />Main</>,
    findMuseum: <>Find<br />Museums</>,
    reportInfo: <>Report<br />Update</>,
    heroTitle: <>Explore Museums<br />Across Korea.</>,
    heroDesc: <>Find national and public museums across Korea<br />with simple search and visitor-friendly details.</>,
    total: 'Total',
    national: 'National',
    public: 'Public',
    heroScroll: 'Browse Museums ↓',
    benefitTitle: <>Before You Go,<br />Check Cultural Benefits</>,
    benefitDesc: 'Review cultural passes and visitor benefits before choosing a museum.',
    filter: 'Filters',
    search: 'Search',
    searchPlaceholder: 'Museum, region, address',
    region: 'Region',
    type: 'Operation Type',
    fee: 'Admission',
    all: 'All',
    free: 'Free',
    paid: 'Paid',
    reset: 'Reset Filters',
    showing: 'Showing',
    showingSuffix: 'museums',
    resultSuffix: 'museums',
    resultSearchPlaceholder: 'Museum, region, address',
    resultHint: 'Select a card to view details.',
    recentTitle: 'Recently Viewed',
    recentEmpty: 'No museums viewed yet.',
    favoriteOnly: 'Favorites only',
    favoriteAdd: 'Add to favorites',
    favoriteRemove: 'Remove from favorites',
    empty: 'No museums match the selected filters.',
    feedbackTitle: <>Found outdated<br />information?</>,
    feedbackDesc: 'Report changed hours, admission fees, closed days, or other updates to help keep the museum archive accurate.',
    museumName: 'Museum Name',
    feedbackMuseumPlaceholder: 'Ex: National Museum of Korea',
    feedbackText: 'Update Details',
    feedbackTextPlaceholder: 'Tell us which information needs to be corrected.',
    feedbackImage: 'Attach Image',
    chooseFile: 'Choose File',
    noFileSelected: 'No file selected',
    submit: 'Submit Update',
    detail: 'View Details',
    weekday: 'Weekdays',
    holiday: 'Holidays',
    closed: 'Closed Days',
    feeText: 'Admission',
    phone: 'Phone',
    address: 'Address',
    officialSite: 'Visit Official Website',
    reviewTitle: 'See what other visitors are saying',
    reviewDesc: 'Leave a quick reaction about access, nearby amenities, exhibition content, and visitor comfort.',
    reviewBubbleFirst: 'See what other',
    reviewBubbleSecond: 'visitors are saying',
  },
};

const reviewCategoryLabels = {
  kor: {
    transport: '교통 접근성',
    commerce: '주변 상권',
    content: '전시 콘텐츠',
    comfort: '관람 편의성',
  },
  eng: {
    transport: 'Access',
    commerce: 'Nearby Area',
    content: 'Exhibitions',
    comfort: 'Comfort',
  },
};

const valueLabels = {
  국립: { kor: '국립', eng: 'National' },
  공립: { kor: '공립', eng: 'Public' },
  무료: { kor: '무료', eng: 'Free' },
  유료: { kor: '유료', eng: 'Paid' },
  전체: { kor: '전체', eng: 'All' },
};

const regionLabels = [
  { names: ['전체'], eng: 'All' },
  { names: ['서울', '서울특별시'], eng: 'Seoul' },
  { names: ['경기', '경기도'], eng: 'Gyeonggi' },
  { names: ['강원', '강원특별자치도'], eng: 'Gangwon' },
  { names: ['충북', '충청북도'], eng: 'Chungbuk' },
  { names: ['충남', '충청남도'], eng: 'Chungnam' },
  { names: ['전북', '전라북도'], eng: 'Jeonbuk' },
  { names: ['전남', '전라남도'], eng: 'Jeonnam' },
  { names: ['경북', '경상북도'], eng: 'Gyeongbuk' },
  { names: ['경남', '경상남도'], eng: 'Gyeongnam' },
  { names: ['부산', '부산광역시'], eng: 'Busan' },
  { names: ['대구', '대구광역시'], eng: 'Daegu' },
  { names: ['인천', '인천광역시'], eng: 'Incheon' },
  { names: ['광주', '광주광역시'], eng: 'Gwangju' },
  { names: ['대전', '대전광역시'], eng: 'Daejeon' },
  { names: ['세종', '세종특별자치시'], eng: 'Sejong' },
  { names: ['울산', '울산광역시'], eng: 'Ulsan' },
  { names: ['제주', '제주특별자치도'], eng: 'Jeju' },
];

function displayValue(value, language) {
  return valueLabels[value]?.[language] || value;
}

function displayRegion(value, language) {
  if (language !== 'eng') return value;
  const match = regionLabels.find((regionLabel) => regionLabel.names.some((name) => String(value).includes(name)));
  return englishOnly(match?.eng, 'Other Region');
}

function englishOnly(value, fallback) {
  const text = String(value || '').trim();
  return text && /^[A-Za-z\s'.-]+$/.test(text) ? text : fallback;
}

const exactMuseumNames = {
  국립중앙박물관: 'National Museum of Korea',
  국립민속박물관: 'National Folk Museum of Korea',
  국립춘천박물관: 'Chuncheon National Museum',
  국립경주박물관: 'Gyeongju National Museum',
  국립김해박물관: 'Gimhae National Museum',
  국립공주박물관: 'Gongju National Museum',
  국립부여박물관: 'Buyeo National Museum',
  국립전주박물관: 'Jeonju National Museum',
  국립나주박물관: 'Naju National Museum',
  국립제주박물관: 'Jeju National Museum',
  익산보석박물관: 'Iksan Jewelry Museum',
  애니메이션박물관: 'Animation Museum',
  해남공룡박물관: 'Haenam Dinosaur Museum',
  짜장면박물관: 'Jjajangmyeon Museum',
  단종역사관: 'Danjong History Museum',
};

function inferMuseumCategory(value) {
  const text = String(value || '');
  if (text.includes('미술')) return 'Art Museum';
  if (text.includes('자연사')) return 'Natural History Museum';
  if (text.includes('민속')) return 'Folk Museum';
  if (text.includes('과학')) return 'Science Museum';
  if (text.includes('어린이')) return 'Children’s Museum';
  if (text.includes('역사')) return 'History Museum';
  if (text.includes('기념')) return 'Memorial Museum';
  if (text.includes('문학')) return 'Literature Museum';
  if (text.includes('도자')) return 'Ceramic Museum';
  if (text.includes('보석')) return 'Jewelry Museum';
  if (text.includes('공룡')) return 'Dinosaur Museum';
  if (text.includes('전시')) return 'Exhibition Center';
  return 'Museum';
}

function displayMuseumName(value, language, museum = {}) {
  if (language !== 'eng') return value;
  const compact = String(value || '').replace(/\s/g, '');
  if (exactMuseumNames[compact]) return exactMuseumNames[compact];

  const regionName = englishOnly(displayRegion(museum.regionFull || museum.region || '', 'eng'), 'Korean');
  const operationType = englishOnly(displayValue(museum.type, 'eng'), '');
  const category = inferMuseumCategory(value);
  const prefix = [regionName, operationType].filter(Boolean).join(' ');
  return `${prefix} ${category}`.replace(/\s+/g, ' ').trim();
}

function displayAddress(museum, language) {
  if (language !== 'eng') return safe(museum.address, language);
  const regionName = englishOnly(displayRegion(museum.regionFull || museum.region, 'eng'), '');
  if (!regionName) return 'Located in Korea. Please check the official website for the exact address.';
  return `Located in ${regionName}, Korea. Please check the official website for the exact address.`;
}

function displayClosedText(value, language) {
  const text = safe(value, language);
  if (language !== 'eng') return text;
  if (text.includes('연중무휴')) return 'Open year-round.';

  const days = [
    ['월요일', 'Mondays'],
    ['화요일', 'Tuesdays'],
    ['수요일', 'Wednesdays'],
    ['목요일', 'Thursdays'],
    ['금요일', 'Fridays'],
    ['토요일', 'Saturdays'],
    ['일요일', 'Sundays'],
  ].filter(([kor]) => text.includes(kor)).map(([, eng]) => eng);

  if (days.length > 0) {
    return `Usually closed on ${days.join(', ')}. Please check before visiting.`;
  }

  if (text.includes('공휴일')) {
    return 'Usually closed on public holidays. Please check before visiting.';
  }

  return 'Closed days vary by museum. Please check before visiting.';
}

const regionTones = [
  { tone: 'region-seoul', names: ['서울'] },
  { tone: 'region-gyeonggi', names: ['경기'] },
  { tone: 'region-gangwon', names: ['강원'] },
  { tone: 'region-chungbuk', names: ['충북', '충청북도'] },
  { tone: 'region-chungnam', names: ['충남', '충청남도'] },
  { tone: 'region-jeonbuk', names: ['전북', '전라북도'] },
  { tone: 'region-jeonnam', names: ['전남', '전라남도'] },
  { tone: 'region-gyeongbuk', names: ['경북', '경상북도'] },
  { tone: 'region-gyeongnam', names: ['경남', '경상남도'] },
  { tone: 'region-busan', names: ['부산'] },
  { tone: 'region-daegu', names: ['대구'] },
  { tone: 'region-incheon', names: ['인천'] },
  { tone: 'region-gwangju', names: ['광주'] },
  { tone: 'region-daejeon', names: ['대전'] },
  { tone: 'region-sejong', names: ['세종'] },
  { tone: 'region-ulsan', names: ['울산'] },
  { tone: 'region-jeju', names: ['제주'] },
];

function getRegionTone(museum) {
  const regionText = `${museum.region || ''} ${museum.regionFull || ''}`;
  const match = regionTones.find((regionTone) => regionTone.names.some((name) => regionText.includes(name)));
  return match ? match.tone : 'region-default';
}

function safe(value, language = 'kor') {
  return value && String(value).trim() ? value : language === 'eng' ? 'Needs confirmation' : '정보 확인 필요';
}

function formatHolidayTime(value, language = 'kor') {
  const text = safe(value, language).replace(/\s/g, '');
  if (['00:00-00:00', '00:00~00:00', '0:00-0:00', '0:00~0:00'].includes(text)) {
    return language === 'eng' ? 'Closed on holidays' : '공휴일 휴관';
  }
  const original = safe(value, language);
  return language === 'eng' ? 'Holiday hours may vary. Please check before visiting.' : original;
}

function baseReviewScore(museumName, categoryKey) {
  return 0;
}

function getInitialReviews() {
  try {
    return JSON.parse(localStorage.getItem('museumMoaReviewsV2')) || {};
  } catch {
    return {};
  }
}

function getInitialReviewVotes() {
  try {
    return JSON.parse(localStorage.getItem('museumMoaReviewVotesV2')) || {};
  } catch {
    return {};
  }
}

function getVisitorId() {
  const savedVisitorId = localStorage.getItem('museumMoaVisitorId');

  if (savedVisitorId) return savedVisitorId;

  const newVisitorId = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem('museumMoaVisitorId', newVisitorId);
  return newVisitorId;
}

function buildReviewState(votes = [], visitorId) {
  return votes.reduce((state, vote) => {
    const key = reviewKey(vote.museumName, vote.categoryKey);
    const value = vote.voteType === 'up' ? 1 : -1;

    state.scores[key] = (state.scores[key] || 0) + value;

    if (vote.visitorId === visitorId) {
      state.votes[key] = vote.voteType;
    }

    return state;
  }, { scores: {}, votes: {} });
}

function groupTextReviews(textReviews = []) {
  return textReviews.reduce((groupedReviews, review, index) => {
    const museumName = review.museumName;
    if (!museumName) return groupedReviews;

    groupedReviews[museumName] = groupedReviews[museumName] || [];
    groupedReviews[museumName].push({
      id: `${review.timestamp || 'review'}-${index}`,
      author: review.author || '익명',
      text: review.reviewText || review.text || '',
      createdAt: review.timestamp || review.createdAt || '',
    });

    return groupedReviews;
  }, {});
}

function getInitialTextReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem('museumMoaTextReviews')) || {};
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

function getInitialRecentMuseums() {
  try {
    const saved = JSON.parse(localStorage.getItem('museumMoaRecentMuseums')) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function getInitialFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem('museumMoaFavorites')) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function reviewKey(museumName, categoryKey) {
  return `${museumName}__${categoryKey}`;
}

export default function ExplorePage({ language, onLanguageChange, onNavigate }) {
  const t = exploreText[language];
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('전체');
  const [type, setType] = useState('전체');
  const [fee, setFee] = useState('전체');
  const [activeMuseum, setActiveMuseum] = useState(null);
  const [modalPage, setModalPage] = useState('info');
  const [reviews, setReviews] = useState(getInitialReviews);
  const [reviewVotes, setReviewVotes] = useState(getInitialReviewVotes);
  const [textReviews, setTextReviews] = useState(getInitialTextReviews);
  const [benefitIndex, setBenefitIndex] = useState(0);
  const [discoveryIndex, setDiscoveryIndex] = useState(0);
  const [discoveryPaused, setDiscoveryPaused] = useState(false);
  const [feedbackFileName, setFeedbackFileName] = useState('');
  const [feedbackNotice, setFeedbackNotice] = useState('');
  const [feedbackNoticeType, setFeedbackNoticeType] = useState('error');
  const [recentMuseumNames, setRecentMuseumNames] = useState(getInitialRecentMuseums);
  const [favoriteMuseumNames, setFavoriteMuseumNames] = useState(getInitialFavorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [listView, setListView] = useState('roomy');
  const [visitorId] = useState(getVisitorId);

  const filteredMuseums = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return museums
      .filter((museum) => {
        const text = `${museum.name} ${museum.region} ${museum.regionFull} ${museum.address}`.toLowerCase();
        const matchKeyword = !normalizedKeyword || text.includes(normalizedKeyword);
        const matchRegion = region === '전체' || museum.region === region || museum.regionFull === region;
        const matchType = type === '전체' || museum.type === type;
        const matchFee = fee === '전체' || museum.feeType === fee;
        const matchFavorite = !favoritesOnly || favoriteMuseumNames.includes(museum.name);
        return matchKeyword && matchRegion && matchType && matchFee && matchFavorite;
      })
      .sort((firstMuseum, secondMuseum) => {
        if (language === 'eng') {
          return displayMuseumName(firstMuseum.name, language, firstMuseum).localeCompare(
            displayMuseumName(secondMuseum.name, language, secondMuseum),
            'en-US'
          );
        }

        return firstMuseum.name.localeCompare(secondMuseum.name, 'ko-KR');
      });
  }, [favoriteMuseumNames, favoritesOnly, fee, keyword, language, region, type]);

  const recentMuseums = useMemo(
    () => recentMuseumNames
      .map((museumName) => museums.find((museum) => museum.name === museumName))
      .filter(Boolean),
    [recentMuseumNames]
  );

  useEffect(() => {
    localStorage.setItem('museumMoaReviewsV2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('museumMoaReviewVotesV2', JSON.stringify(reviewVotes));
  }, [reviewVotes]);

  useEffect(() => {
    localStorage.setItem('museumMoaTextReviews', JSON.stringify(textReviews));
  }, [textReviews]);

  useEffect(() => {
    localStorage.setItem('museumMoaRecentMuseums', JSON.stringify(recentMuseumNames));
  }, [recentMuseumNames]);

  useEffect(() => {
    localStorage.setItem('museumMoaFavorites', JSON.stringify(favoriteMuseumNames));
  }, [favoriteMuseumNames]);

  const loadSharedReviewData = async () => {
    try {
      const response = await fetch(REVIEW_API_URL);
      const data = await response.json();
      const reviewState = buildReviewState(data.votes || [], visitorId);

      setReviews(reviewState.scores);
      setReviewVotes(reviewState.votes);
      setTextReviews(groupTextReviews(data.textReviews || []));
    } catch {
      // Keep local cached review state when the shared sheet is unavailable.
    }
  };

  useEffect(() => {
    loadSharedReviewData();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBenefitIndex((index) => (index + 1) % benefitSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (discoveryPaused) return undefined;
    const timer = window.setInterval(() => {
      setDiscoveryIndex((index) => (index + 1) % discoveryItems.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [discoveryPaused]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMuseum(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const resetFilters = () => {
    setKeyword('');
    setRegion('전체');
    setType('전체');
    setFee('전체');
    setFavoritesOnly(false);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openMuseum = (museum) => {
    setActiveMuseum(museum);
    setModalPage('info');
    setRecentMuseumNames((currentNames) => [
      museum.name,
      ...currentNames.filter((museumName) => museumName !== museum.name),
    ].slice(0, 5));
  };

  const toggleFavorite = (museumName) => {
    setFavoriteMuseumNames((currentNames) => (
      currentNames.includes(museumName)
        ? currentNames.filter((name) => name !== museumName)
        : [museumName, ...currentNames]
    ));
  };

  const changeReview = async (museumName, categoryKey, value) => {
    const key = reviewKey(museumName, categoryKey);

    if (reviewVotes[key]) {
      return;
    }

    setReviews((currentReviews) => {
      return {
        ...currentReviews,
        [key]: (currentReviews[key] || 0) + value,
      };
    });
    setReviewVotes((currentVotes) => ({
      ...currentVotes,
      [key]: value > 0 ? 'up' : 'down',
    }));

    try {
      await fetch(REVIEW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'vote',
          museumName,
          categoryKey,
          voteType: value > 0 ? 'up' : 'down',
          visitorId,
        }),
      });
      await loadSharedReviewData();
    } catch {
      // Keep optimistic local vote when the shared sheet cannot be reached.
    }
  };

  const addTextReview = async (museumName, review) => {
    setTextReviews((currentReviews) => {
      const currentMuseumReviews = currentReviews[museumName] || [];
      return {
        ...currentReviews,
        [museumName]: [
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            ...review,
          },
          ...currentMuseumReviews,
        ].slice(0, 12),
      };
    });

    try {
      await fetch(REVIEW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'textReview',
          museumName,
          author: review.author,
          reviewText: review.text,
          visitorId,
        }),
      });
      await loadSharedReviewData();
    } catch {
      // Keep optimistic local review when the shared sheet cannot be reached.
    }
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const museumName = form.elements.feedbackMuseum?.value.trim();
    const feedbackText = form.elements.feedbackText?.value.trim();
    const fileName = feedbackFileName;

    if (!museumName || !feedbackText) {
      setFeedbackNoticeType('error');
      setFeedbackNotice(language === 'eng'
        ? 'Please enter both the museum name and update details.'
        : '박물관명과 수정 내용을 입력해주세요.');
      return;
    }

    try {
      await fetch(REVIEW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'feedbackUpdate',
          museumName,
          feedbackText,
          fileName,
          visitorId,
        }),
      });

      setFeedbackNoticeType('success');
      setFeedbackNotice(language === 'eng'
        ? 'Your update has been checked.'
        : '제보 내용이 확인되었습니다.');
      form.reset();
      setFeedbackFileName('');
    } catch {
      setFeedbackNoticeType('error');
      setFeedbackNotice(language === 'eng'
        ? 'Could not send the update. Please try again.'
        : '제보를 보내지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="explore-page" id="top">
      <header className="topbar">
        <div className="topbar-inner">
          <button type="button" className="brand logo-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/assets/explore_logo_museum_moa.png" alt="뮤지엄모아 로고" />
          </button>
          <div className="discovery-bar" aria-label={t.discoveryLabel}>
            <div className="discovery-title">{t.discoveryTitle}</div>
            <div className="discovery-list">
              {discoveryItems.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`discovery-item ${index === discoveryIndex ? 'active' : ''}`}
                  key={item.name}
                >
                  <span className="discovery-number">{index + 1}</span>
                  <strong>{language === 'eng' ? item.nameEn : item.name}</strong>
                  <em>{language === 'eng' ? item.descriptionEn : item.description}</em>
                </a>
              ))}
            </div>
            <div className="discovery-control">
              <button type="button" className="discovery-icon-btn" aria-label={t.previousPick} onClick={() => setDiscoveryIndex((index) => (index - 1 + discoveryItems.length) % discoveryItems.length)}>^</button>
              <button
                type="button"
                className={`discovery-icon-btn pause-btn ${discoveryPaused ? 'paused' : ''}`}
                aria-label={discoveryPaused ? t.play : t.pause}
                aria-pressed={discoveryPaused}
                onClick={() => setDiscoveryPaused((paused) => !paused)}
              >
                {discoveryPaused ? '>' : 'II'}
              </button>
              <button type="button" className="discovery-icon-btn" aria-label={t.nextPick} onClick={() => setDiscoveryIndex((index) => (index + 1) % discoveryItems.length)}>v</button>
            </div>
          </div>

          <div className="nav-links">
            <LanguageSwitch language={language} onLanguageChange={onLanguageChange} label={language === 'eng' ? 'Language selection' : '언어 선택'} />
            <button type="button" className="top-link" onClick={() => onNavigate('home')}>{t.home}</button>
            <button type="button" className="top-link" onClick={() => scrollToSection('museum-search')}>{t.findMuseum}</button>
            <button type="button" className="top-link" onClick={() => scrollToSection('feedback')}>{t.reportInfo}</button>
          </div>
        </div>
      </header>

      <section className="intro-hero">
        <div className="hero-map-zoom-wrap">
          <img src="/assets/Map_of_South_Korea-blank.svg.png" alt="대한민국 지도" className="hero-map" />
        </div>
        <div className="map-pin-layer" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6].map((pin) => <span className={`map-pin p${pin}`} key={pin} />)}
        </div>
        <div className="map-deco-layer" aria-hidden="true">
          {['g1', 'g2', 'g3'].map((item) => <span className={`map-glow ${item}`} key={item} />)}
          {['r1', 'r2', 'r3'].map((item) => <span className={`map-ring ${item}`} key={item} />)}
          {['l1', 'l2', 'l3'].map((item) => <span className={`map-line ${item}`} key={item} />)}
          {['s1', 's2', 's3', 's4'].map((item) => <span className={`map-spark ${item}`} key={item} />)}
        </div>
        <div className="hero-overlay">
          <div className="hero-comment">
            <span className="hero-label">Museum Archive</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroDesc}</p>
          </div>
          <div className="hero-stats">
            <div className="stat-box"><span className="stat-title">{t.total}</span><strong className="stat-number">241</strong></div>
            <div className="stat-box"><span className="stat-title">{t.national}</span><strong className="stat-number">62</strong></div>
            <div className="stat-box"><span className="stat-title">{t.public}</span><strong className="stat-number">179</strong></div>
          </div>
        </div>
        <button type="button" className="hero-scroll" onClick={() => scrollToSection('museum-search')}>{t.heroScroll}</button>
      </section>

      <main className="page" id="explore-start">
        <section className="heading benefit-heading">
          <div className="benefit-copy">
            <div className="small">Before You Go</div>
            <h1>{t.benefitTitle}</h1>
            <p className="human-copy">{t.benefitDesc}</p>
          </div>
          <div className="benefit-slider">
            <div className="benefit-track" style={{ transform: `translateX(-${benefitIndex * 100}%)` }}>
              {benefitSlides.map((slide, index) => (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`benefit-slide ${index === benefitIndex ? 'active' : ''}`}
                  aria-label={language === 'eng' ? slide.labelEn : slide.label}
                  key={slide.label}
                >
                  <img src={slide.image} alt={language === 'eng' ? slide.labelEn : slide.label} />
                </a>
              ))}
            </div>
            <div className="benefit-dots">
              {benefitSlides.map((slide, index) => (
                <button
                  type="button"
                  className={`benefit-dot ${index === benefitIndex ? 'active' : ''}`}
                  aria-label={`${language === 'eng' ? slide.labelEn : slide.label} ${language === 'eng' ? 'view' : '보기'}`}
                  key={slide.label}
                  onClick={() => setBenefitIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="layout" id="museum-search">
          <aside className="filter-panel">
            <h2>{t.filter}</h2>
            <div className="filter-group">
              <label className="title" htmlFor="searchInput">{t.search}</label>
              <input id="searchInput" className="search-input" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={t.searchPlaceholder} />
            </div>
            <div className="filter-group">
              <label className="title" htmlFor="regionFilter">{t.region}</label>
              <select id="regionFilter" className="filter-select" value={region} onChange={(event) => setRegion(event.target.value)}>
                {regions.map((item) => <option value={item} key={item}>{displayRegion(item, language)}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="title" htmlFor="typeFilter">{t.type}</label>
              <select id="typeFilter" className="filter-select" value={type} onChange={(event) => setType(event.target.value)}>
                <option value="전체">{t.all}</option>
                <option value="국립">{t.national}</option>
                <option value="공립">{t.public}</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="title" htmlFor="feeFilter">{t.fee}</label>
              <select id="feeFilter" className="filter-select" value={fee} onChange={(event) => setFee(event.target.value)}>
                <option value="전체">{t.all}</option>
                <option value="무료">{t.free}</option>
                <option value="유료">{t.paid}</option>
              </select>
            </div>
            <button
              type="button"
              className={`favorite-filter-btn ${favoritesOnly ? 'active' : ''}`}
              aria-pressed={favoritesOnly}
              onClick={() => setFavoritesOnly((current) => !current)}
            >
              <FavoriteStarIcon />
              {t.favoriteOnly}
            </button>
            <button type="button" className="reset-btn" onClick={resetFilters}>{t.reset}</button>
            <div className="result-mini">{t.showing} <strong>{filteredMuseums.length}</strong> {t.showingSuffix}</div>
          </aside>

          <section className="results-panel">
            <div className="results-sticky-head">
              <div className="content-top">
                <div>
                  <div className="result-count-text"><strong>{filteredMuseums.length}</strong> {t.resultSuffix}</div>
                  <input className="result-search-input" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={t.resultSearchPlaceholder} />
                </div>
                <div className="result-text">{t.resultHint}</div>
              </div>

              <RecentMuseums
                language={language}
                museums={recentMuseums}
                onOpen={openMuseum}
                onRemove={(museumName) => setRecentMuseumNames((currentNames) => currentNames.filter((name) => name !== museumName))}
                actions={(
                  <div className="view-toggle" aria-label={language === 'eng' ? 'Museum list view' : '박물관 목록 보기 방식'}>
                  <button
                    type="button"
                    className={`view-toggle-btn ${listView === 'roomy' ? 'active' : ''}`}
                    aria-label={language === 'eng' ? 'Two-column card view' : '2열 카드 보기'}
                    aria-pressed={listView === 'roomy'}
                    title={language === 'eng' ? 'Two-column card view' : '2열 카드 보기'}
                    onClick={() => setListView('roomy')}
                  >
                    <GridTwoIcon />
                  </button>
                  <button
                    type="button"
                    className={`view-toggle-btn ${listView === 'compact' ? 'active' : ''}`}
                    aria-label={language === 'eng' ? 'Three-column compact view' : '3열 간단 보기'}
                    aria-pressed={listView === 'compact'}
                    title={language === 'eng' ? 'Three-column compact view' : '3열 간단 보기'}
                    onClick={() => setListView('compact')}
                  >
                    <GridThreeIcon />
                  </button>
                  </div>
                )}
              />
            </div>

            <div className="card-scroll-area with-recent">
              {filteredMuseums.length > 0 ? (
                <div className={`card-grid ${listView === 'compact' ? 'compact-view' : 'roomy-view'}`}>
                  {filteredMuseums.map((museum) => (
                    <MuseumCard
                      isFavorite={favoriteMuseumNames.includes(museum.name)}
                      language={language}
                      museum={museum}
                      key={`${museum.name}-${museum.address}`}
                      onOpen={() => openMuseum(museum)}
                      onToggleFavorite={() => toggleFavorite(museum.name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state react-empty-state">{t.empty}</div>
              )}
            </div>
          </section>
        </div>

        <section className="feedback-section" id="feedback">
          <div className="feedback-card">
            <div className="feedback-copy">
              <span className="feedback-label">Information Update</span>
              <h2>{t.feedbackTitle}</h2>
              <p>{t.feedbackDesc}</p>
              <div className="feedback-image-wrap">
                <img src="/assets/feedback_update.png" alt={language === 'eng' ? 'Information update example' : '정보 수정 제보 예시'} />
              </div>
            </div>
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <div className="field">
                <label htmlFor="feedbackMuseum">{t.museumName}<span className="required-mark">&lt;필수&gt;</span></label>
                <input id="feedbackMuseum" name="feedbackMuseum" placeholder={t.feedbackMuseumPlaceholder} onInput={() => setFeedbackNotice('')} />
              </div>
              <div className="field">
                <label htmlFor="feedbackText">{t.feedbackText}<span className="required-mark">&lt;필수&gt;</span></label>
                <textarea id="feedbackText" name="feedbackText" placeholder={t.feedbackTextPlaceholder} onInput={() => setFeedbackNotice('')} />
              </div>
              <div className="field">
                <label htmlFor="feedbackImage">{t.feedbackImage}</label>
                <div className="custom-file-row">
                  <label className="custom-file-btn" htmlFor="feedbackImage">{t.chooseFile}</label>
                  <span className="custom-file-name">{feedbackFileName || t.noFileSelected}</span>
                  <input
                    type="file"
                    id="feedbackImage"
                    className="file-input"
                    accept="image/*"
                    onChange={(event) => setFeedbackFileName(event.target.files?.[0]?.name || '')}
                  />
                </div>
              </div>
              {feedbackNotice && <p className={`feedback-notice ${feedbackNoticeType}`} role="alert">{feedbackNotice}</p>}
              <button type="submit" className="submit-btn">{t.submit}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">MUSEUM MOA</div>
          <div className="footer-line" />
          <div className="footer-bottom">
            <p className="footer-copy">Copyright© 2026 Museum MOA. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {activeMuseum && (
        <DetailModal
          isFavorite={favoriteMuseumNames.includes(activeMuseum.name)}
          language={language}
          museum={activeMuseum}
          modalPage={modalPage}
          setModalPage={setModalPage}
          onClose={() => setActiveMuseum(null)}
          onToggleFavorite={() => toggleFavorite(activeMuseum.name)}
          reviews={reviews}
          reviewVotes={reviewVotes}
          textReviews={textReviews[activeMuseum.name] || []}
          onVote={changeReview}
          onAddTextReview={addTextReview}
        />
      )}
    </div>
  );
}

function RecentMuseums({ actions, language, museums: recentMuseums, onOpen, onRemove }) {
  const t = exploreText[language];

  return (
    <section className="recent-panel" aria-label={t.recentTitle}>
      <div className="recent-head">
        <strong>{t.recentTitle}</strong>
        {actions ? <div className="recent-actions">{actions}</div> : null}
      </div>
      <div className="recent-list">
        {recentMuseums.length === 0 ? (
          <span className="recent-empty">{t.recentEmpty}</span>
        ) : recentMuseums.map((museum) => (
          <span className="recent-text-item" key={`${museum.name}-${museum.address}`}>
            <button
              type="button"
              className="recent-text-link"
              onClick={() => onOpen(museum)}
            >
              <span>{displayMuseumName(museum.name, language, museum)}</span>
            </button>
            <button
              type="button"
              className="recent-remove-btn"
              aria-label={`${displayMuseumName(museum.name, language, museum)} ${language === 'eng' ? 'remove from recently viewed' : '최근 본 박물관에서 제거'}`}
              onClick={() => onRemove(museum.name)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

function MuseumCard({ isFavorite, language, museum, onOpen, onToggleFavorite }) {
  const t = exploreText[language];
  const feeClass = museum.feeType === '무료' ? 'free' : 'paid';
  const kindClass = museum.type === '국립' ? 'national' : 'public';
  const regionTone = getRegionTone(museum);

  return (
    <article className={`museum-card region-card ${regionTone}`} onClick={onOpen}>
      <div>
        <div className="card-head">
          <div>
            <h3 className="museum-name">{displayMuseumName(museum.name, language, museum)}</h3>
            <div className="museum-region">{displayRegion(museum.regionFull || museum.region, language)}</div>
          </div>
          <div className="badge-row">
            <span className={`badge kind ${kindClass}`}>{displayValue(museum.type, language)}</span>
            <span className={`badge fee-badge ${feeClass}`} aria-label={museum.feeType}>
              <span>{displayValue(museum.feeType, language)}</span>
            </span>
          </div>
        </div>
        <div className="card-hint">{t.detail}</div>
      </div>
      <button
        type="button"
        className={`favorite-star-btn card-favorite-star ${isFavorite ? 'active' : ''}`}
        aria-label={isFavorite ? t.favoriteRemove : t.favoriteAdd}
        aria-pressed={isFavorite}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite();
        }}
      >
        <FavoriteStarIcon />
      </button>
    </article>
  );
}

function FavoriteStarIcon() {
  return (
    <svg className="favorite-star-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.15l2.72 5.52 6.1.89-4.41 4.3 1.04 6.07L12 17.06l-5.45 2.87 1.04-6.07-4.41-4.3 6.1-.89L12 3.15z" />
    </svg>
  );
}

function GridTwoIcon() {
  return (
    <svg className="view-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="7" height="6" rx="1.2" />
      <rect x="13" y="5" width="7" height="6" rx="1.2" />
      <rect x="4" y="13" width="7" height="6" rx="1.2" />
      <rect x="13" y="13" width="7" height="6" rx="1.2" />
    </svg>
  );
}

function GridThreeIcon() {
  return (
    <svg className="view-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="4.5" height="6" rx="1" />
      <rect x="9.75" y="5" width="4.5" height="6" rx="1" />
      <rect x="16" y="5" width="4.5" height="6" rx="1" />
      <rect x="3.5" y="13" width="4.5" height="6" rx="1" />
      <rect x="9.75" y="13" width="4.5" height="6" rx="1" />
      <rect x="16" y="13" width="4.5" height="6" rx="1" />
    </svg>
  );
}

function DetailModal({ isFavorite, language, museum, modalPage, setModalPage, onClose, onToggleFavorite, reviews, reviewVotes, textReviews, onVote, onAddTextReview }) {
  const t = exploreText[language];
  const feeClass = museum.feeType === '무료' ? 'free' : 'paid';
  const kindClass = museum.type === '국립' ? 'national' : 'public';
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const currentPage = document.querySelector(
      modalPage === 'review' ? '.modal-page-review' : '.modal-page-info'
    );
    currentPage?.scrollTo?.({ top: 0 });
  }, [modalPage]);

  const handleTextReviewSubmit = (event) => {
    event.preventDefault();
    const trimmedText = reviewText.trim();

    if (!trimmedText) {
      setReviewMessage(language === 'eng' ? 'Please write a one-line review.' : '한 줄 리뷰를 입력해주세요.');
      return;
    }

    onAddTextReview(museum.name, {
      author: reviewAuthor.trim().slice(0, 5) || (language === 'eng' ? 'Anonymous' : '익명'),
      text: trimmedText,
      createdAt: new Date().toISOString(),
    });
    setReviewAuthor('');
    setReviewText('');
    setReviewMessage('');
  };

  return (
    <div className="modal-overlay active" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`modal-card ${modalPage === 'review' ? 'review-mode' : ''}`}>
        <button type="button" className="modal-close" onClick={onClose}>×</button>
        <div className="modal-labels">
          <span className={`badge kind ${kindClass}`}>{displayValue(museum.type, language)}</span>
          <span className={`badge fee-badge ${feeClass}`}><span>{displayValue(museum.feeType, language)}</span></span>
          <button
            type="button"
            className={`favorite-star-btn modal-favorite-star ${isFavorite ? 'active' : ''}`}
            aria-label={isFavorite ? t.favoriteRemove : t.favoriteAdd}
            aria-pressed={isFavorite}
            onClick={onToggleFavorite}
          >
            <FavoriteStarIcon />
          </button>
        </div>
        <h2 className="modal-title">{displayMuseumName(museum.name, language, museum)}</h2>
        <div className="modal-sub">{displayRegion(museum.regionFull || museum.region, language)}</div>

        <div className={`modal-pages ${modalPage === 'review' ? 'show-review' : ''}`}>
          <section className="modal-page modal-page-info">
            <div className="modal-info">
              <InfoRow label={t.weekday} value={safe(museum.weekday, language)} />
              <InfoRow label={t.holiday} value={formatHolidayTime(museum.holiday, language)} />
              <InfoRow label={t.closed} value={displayClosedText(museum.closed, language)} />
              <InfoRow label={t.feeText} value={language === 'eng' ? displayValue(museum.feeType, language) : safe(museum.feeText, language)} />
              <InfoRow label={t.phone} value={safe(museum.phone, language)} />
              <InfoRow label={t.address} value={displayAddress(museum, language)} />
            </div>
          </section>

          <section className="modal-page modal-page-review">
            <div className="review-head">
              <div>
                <span>Visitor Review</span>
                <h3>{t.reviewTitle}</h3>
              </div>
            </div>
            <p className="review-desc">{t.reviewDesc}</p>
            <div className="review-list">
              {reviewCategories.map((category) => {
                const key = reviewKey(museum.name, category.key);
                const score = baseReviewScore(museum.name, category.key) + (reviews[key] || 0);
                const displayScore = score > 0 ? `+${score}` : `${score}`;
                const voted = reviewVotes[key];

                return (
                  <div className="review-item" key={category.key}>
                    <div className="review-name">{reviewCategoryLabels[language][category.key]}</div>
                    <div className="review-actions">
                      <button
                        type="button"
                        className={`thumb-btn down ${voted === 'down' ? 'selected' : ''}`}
                        aria-label={`${reviewCategoryLabels[language][category.key]} down`}
                        disabled={Boolean(voted)}
                        onClick={() => onVote(museum.name, category.key, -1)}
                      >
                        👎
                      </button>
                      <strong>{displayScore}</strong>
                      <button
                        type="button"
                        className={`thumb-btn up ${voted === 'up' ? 'selected' : ''}`}
                        aria-label={`${reviewCategoryLabels[language][category.key]} up`}
                        disabled={Boolean(voted)}
                        onClick={() => onVote(museum.name, category.key, 1)}
                      >
                        👍
                      </button>
                    </div>
                    {voted && <div className="review-voted-note">{language === 'eng' ? 'Already voted' : '이미 평가했습니다'}</div>}
                  </div>
                );
              })}
            </div>
            <div className="text-review-panel">
              <div className="text-review-heading">
                <strong>{language === 'eng' ? 'One-line visitor reviews' : '방문자 한 줄 리뷰'}</strong>
                <span>{language === 'eng' ? 'If no name is entered, it will be posted anonymously.' : '이름을 입력 안할시 익명으로 남습니다'}</span>
              </div>
              <form className="text-review-form" onSubmit={handleTextReviewSubmit}>
                <input
                  value={reviewAuthor}
                  onChange={(event) => setReviewAuthor(event.target.value.slice(0, 5))}
                  placeholder={language === 'eng' ? 'Name' : '이름'}
                  maxLength={5}
                />
                <input
                  value={reviewText}
                  onChange={(event) => {
                    setReviewText(event.target.value);
                    setReviewMessage('');
                  }}
                  placeholder={language === 'eng' ? 'Leave a short review' : '한 줄 리뷰를 남겨주세요'}
                  maxLength={70}
                />
                <button type="submit">{language === 'eng' ? 'Post' : '남기기'}</button>
              </form>
              {reviewMessage && <p className="text-review-message">{reviewMessage}</p>}
              <div className="text-review-list">
                {textReviews.length > 0 ? textReviews.map((review) => (
                  <div className="text-review-item" key={review.id}>
                    <strong>{review.author}</strong>
                    <span>{review.text}</span>
                  </div>
                )) : (
                  <p className="text-review-empty">{language === 'eng' ? 'No one-line reviews yet.' : '아직 남겨진 한 줄 리뷰가 없습니다.'}</p>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="review-bubble">
          <strong>{t.reviewBubbleFirst}<br />{t.reviewBubbleSecond}</strong>
        </div>
        {museum.site && (
          <a href={museum.site} target="_blank" rel="noopener noreferrer" className="modal-site-btn side-site-btn">
            {t.officialSite}
          </a>
        )}
        <button type="button" className="modal-page-btn next" onClick={() => setModalPage('review')}>›</button>
        <button type="button" className="modal-page-btn prev" onClick={() => setModalPage('info')}>‹</button>
        <div className="modal-page-indicator">{modalPage === 'review' ? '2 / 2' : '1 / 2'}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="modal-info-row">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}
