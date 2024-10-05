import React from "react";

export const useExpanded = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleMenuClick = (e) => {
        const navbar = e.currentTarget.parentNode;

        if (!isExpanded) {
            navbar.classList.add('navbar-responsive')
            return setIsExpanded(true);
        }
        
        navbar.classList.remove('navbar-responsive');
        return setIsExpanded(false);
    }

    return {
        isExpanded,
        setIsExpanded,
        handleMenuClick,
    }
}