import styled from 'styled-components';

export const SwiperContainer = styled.div`
    width: 100vw;

    @media (max-width: 1024px) {
        min-height: 70vh;
    }

`;

export const SwiperImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 60vh;

    @media (max-width: 1024px) {
        height: 35vh;
    }

`; 