import React from 'react';
import styles from '../styles/button.module.css';

const Button = ({ children }: { children: React.ReactNode }) => {
	return <button className={styles.btn}>{children}</button>;
};

export default Button;
