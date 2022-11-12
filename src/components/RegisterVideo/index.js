import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from '@supabase/supabase-js';

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues);
    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name; //capturando o name para personalizar o input do form que está sendo chamado
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

//configuração do supabase

const PROJECT_URL = "https://roqrzpvvgdlmogqcuuan.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcXJ6cHZ2Z2RsbW9ncWN1dWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTEwOTAsImV4cCI6MTk4MzgyNzA5MH0.xaKHF7Lrlw6dp-g7SOEMOxXhQCrH-KssJq_a-t8Exrg";
const supabase = createClient(PROJECT_URL, API_KEY);


function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    
    /*
    O que precisamos fazer para o form funconar?
    -pegar os dados, que precisam vir do state:
        *input de título
        *input de url
    -capturar o evento de onSubmit do Form
    -limpar o formulário após o submit
    */

    const formCadastro = useForm({
        initialValues: {titulo: "frostpunk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });

    return (
        <StyledRegisterVideo>
           <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
           {formVisivel ? (
            <form onSubmit={(e) => { 
                e.preventDefault();
                //conexão entre o front e o backend
                supabase.from("video").insert({
                    title: formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb: getThumbnail(formCadastro.values.url),
                    playlist:"jogos"
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });

                setFormVisivel(false);
                formCadastro.clearForm();
            }}>
                <div>
                    <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>x</button>
                    <input placeholder="Título do vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange} />
                    <input placeholder="Url do vídeo" name="url" value={formCadastro.values.url} onChange={formCadastro.handleChange}/>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
           ) : null }
        </StyledRegisterVideo>
    );
};