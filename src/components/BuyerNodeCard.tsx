import { Trans } from "@lingui/macro";
import BuyANodeLink from "./BuyANode";

const BuyerNode = () => (
    <div className="relative isolate rounded-xl bg-[url('/images/program/panel-1.png')] bg-cover bg-center p-8 pb-[230px] md:pb-[86px]">
        <p className="max-w-[468px] text-[24px] font-bold leading-[1.25] md:text-[28px]">
            <Trans>Become a Myria node owner & receive rewards</Trans>
        </p>
        <p className="mt-4 max-w-[417px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
            <Trans>
                Receive $MYRIA and limited edition NFT rewards whilst supporting the Myria network
            </Trans>
        </p>
        <BuyANodeLink className="btn-lg btn-primary mt-8 md:mt-10" />
        <img
            src="/images/program/computer_op.png"
            alt=""
            width="268"
            height="145"
            className="absolute right-4 bottom-4 z-[-1]"
        />
    </div>
)

export default BuyerNode;