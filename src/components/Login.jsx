import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CardMedia } from '@mui/material';

import { Videos, ChannelCard } from '.';
import { fetchFromAPI, loginApi } from '../utils/fetchFromAPI';
import { toast } from 'react-toastify';

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {}, []);

  const handleLogin = async () => {
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#pass').value;
    const payload = { email, pass };
    try {
      const login = await loginApi(payload);
      toast.success(login.message);
      navigate('/');
    } catch (e) {
      toast.success(e.response.data.message);
    }
  };
  return (
    <div
      className='p-5 '
      style={{ minHeight: '100vh' }}>
      <div className=' d-flex justify-content-center'>
        <form className='row g-3 text-white'>
          <div className='col-md-12'>
            <label
              htmlFor='inputEmail4'
              className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
            />
          </div>

          <div className='col-md-12'>
            <label
              htmlFor='inputEmail4'
              className='form-label'>
              Password
            </label>
            <input
              className='form-control'
              id='pass'
            />
          </div>
          <div className='col-12'>
            <button
              onClick={handleLogin}
              type='button'
              className='btn btn-primary'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
