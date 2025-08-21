import React from 'react';
import styles from '../styles/input.module.css';

type inputProps = {
	placeholder: string;
	type: 'text' | 'password' | 'email';
	name: string;
};

const Input: React.FC<inputProps> = ({ placeholder, type, name }) => {
	return (
		<>
			<input
				className={styles.input}
				type={type}
				placeholder={placeholder}
				name={name}
			/>
		</>
	);
};

export default Input;
