import { Container } from '../../styles/GlobalStyles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { SwiperImg, SwiperContainer } from './styled';

function Home() {

    return (
        <>
            <Container>
                <SwiperContainer>
                <Swiper
                    slidesPerView={1}
                    effect={'fade'}
                    pagination={{ clickable: true, hideOnClick: true}}
                    navigation
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay, Pagination, EffectFade]
                    }>
                    <SwiperSlide>
                        <SwiperImg src="teste.jpg" alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SwiperImg src="teste2.jpg" alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SwiperImg src="teste.jpg" alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SwiperImg src="teste2.jpg" alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SwiperImg src="teste.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
                </SwiperContainer>
            </Container>
        </>
    );

}

export default Home;