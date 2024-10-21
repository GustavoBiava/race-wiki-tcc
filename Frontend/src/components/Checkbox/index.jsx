import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import PropTypes from 'prop-types';

import { CheckboxContainer, StyledCheckbox } from './styled';

function Checkbox({ onClick }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        onClick();
        return setIsChecked(!isChecked)
    };

    return (
        <CheckboxContainer checked={isChecked} onClick={handleCheckboxChange}>
            <StyledCheckbox checked={isChecked}>
                <FaCheck size={14}/>
            </StyledCheckbox>
        </CheckboxContainer>
    );
}

Checkbox.propTypes = {
    onClick: PropTypes.func,
}

export default Checkbox;