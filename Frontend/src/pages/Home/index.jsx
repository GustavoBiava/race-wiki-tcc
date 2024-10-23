import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';

import { Container } from '../../styles/GlobalStyles';
import { SwiperImg, SwiperContainer, TitleHeader, Content, SwiperImgDiv } from './styled';

function Home() {

    return (
        <>
            <Container>
                <Content>
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
                                    <SwiperImgDiv>
                                        <SwiperImg src="teste.jpg" alt="" />
                                    </SwiperImgDiv>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <SwiperImgDiv>
                                        <SwiperImg src="teste2.jpg" alt="" />
                                    </SwiperImgDiv>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <SwiperImgDiv>
                                        <SwiperImg src="teste.jpg" alt="" />
                                    </SwiperImgDiv>
                                </SwiperSlide>

                                
                                <SwiperSlide>
                                    <SwiperImgDiv>
                                        <SwiperImg src="teste2.jpg" alt="" />
                                    </SwiperImgDiv>
                                </SwiperSlide>
                        </Swiper>
                    </SwiperContainer>

                    <TitleHeader>
                            <h1>ÚLTIMAS NOTÍCIAS</h1>
                            <hr />
                    </TitleHeader>

                </Content>
            
            </Container>
        </>
    );

}

export default Home;