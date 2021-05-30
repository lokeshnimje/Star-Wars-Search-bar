import React from 'react'
import styles from "./LoadingIndicator.module.css"
const LoadingIndicator = () => {
    return (
        // Loading indicator in search bar
        <div className={styles.loading_spinner}>
            <div className={styles.spinner_Div}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
        </div>
    )
}

export default LoadingIndicator
