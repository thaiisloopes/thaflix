import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

function CadastroCategoria() {
	const valoresIniciais = {
		nome: '',
		descricao: '',
		cor: ''
	}

	const { valores, funcaoHandler, clearForm } = useForm(valoresIniciais)

	const [categorias, setCategorias] = useState([]);

	useEffect(() => {
		console.log('Hello World');
		const URL = window.location.hostname.includes('localhost') 
		? 'http://localhost:8080/categorias'
		: 'https://educaflix-app.herokuapp.com/categorias';

		fetch(URL)
			.then(async (respostaDoServidor) => {
				const resposta = await respostaDoServidor.json();
				setCategorias([
					...resposta,
				]);
			});
	}, []);

	return (
		<PageDefault>
			<h1>Cadastro de Categoria: {valores.nome} </h1>

			<form onSubmit={function hadleSubmit(infosDoEvento) {
				infosDoEvento.preventDefault();
				setCategorias([
					...categorias,
					valores
				]);

				clearForm(valoresIniciais)
			}}>
				
				<FormField
					label="Nome da Categoria"
					type="text"
					name="nome"
					value={valores.nome}
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
				{categorias.map((categoria) => {
					return (
						<li key={`${categoria.titulo}`}>
							{categoria.titulo}
						</li>
					)

				})}

			</ul>

			<Link to="/">
				Ir para home
			</Link>
		</PageDefault>
	)
}

export default CadastroCategoria;