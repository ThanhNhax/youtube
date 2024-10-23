import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, CardMedia } from '@mui/material';

import { Videos, ChannelCard } from '.';
import {
  fetchFromAPI,
  loginApi,
  loginAsyncKeyApi,
  loginFaceBookApi,
} from '../utils/fetchFromAPI';
import { toast } from 'react-toastify';
import ReactFacebookLogin from 'react-facebook-login';

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {}, []);

  const handleLogin = async () => {
    console.log('login click');
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#pass').value;
    let code = document.getElementById('code').value;
    const payload = { email, pass, code };

    try {
      const login = await loginApi(payload);
      console.log(login);
      if (login) {
        localStorage.setItem('LOGIN_USER', JSON.stringify(login));
        localStorage.setItem('accessToken', login?.data?.accessToken);
        toast.success(login?.message);
        navigate('/');
      }
    } catch (e) {
      console.log({ e });
      toast.error(e?.response?.data?.message);
    }
  };

  const handleLoginAsynnc = async () => {
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#pass').value;
    const payload = { email, pass };
    try {
      const login = await loginAsyncKeyApi(payload);
      localStorage.setItem('LOGIN_USER', JSON.stringify(login));
      toast.success(login.message);
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data?.message);
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

          <div className='col-md-3'>
            <label
              htmlFor='inputEmail4'
              className='form-label'>
              Code
            </label>
            <input
              className='form-control'
              id='code'
            />
          </div>

          <Link
            className='text-primary'
            to={'/forgot-password'}>
            Forgot password
          </Link>
          <div className='col-12'>
            <button
              onClick={handleLogin}
              type='button'
              className='btn btn-primary'>
              Login
            </button>
            <div className='col-12'>
              <button
                onClick={handleLoginAsynnc}
                type='button'
                className='btn btn-primary'>
                Login Async Key
              </button>
            </div>
            <div className='col-12'>
              <ReactFacebookLogin
                appId='1229815484716631'
                fields='name, email, picture'
                callback={(response) => {
                  console.log({ response });
                  const payload = {
                    email: response.email,
                    id: response.userID,
                    name: response.name,
                    avatar: response.picture?.data?.url,
                  };
                  loginFaceBookApi(payload)
                    .then((res) => {
                      toast.success(res.message);
                      localStorage.setItem(
                        'LOGIN_USER',
                        JSON.stringify(res?.data?.user)
                      );
                      navigate('/');
                    })
                    .catch((e) => toast.error(e.response.data.message));
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
