import './styles.css'
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Login() {
    const [id, setId ] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name );
            history.push('/profile');

        } catch(error){
            alert(`Falha no login, tente novamente`);
        }
    }
    return(
        <div className="login-container">
            <section className="form">
                <img src={ logoImage } alt="Be the Hero"/>
                <form onSubmit={ handleLogin }>
                    <h1>Faça seu Login</h1>
                    
                    <input placeholder="Sua ID" value={ id } onChange={ e=> setId(e.target.value)}></input>
                    <button className="button" type="submit"> Entrar </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"></FiLogIn>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={ heroesImage } alt="Heroes"/>
        </div>
    );
}