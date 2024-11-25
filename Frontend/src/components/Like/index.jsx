import { FaHeart } from "react-icons/fa";
import PropTypes from 'prop-types';

import { LikeContainer, Liked, Unliked } from './styled';
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Like({ number = 0, onClick }) {

    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        setLikes(number);
    }, [number]);

    const handleLikeContainerChange = () => {
        setIsClicked(!isClicked);
        onClick();
        if (!isClicked) setLikes(likes + 1);
        if (isClicked) setLikes(likes - 1);
    }

    return (
        <LikeContainer onClick={handleLikeContainerChange} isClicked={isClicked}>
            <Liked isClicked={isClicked}>
                <FaHeart size={30}/>
            </Liked>
            <Unliked isClicked={isClicked}>
                <FaHeart size={30}/>
            </Unliked>
            <h2>{likes} Curtidas</h2>
        </LikeContainer>
    );
}

Like.propTypes = {
    number: PropTypes.number,
}

export default Like;