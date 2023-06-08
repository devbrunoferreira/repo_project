
// CÓDIGO ATUALIZADO E FUNCIONANDO

// HOOKS
import React, { useState, useEffect } from 'react';

// DATA
import api from '../../services/api';

// ROUTES
import { useParams } from 'react-router-dom';

// STYLED-COMPONENTS
import { Loading, Container, Owner, BackButton, IssuesList, PageActions, FilterList } from './styles';

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
  const [filters, setFilters] = useState([
    {state: 'all', label: 'All', active: true},
    {state: 'open', label: 'Open', active: false},
    {state: 'closed', label: 'Closed', active: false}
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = repositorio;

      // const response = await api.get(`/repos/${nomeRepo}`)
      // const issues = await api.get(`/repos/${nomeRepo}/issues`)
      const [ repositorioData, issuesData ] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
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

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);

    }

    loadIssue();
  }, [filters, filterIndex, repositorio, page]);

  const handlePage = (action) => {
    setPage(action === 'back' ? page -1 : page +1);
  };

  function handleFilter(index) {
    setFilterIndex(index);
  }

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

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            type='button'
            key={filter.label}
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>

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
        <button 
        type='button' 
        onClick={() => handlePage('back')}
        disabled={page < 2}
        >
          Back
        </button>

        <button type='button' onClick={() => handlePage('next')}>
          Next
        </button>
      </PageActions>

    </Container>
  );
};

export default Repositorio;