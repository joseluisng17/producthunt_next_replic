import React, {useState} from 'react';
import Layout from '../components/layout/layouts';
import Router from 'next/router';
import { css } from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
}


const Login = () => {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    //console.log('Iniciando sesión');
    try {
      const usuario = await firebase.login(email, password);
      console.log(usuario);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      guardarError(error.message);
    }
    
  }

  return (
    <div>
      <Layout>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}
        >Iniciar Sesión</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >

          <Campo>
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          {errores.email && <Error>{errores.email}</Error> }

          <Campo>
            <label>Password</label>
            <input 
              type="password"
              id="password"
              placeholder="Tu Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          {errores.password && <Error>{errores.password}</Error> }

          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" value="Iniciar Sesión"/>
        </Formulario>
      </Layout>
    </div>
  )
}

export default Login;