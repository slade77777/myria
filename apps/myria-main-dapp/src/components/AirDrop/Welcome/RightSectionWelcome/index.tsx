import clsx from 'clsx'
import React from 'react'
import HowItWorksComponent from './HowItWork'

const RightSectionWelcome = () => {
    return (
        <div className={clsx(`w-[508px] rounded-2xl bg-[#5A7486]/30`)}>
            <HowItWorksComponent />
        </div>
    )
}

export default RightSectionWelcome