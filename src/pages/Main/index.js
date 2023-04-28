// Hooks
import { useCallback, useState, useEffect } from "react";

// Icons
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash, FaExclamationCircle } from "react-icons/fa";

// Styles
import { Container, Form, SubmitButton, List, DeleteButton, ErroRepo } from "./styles";

// API
import api from '../../services/api';

// Routes
import { Link } from "react-router-dom";


const Main = () => {

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // BUSCANDO DADOS NO LOCALSTORAGE
  useEffect(() => {
  const repoStorage = localStorage.getItem('repos');

  if(repoStorage){
    setRepositorios(JSON.parse(repoStorage));
  }

  }, []);

 
  // SALVANDO DADOS NO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);
 

  // FAZENDO A REQUISIÇÃO DOS REPOSITÓRIOS
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    async function submit(){
      setLoading(true); // HABILITA A ANIMAÇÃO 'LOADING' AO CLICAR NO BOTÃO
      setAlert(null);

      try {

        if(newRepo === ''){ // VERIFICA SE O CAMPO DE BUSCA ESTÁ VAZIO
          throw new Error("Você precisar indicar um repositório!");
        }

        const response = await api.get(`repos/${newRepo}`);
      
        // VERIFICANDO SE O REPOSITÓRIO JÁ FOI ADICIONADO AO ARRAY
        const hasRepo = repositorios.find( repo => repo.name === newRepo);
        if(hasRepo){
          throw new Error("Esse repositório já foi adicionado!")
        }

        const data = {
          name: response.data.full_name,
        }
    
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch(error){
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false); // DESABILITA O 'LOADING' AO FINALIZAR A REQUISIÇÃO
      }
    }
    
    submit();

  }, [newRepo, repositorios]);


// MANIPULANDO O VALOR DO INPUT
  const handleInput = (event) => {
    setNewRepo(event.target.value);
    setAlert(null);
  };

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter( r => r.name !== repo );
    setRepositorios(find);
  }, [repositorios]);

  return (
    <div>
        <Container>

          <h1>
            <FaGithub size={25} />
            Meus repositórios
          </h1>

          <Form onSubmit={handleSubmit} error={alert}>
            <input type="text" 
            placeholder="Adicionar Repositório" 
            value={newRepo}
            onChange={handleInput}
            />
            
            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? (
                <FaSpinner color="#FFF" size={14}/>
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>
          
          {alert ? 
            <ErroRepo>
              <FaExclamationCircle size={14}/>
              <span>Esse repositório já foi adicionado!</span>
            </ErroRepo> :
            <p></p>
          }

          
          
          <List>
              {repositorios.map(repo => (
                <li key={repo.name}>
                  <span>
                    <DeleteButton onClick={() => handleDelete(repo.name)}>
                      <FaTrash size={14}/>
                    </DeleteButton>
                    {repo.name}
                  </span>
                  <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                    <FaBars size={20}/>
                  </Link>
                </li>
              ))}
          </List>

        </Container>
    </div>
  );
};

export default Main;