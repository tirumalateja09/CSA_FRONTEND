// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import Swiper styles
import 'swiper/css';

const Offers = () => {


  useEffect(()=>{
    document.title="Offers";
  },[])

  return (
    <div style={{ height: '96vh', overflow: 'hidden', marginTop:"20px" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{ height: '100%' }}
      >


      <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://thumbs.dreamstime.com/b/cosmetics-beauty-products-make-up-sale-banner-glowing-neon-background-pink-sparkles-discount-off-promo-advertising-146396111.jpg'
            alt="img1"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
       
        <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://img.freepik.com/free-vector/realistic-beauty-sale-ad-template_52683-20023.jpg'
            alt="img1"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://images-static.nykaa.com/uploads/0c8cbf60-3604-4953-a21d-e1d861a21d33.jpg?tr=cm-pad_resize,w-600'
            alt="img1"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://images-static.nykaa.com/uploads/a63e79b0-c79a-4a83-a324-30ade1202bd7.jpg?tr=cm-pad_resize,w-600'
            alt="img1"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://images-static.nykaa.com/uploads/0c8cbf60-3604-4953-a21d-e1d861a21d33.jpg?tr=cm-pad_resize,w-600'
            alt="img2"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            src='https://thumbs.dreamstime.com/b/cosmetics-beauty-products-make-up-sale-banner-glowing-neon-background-pink-sparkles-discount-off-promo-advertising-146396111.jpg'
            alt="img2"
            style={{ width: '100%', height: '100%', objectFit: 'fit' }}
          />
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default Offers;

