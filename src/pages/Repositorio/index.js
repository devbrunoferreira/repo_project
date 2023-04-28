// CÓDIGO DO CURSO

// const Repositorio = ({match}) => {

//   return (
//     <h1 style={{color:'#FFF'}}>
//       Repositorio
//       {match.params.repositorio}
//     </h1>
//   );
// };

// export default Repositorio;


// CÓDIGO ATUALIZADO E FUNCIONANDO

// HOOKS
import React, { useState, useEffect } from 'react';

// DATA
import api from '../../services/api';

// ROUTES
import { useParams } from 'react-router-dom';

// STYLED-COMPONENTS
import { Loading, Container, Owner, BackButton, IssuesList, PageActions } from './styles';

// ICONS
import { FaArrowLeft } from 'react-icons/fa';

// {repositorio}

const Repositorio = () => {
  const { repositorio } = useParams(); // Utiliza o hook useParams do React Router para obter os parâmetros da URL correspondente. 
                                      // No caso, ela está extraindo o parâmetro repositorio da URL.
  const [repo, setRepo] = useState({}); // Usamos um OBJETO vazio porque vamos listar apenas um item
  const [issues, setIssues] = useState([]); // Usamos um ARRAY vazio porque vamos listar vários itens
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      const nomeRepo = repositorio;

      // const response = await api.get(`/repos/${nomeRepo}`)
      // const issues = await api.get(`/repos/${nomeRepo}/issues`)
      const [ repositorioData, issuesData ] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepo(repositorioData.data);
      console.log(repositorioData);
      setIssues(issuesData.data);
      setLoading(false);
      // console.log(repositorioData.data);
      // console.log(issuesData.data);
      
    };

    load();
  }, [repositorio]);
  

  useEffect(() => {

    async function loadIssue() {
      const nomeRepo = repositorio;

      const response = await api.get(`/repo/${nomeRepo}/issues`, {
        params: {
          state: 'open',
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);

    }

    loadIssue();
  }, [repositorio, page]);

  const handlePage = (action) => {
    setPage(action === 'back' ? page -1 : page +1);
  };

  console.log(page);

  if (loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>

      <BackButton to="/">
        <FaArrowLeft size={30}/>
      </BackButton>

      <Owner>
        <img 
        src={repo.owner.avatar_url} 
        alt={repo.owner.login} 
        />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>

      <IssuesList>
        {issues.map( issue => (
          <li key={String(issue.id)}>
            
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            
            <div>
              <strong>

                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map( label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}

              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button type='button' onClick={() => handlePage('back')}>
          Voltar
        </button>

        <button type='button' onClick={() => handlePage('next')}>
          Próxima
        </button>
      </PageActions>

    </Container>
  );
};

export default Repositorio;