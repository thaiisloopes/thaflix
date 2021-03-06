import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import categoriasRepository from '../../../repositories/Categoria/categorias';

function ListaCategorias() {
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
        Categorias
      </h1>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
            <br></br>
            <Link to="/" onClick={() => categoriasRepository.remove(categoria.id)}>
                Remover Categoria
            </Link>
            <hr></hr>
          </li>
        ))}
      </ul>

      <Button as={Link} to="/cadastro/categoria">
        Cadastrar Categoria
      </Button>

      <Button as={Link} to="/">
        Home
      </Button>
    </PageDefault>
  );
}

export default ListaCategorias;
