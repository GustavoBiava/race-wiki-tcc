import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';

import { Container, Button } from '../../styles/GlobalStyles';
import Like from '../../components/Like';
import Share from '../../components/Share';
import { usePublication } from '../../hooks/usePublication';
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
    FooterDetails,
    CommentInfo,
    ReponseSection,
    ResponseTextarea,
    CommentResponses,
    Response,
    ActionsContainer,
    ActionsDiv,
} from './styled';
import { get } from 'lodash';

function Publication() {

    const { publication, formatDate, handleCommentClick, body, setBody, setTitle, title, response, setResponse, handleResponseClick, liked, setLiked } = usePublication();
    
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

                            { get(publication, 'publication_picture', []).length > 0 ? publication.publication_picture.map((picture, index) => (
                                <SwiperSlide key={index}>
                                    <SwiperImgDiv>
                                        <SwiperImg src={picture.url} alt='/race-default-picture.jpg'/>
                                    </SwiperImgDiv>
                                </SwiperSlide>
                            )) : (
                                <SwiperSlide>
                                    <SwiperImgDiv>
                                        <SwiperImg src='/race-default-picture.jpg' alt='race-picture'/>
                                    </SwiperImgDiv>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </SwiperContainer>

                    <PublicationBodyContainer>
                        <PublicationBody>
                            <p>{ publication.body }</p>
                        </PublicationBody>
                    </PublicationBodyContainer>

                    <ActionsContainer>
                        <ActionsDiv>
                            {/* <Like number={publication.likes}/> */}
                            <Share />
                        </ActionsDiv>
                    </ActionsContainer>
                    
                    <CommentsContainer>
                        <CommentsHeader>
                            <h1>Comentários:</h1>
                        </CommentsHeader>
                        
                        <WriteSection>

                            <TextLabel>
                                <label>Título:</label>
                                <CommentTitle placeholder='Título do seu comentário...' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </TextLabel>
                            
                            <TextLabel>
                                <label>Conteúdo:</label>
                                <CommentTextarea placeholder='Deixe aqui seu comentário...' value={body} onChange={(e) => setBody(e.target.value)}/>
                            </TextLabel>
                            
                            <ButtonDiv>
                                <Button onClick={handleCommentClick}>COMENTAR</Button>
                            </ButtonDiv>
                        </WriteSection>

                        <PublicationComments>
                            { publication.comments ? publication.comments.map((comment, index) => (
                                <Comment key={index} id={comment.id} className='comment'>
                                    <CommentHeader>
                                        <UserProfile color={comment.User.color}>
                                            { comment.User.Driver.driver_picture
                                                ? <DriverPicture src={comment.User.Driver.driver_picture.url} alt="driver-picture"/>
                                                : <DriverPicture src='/driver-default-picture.png' alt="driver-picture"/>
                                            }
                                            <BackgroundImg src="/driver-background.jpg" alt="driver-background" />
                                        </UserProfile>
                                        <CommentInfo>
                                            <h2>{comment.User.nickname}</h2>
                                            <h3>{formatDate(comment.created_at)}</h3>
                                        </CommentInfo>
                                    </CommentHeader>

                                    <CommentBody>
                                            <h2>{comment.title}</h2>
                                            <p>{comment.body}</p>
                                    </CommentBody>

                                    <CommentFooter>
                                        { comment.responses[0] ? (
                                            <FooterDetails>
                                                <summary>Ver respostas</summary>
                                                <CommentResponses>
                                                    { comment.responses.map((response, index) => (
                                                        <Response key={index}>
                                                            <CommentHeader>
                                                                <UserProfile color={response.User.color}>
                                                                    { response.User.Driver.driver_picture
                                                                        ? <DriverPicture src={response.User.Driver.driver_picture.url} alt="driver-picture"/>
                                                                        : <DriverPicture src='driver-default-picture.jpg' alt="driver-picture"/>
                                                                    }
                                                                    <BackgroundImg src="/driver-background.jpg" alt="driver-background" />
                                                                </UserProfile>
                                                                <CommentInfo>
                                                                    <h2>{response.User.nickname}</h2>
                                                                    <h3>{formatDate(response.created_at)}</h3>
                                                                </CommentInfo>
                                                            </CommentHeader>

                                                            <CommentBody isReponse>
                                                                    <p>{response.body}</p>
                                                            </CommentBody>
                                                        </Response>
                                                    )) }
                                                </CommentResponses>

                                                <FooterDetails>
                                                    <summary>Responder</summary>
                                                    <ReponseSection>
                                                        <ResponseTextarea placeholder='Deixe aqui sua resposta...' isReponse value={response} onChange={(e) => setResponse(e.target.value)}/>

                                                        <ButtonDiv>
                                                            <Button onClick={handleResponseClick}>RESPONDER</Button>
                                                        </ButtonDiv>
                                                    </ReponseSection>
                                                </FooterDetails>
                                        </FooterDetails>
                                        ) : (
                                            <FooterDetails>
                                                <summary>Responder</summary>
                                                <ReponseSection>
                                                    <ResponseTextarea placeholder='Deixe aqui sua resposta...' isReponse value={response} onChange={(e) => setResponse(e.target.value)}/>

                                                    <ButtonDiv>
                                                        <Button onClick={handleResponseClick}>RESPONDER</Button>
                                                    </ButtonDiv>
                                                </ReponseSection>
                                            </FooterDetails>
                                        ) }
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