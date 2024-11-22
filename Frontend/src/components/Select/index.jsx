import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

import {
    Dropdown,
    DropdownBtn,
    DropdownContent,
    DropdownItem,
} from './styled';
import { useEffect, useState } from "react";

function Select({ selected, setSelected, options }) {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

    }, [selected, setSelected, options]);

    return (
        <Dropdown>
            <DropdownBtn onClick={() => setIsActive(!isActive)}>
                <p>{selected ? selected : 'Selecione um...'}</p>
                <IoIosArrowDown size={16}/>
            </DropdownBtn>
            { isActive ? (
                <DropdownContent>
                    { options.map((option, index) => (
                        <DropdownItem key={index} onClick={() => {
                            setSelected(option)
                            setIsActive(false)
                        }}>{option}</DropdownItem>
                    ))}
                </DropdownContent>
            ) : '' }
        </Dropdown>
    );
}

Select.PropTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.string.isRequired,
}

export default Select;