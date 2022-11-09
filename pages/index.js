import config from "../config.json";
import styled from "styled-components";
import React , { useState } from 'react';
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red" 
    };

    const [valorDoFiltro, setValorDoFiltro] = useState("");


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    .banner {
        width: 100%;
        height: 300px;
    }
    
    .perfil {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <img className="banner" src={config.banner} /> 
            <section className="user-info">
                <img className="perfil" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...propriedades}) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormailized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormailized)
                            } ).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}