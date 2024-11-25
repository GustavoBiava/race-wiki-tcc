import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import axios from "../services/axios";
import { toast } from "react-toastify";
import { AdminContext } from "../contexts/AdminContext";

export const usePublication = () => {
    const [publication, setPublication] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);
    const { isLogged, user } = useSelector(states => states.auth);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (!slug) return navigate('/');
        if (mode === 'admin') unsetAdmin();
        try {
            (async function() {
                const response = await axios.get(`/pages/publication/${slug}`);
                return setPublication(response.data);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, [slug, publication]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    const handleCommentClick = async () => {
        if (!isLogged) return toast.error('Você precisa ter uma conta para comentar!');
        if (!title) return toast.error('Título não pode ser vazio!');
        if (!body) return toast.error('Comentário não pode ser vazio!');

        await axios.post('/comments/', {
            title,
            body,
            user_id: user.id,
            publication_id: publication.id,
        })

        setTitle('');
        setBody('');

        return toast.success('Comentário publicado com sucesso!');
    }

    const handleResponseClick = async (e) => {
        if (!isLogged) return toast.error('Você precisa ter uma conta para comentar!');
        if (!response) return toast.error('Resposta não pode ser vazia!');

        const comment = e.target.closest('.comment').id;

        await axios.post('/commentsComments/', {
            body: response,
            user_id: user.id,
            comment_id: comment,
        })

        setResponse('');

        return toast.success('Resposta publicada com sucesso!');
    }

    return {
        publication,
        formatDate,
        handleCommentClick,
        title,
        setTitle,
        body,
        setBody,
        response,
        setResponse,
        handleResponseClick,
    }

}