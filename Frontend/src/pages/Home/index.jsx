import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Container } from '../../styles/GlobalStyles';
import { SwiperImg, SwiperContainer, TitleHeader, Content, SwiperImgDiv, RaceInfo, RacePlace, Country } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

function Home() {

    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try {
            (async function() {
                const response = await axios.get('/pages/home/races');
                setRaces(response.data);
            })();
            return setIsLoading(false);
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            errors.map(e => toast.error(e));
            return setIsLoading(false);
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();
    }

    return (
        <>
            <Loading isLoading={isLoading}/>
            <Container>
                <Content>
                    <SwiperContainer>
                        <Swiper
                            slidesPerView={1}
                            effect={'fade'}
                            pagination={{ clickable: true, hideOnClick: true}}
                            navigation
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay, Pagination, EffectFade]
                            }>

                                {races ? races.map((race, index) => (
                                    <SwiperSlide key={index}>
                                        <SwiperImgDiv>

                                            <RaceInfo>
                                                <h1>{race.name}</h1>
                                                <h2>{formatDate(race.date)}</h2>
                                                
                                                <RacePlace>
                                                    <h3>{race.place.name}</h3>

                                                    {race.place.country_picture
                                                        ? <Country src={race.place.country_picture.url} alt='race-country-picture'/>
                                                        : <Country src='country-default-picture.png' alt='race-country-picture'/>
                                                    }
                                                </RacePlace>
                                            </RaceInfo>
                                            
                                            { race.race_picture.url
                                                ? <SwiperImg src={ race.race_picture.url } alt="race-picture" />
                                                : <SwiperImg src='race-default-picture.jpg' alt="race-picture" />
                                            }

                                        </SwiperImgDiv>
                                    </SwiperSlide>
                                )) : ''}
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