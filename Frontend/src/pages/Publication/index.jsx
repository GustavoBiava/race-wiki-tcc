import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';

import axios from "../../services/axios";
import { Container, Button } from '../../styles/GlobalStyles';
import { 
    Content,
    TitleHeader,
    TitleDetails,
    SwiperContainer,
    SwiperImg,
    SwiperImgDiv,
    Tags,
    Tag,
    PublicationBodyContainer,
    PublicationBody,
    CommentsHeader,
    CommentsContainer,
    CommentTextarea,
    WriteSection,
    CommentTitle,
    TextLabel,
    ButtonDiv,
    PublicationComments,
    Comment,
    CommentHeader,
    CommentBody,
    CommentFooter,
    UserProfile,
    BackgroundImg,
    DriverPicture,
    SeeReponses,
} from './styled';

function Publication() {

    const [publication, setPublication] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/publication/${slug}`);
                return setPublication(response.data);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, [slug]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    return (
        <Container>
            <Content>
                <TitleHeader>
                    <Tags>
                        {publication.tags ? publication.tags.map((tag, index) => (
                            <Tag key={index}>
                                <p>{tag.tag_name ? tag.tag_name : ''}</p>
                            </Tag>
                        )) : ''}
                    </Tags>
                    <h1>{publication.title}</h1>
                    <hr />
                    <TitleDetails>
                        <p>Publicado em: <span>{formatDate(publication.created_at)}</span></p>
                        <p>Publicado por: <span>{publication.publication_author ? publication.publication_author.nickname : ''} </span></p>
                        
                    </TitleDetails>
                </TitleHeader>

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

                            { publication.publication_picture ? publication.publication_picture.map((picture, index) => (
                                <SwiperSlide key={index}>
                                    <SwiperImgDiv>
                                        <SwiperImg src={picture.url} alt='default-race-default-picture.jpg'/>
                                    </SwiperImgDiv>

                                </SwiperSlide>
                            )) : ''}
                        </Swiper>
                    </SwiperContainer>

                    <PublicationBodyContainer>
                        <PublicationBody>
                            <p>{ publication.body }</p>
                        </PublicationBody>
                    </PublicationBodyContainer>
                    
                    <CommentsContainer>
                        <CommentsHeader>
                            <h1>Comentários:</h1>
                        </CommentsHeader>
                        
                        <WriteSection>

                            <TextLabel>
                                <label>Título:</label>
                                <CommentTitle placeholder='Título do seu comentário...'/>
                            </TextLabel>
                            
                            <TextLabel>
                                <label>Conteúdo:</label>
                                <CommentTextarea placeholder='Deixe aqui seu comentário...'/>
                            </TextLabel>
                            
                            <ButtonDiv>
                                <Button>COMENTAR</Button>
                            </ButtonDiv>
                        </WriteSection>

                        <PublicationComments>
                            { publication.comments ? publication.comments.map((comment, index) => (
                                <Comment key={index}>
                                    <CommentHeader>
                                        <UserProfile color={comment.User.color}>
                                            { comment.User.Driver.driver_picture
                                                ? <DriverPicture src={comment.User.Driver.driver_picture.url} alt="driver-picture"/>
                                                : <DriverPicture src='driver-default-picture.jpg' alt="driver-picture"/>
                                            }
                                            <BackgroundImg src="/driver-background.jpg" alt="driver-background" />
                                        </UserProfile>
                                        <h2>{comment.User.nickname}</h2>
                                    </CommentHeader>

                                    <CommentBody>
                                            <h2>{comment.title}</h2>
                                            <p>{comment.body}</p>
                                    </CommentBody>

                                    <CommentFooter>
                                        <p>Responder</p>
                                        
                                    </CommentFooter>

                                </Comment>
                            )) : ''}
                        </PublicationComments>
                        
                    </CommentsContainer>
            </Content>
        </Container>
    );

}

export default Publication;