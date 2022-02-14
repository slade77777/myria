import ETH from 'src/components/icons/ETHIcon';
import { Dialog, DialogContent } from 'src/components/Modal';

const ModalPurchase = ({ open, onClose }: { open: Boolean; onClose: () => void }) => {
  return (
    <Dialog open={open} title="Complete your purchase" onClose={onClose}>
      <DialogContent className="z-20 w-80 shadow-[0_0_40px_10px_#0000004D] md:w-[832px]">
        <div className=" p-8">
          <div className="mt-10 mb-4 flex justify-between">
            <div>
              <p className="heading-list">Myria Founder’s Node</p>
              <p className="body-sm text-light">Quantity: 3</p>
            </div>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">4.5</p>
              </div>
              <p className="body-sm text-right text-light">~$13,824.90</p>
            </div>
          </div>

          <div className="mb-[56px] flex justify-between border-t border-white border-opacity-10 pt-4">
            <div className="">
              <p className="heading-list">Transaction fee</p>
            </div>
            <div>
              <div className="flex items-center justify-end">
                <ETH /> <p className="heading-list ml-2">4.5</p>
              </div>
              <p className="body-sm text-right text-light">~$13,824.90</p>
            </div>
          </div>
        </div>

        <section className="bg-[#050E15] p-8">
          <div className="flex justify-between">
            <p className="heading-list">Total</p>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">4.5</p>
              </div>
              <p className="body-sm text-right text-light">~$13,824.90</p>
            </div>
          </div>
          <div className="mt-1 flex">
            <p className="body-sm flex-1 text-light">From wallet</p>
            <button className="btn-lg btn-primary mt-2 justify-end">Purchase now</button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPurchase;
