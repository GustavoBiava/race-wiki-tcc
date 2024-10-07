import { FaCheck } from "react-icons/fa6";


import { useState } from 'react';
import { CheckboxContainer, StyledCheckbox } from './styled';

function Checkbox() {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxChange = () => setIsChecked(!isChecked);

    return (
        <CheckboxContainer checked={isChecked} onClick={handleCheckboxChange}>
            <StyledCheckbox checked={isChecked}>
                <FaCheck size={14}/>
            </StyledCheckbox>
        </CheckboxContainer>
    );
}

export default Checkbox;