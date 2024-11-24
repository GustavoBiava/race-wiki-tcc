import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CheckboxContainer, StyledCheckbox } from './styled';

function Checkbox({ onClick, selected }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (selected) setIsChecked(true);
    }, [selected]);

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