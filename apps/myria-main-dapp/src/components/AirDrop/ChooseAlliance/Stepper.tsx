import { t } from '@lingui/macro'
import React from 'react'
import SigilStepper from 'src/components/sigil/SigilStepper'

interface Props {
    currentStep: number
}

const ChooseAllianceStepper: React.FC<Props> = ({ currentStep }) => {
    return (
        <div className="absolute bottom-1 left-1/2 ml-auto mr-auto mt-auto w-full max-w-[577px] -translate-x-1/2">
            <SigilStepper
                steps={[
                    {
                        title: t`Connect Wallet`
                    },
                    {
                        title: t`Choose Alliance`
                    },
                    {
                        title: t`Claim your NFT reward`
                    }
                ]}
                currentStep={currentStep}
            />
        </div>
    )
}

export default ChooseAllianceStepper