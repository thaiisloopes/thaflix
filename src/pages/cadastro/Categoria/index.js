import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const { valores, funcaoHandler, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categorias) => {
        setCategorias(categorias);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {valores.titulo}
      </h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        categoriasRepository.create({
          'titulo': valores.titulo,
          'descricao': valores.descricao,
          'cor': valores.cor
        })

			  clearForm(valoresIniciais);
      }}>

        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={valores.titulo}
          onChange={funcaoHandler}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={valores.descricao}
          onChange={funcaoHandler}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={valores.cor}
          onChange={funcaoHandler}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.lenght === 0 && (
      <div>
        {/* Cargando ... */ }
        Loading...
      </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Button as={Link} to="/">
        Ir para home
      </Button>
    </PageDefault>
  );
}

export default CadastroCategoria;
