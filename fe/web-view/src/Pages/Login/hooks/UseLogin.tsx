/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../../libs/axios';
import useAuthStore from '../../../store/useAuthStore';
import { useLoginValidation } from './useLoginValidation';

export const useLogin = () => {
  const [show, setShow] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const { control, handleSubmit } = useLoginValidation(!isEmailValid);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const handleClick = () => setShow(!show);

  const onSubmitEmail = async (data: any) => {
    try {
      const response = await API.post('/users/verify-email', { email: data.email });
      if (response.status === 200) {
        setIsEmailValid(true);
        setIsPasswordVisible(true);
        setIsEmailEditable(false);
      }
    } catch (error: any) {
      toast.error("Email not registered");
    }
  }

  const onSubmitPassword = async (data: any) => {
    try {
      const response = await API.post('/users/login', { email: data.email, password: data.password });
      if (response.status === 200) {
        setToken(response.data.data.token);
        setUser(response.data.data);
        navigate('/');
      } else {
        toast.error("Login failed");
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  return {
    show,
    isEmailValid,
    isPasswordVisible,
    isEmailEditable,
    control,
    handleSubmit,
    handleClick,
    setIsEmailEditable,
    setIsEmailValid,
    onSubmitEmail,
    onSubmitPassword,
  };
};
