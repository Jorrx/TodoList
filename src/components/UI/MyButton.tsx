import React, { memo } from 'react'

const MyButton = ({ children, ...props }: any) => {
    console.log(props)
    return (
        <button {...props}>
            {children}
        </button>
    )
}

export default memo(MyButton)
