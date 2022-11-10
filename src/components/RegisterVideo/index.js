import { StyledRegisterVideo } from "./styles";
import React from "react";

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
        initialValues: {titulo: "frostpunk", url: "https://youtube.com..."}
    });

    return (
        <StyledRegisterVideo>
           <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
           {formVisivel ? (
            <form onSubmit={(e) => { 
                e.preventDefault();
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