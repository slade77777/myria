import React from 'react';
import Modal from '../Modal';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import Input from '../Input';
import { Loading } from '../Loading';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from 'src/client';
import { toast } from 'react-toastify';

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email(`Invalid email!`).required(`Email is required!`)
  })
  .required();

const verifyEmail = async (email: string) => {
  return apiClient.post(`/accounts/email`, { email, redirect: 6 });
};

const VerifyEmailModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const { mutate, isLoading } = useMutation(verifyEmail, {
    onSuccess: () => {
      onClose();
      toast('Email linked successfully, please check your email to complete', {
        type: 'success'
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.[0]?.detail;
      if (message === 'Invalid Role') {
        onClose();
        toast("We've already got your email!", {
          type: 'success'
        });
      } else {
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  });

  const onSubmit = async (data: IFormInputs) => {
    mutate(data.email);
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Verify your email address">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="px-8 py-8">
            <p className="body-sm">Enter your email address to complete the mission</p>
            <Input
              placeholder={`Enter your email`}
              {...register('email')}
              error={!!errors.email}
              errorText={errors.email?.message}
              containerClassName="relative mt-8"
            />
            <button className="btn-lg btn-primary mt-6 w-full" disabled={isSubmitting}>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loading />
                </div>
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default VerifyEmailModal;
