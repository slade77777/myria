import { Trans } from '@lingui/macro';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import Modal from 'src/components/Modal';
// import Input from 'src/components/Input';
import React from 'react';
import Button from 'src/components/core/Button';
import { toast } from 'react-toastify';

// interface IFormInputs {
//   email: string;
// }

const WhiteListSale = ({
  open,
  onClose
}: // onSubscribed
{
  open: boolean;
  onClose?: () => void;
  // onSubscribed?: () => void;
}) => {
  // const schema = yup
  //   .object({
  //     email: yup
  //       .string()
  //       .email(t`Invalid email!`)
  //       .required(t`Email is required!`)
  //   })
  //   .required();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   getValues,
  //   formState: { errors, isSubmitting }
  // } = useForm<IFormInputs>({
  //   resolver: yupResolver(schema)
  // });

  // const onSubmit = async (data: IFormInputs) => {
  //   try {
  //     reset();
  //     toast.success(t`Email subscribed`);
  //     onSubscribed?.();
  //   } catch (error: any) {
  //     toast.error(t`Subscribe email failed, please try again.`);
  //   }
  // };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="Myria Node Whitelist Sale"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[576px]">
        <div className="p-8">
          <div className="mb-[64px]">
            <p className="mb-6 text-[16px] font-normal text-[#A1AFBA]">
              <Trans>
                Oops, it looks like your wallet is not registered on our Whitelist, which means that
                we can’t proceed with your purchase at the moment.
              </Trans>
            </p>
          </div>
          <div className="mb-8 flex">
            {/* <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
              <div className="mb-8 w-full">
                <span className="mb-1 block text-[16px] font-normal text-[#A1AFBA]">
                  <Trans>Email Address</Trans>
                </span>
                <Input
                  label={t`Email Address`}
                  placeholder={t`Enter your email`}
                  {...register('email')}
                  error={!!errors.email}
                  errorText={errors.email?.message}
                  containerClassName="relative w-full"
                />
              </div>
              <Button className="btn-lg btn-primary w-full px-10">
                <Trans>SUBMIT</Trans>
              </Button>
            </form> */}
            <Button className="btn-lg btn-primary w-full px-10" onClick={onClose}>
              <Trans>OK</Trans>
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default WhiteListSale;
