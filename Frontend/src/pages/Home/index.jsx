import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { useHome } from '../../hooks/useHome';

import { 
    SwiperImg,
    SwiperContainer,
    TitleHeader,
    Content,
    SwiperImgDiv,
    RaceInfo,
    RacePlace,
    Country,
    Publications,
    Publication,
    PublicationImg,
    PublicationFooter,
    PublicationDetails,
    Tags,
    Tag
} from './styled';

function Home() {

    const {
        isLoading,
        races,
        publications,
        formatDate,
        getPublicationHour,
    } = useHome();

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
                                            <Link to={`/corridas/${race.slug}`}>
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
                                            </Link>
                                        </SwiperSlide>
                                )) : ''}
                        </Swiper>
                    </SwiperContainer>

                    <TitleHeader>
                            <h1>ÚLTIMAS NOTÍCIAS</h1>
                            <hr />
                    </TitleHeader>

                    <Publications>
                        {publications ? publications.map((publication, index) => (
                            <Publication key={index}>
                                <Link to={`/noticias/${publication.slug}`}>

                                    <Tags>
                                        { publication.tags[0] 
                                            ? publication.tags.map((tag, index) => (
                                                 <Tag key={index}>
                                                    <Link to={`/procurar/${tag.slug}`}>
                                                        <p>{tag.tag_name}</p>
                                                    </Link>
                                                </Tag>
                                            ))
                                            : ''
                                        }
                                    </Tags>
                                
                                    { publication.publication_picture[0]
                                        ? <PublicationImg src={publication.publication_picture[0].url} alt='publication-image'/> 
                                        : <PublicationImg src='publication-default-picture.jpg' alt='publication-image'/>
                                    }

                                    <PublicationFooter>
                                        <h2>{publication.title}</h2>

                                        <PublicationDetails>
                                            <p>
                                                Publicado por: <span>{publication.publication_author.nickname}</span>
                                            </p>
                                            <p>
                                                Publicado há: <span>{getPublicationHour(publication.created_at)}</span>
                                            </p>
                                        </PublicationDetails>
                                    </PublicationFooter>

                                </Link>
                            </Publication>
                        )): ''}
                    </Publications>

                    <TitleHeader>
                            <h1>CLASSIFICAÇÃO PILOTOS</h1>
                            <hr />
                    </TitleHeader>



                </Content>
            
            </Container>
        </>
    );

}

export default Home;