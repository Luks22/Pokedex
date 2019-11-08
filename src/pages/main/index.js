import React, { Component } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';
import "./styles.css";

export default class Main extends Component{
 constructor(props){
  super(props);
  this.state = {
     pokemons: [],
     anterior: '',
     proximo: '',
     offset: 0,
     limit: 20,
     count: 0,
  };
 }
 
 componentDidMount() {
     this.loadPokemons();
 } 

 loadPokemons = async () => {
    const response = await api.get('/pokemon', {
        params: {
            offset: this.state.offset,
            limit: this.state.limit,
        },
    });

    const { data } = response;
    this.setState({
        pokemons: data.results,
        anterior: data.previous,
        proximo: data.next,
        count: data.count,
    });

 };

 proximo(){
    this.setState({
        offset: this.state.offset + 20
    });
    if(this.state.offset > this.state.count){
      this.setState({
        offset: 0,
      });
    }
    this.loadPokemons();
 }

 anterior(){
    this.setState({
        offset: this.state.offset - 20
    });
    if(this.state.offset < this.state.count){
      this.setState({
        offset: 0,
      });
    }
    this.loadPokemons();
    
}

  
 render(){
    const { pokemons } = this.state;
    return (
        <div className = "listaPokemon">
            
            {pokemons.map(({name, url }, nome) => (
                <article key={name}>
                    <h1>{name}</h1>
                    <Link to={`/pokemon/${name}`}>Ver detalhes</Link>
                </article>
            ))}
          <div className = "actions">
            <button onClick = {() => this.anterior()}>Anterior</button>
            <button onClick = {() => this.proximo()}>Proximo</button>
          </div>
        </div>
    );
  }

}