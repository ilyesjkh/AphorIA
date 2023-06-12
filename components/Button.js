import React from 'react';
import Link from 'next/link';

const Button = ({ text, link }) => {
    return (
        <a href={link} className = 'btn'>
            {text}
        </a>
    )
}

export default Button;