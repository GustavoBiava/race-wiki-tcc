import PropTypes from "prop-types";
import { Background, LogoDiv } from "./styled";

function Loading({ isLoading }) {

    if (!isLoading) return <></>;

    return (
        <>
            <Background>
                <LogoDiv>
                    <img src="race-wiki-logo.svg" alt="race-wiki-logo" />
                </LogoDiv>
            </Background>
        </>
    );

}

Loading.propTypes = {
    isLoading: PropTypes.bool,
}

export default Loading;