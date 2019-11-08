import React , {Component} from 'react';
import api from "../../services/api";
import "./styles.css";

export default class Pokemon extends Component{
    constructor(props){
     super(props);
     this.state = {
        moves: [],
        base_experience: 0,
        height: 0,
        weight: 0,
        id: 0,
        name: '',
     };
    }
    
    componentDidMount() {
        this.loadPokemons();
    } 
   
    loadPokemons = async () => {
       const { name } = this.props.match.params
       const response = await api.get(`/pokemon/${name}`)
   
       const { data } = response;
       console.log(data);
       this.setState({
        moves: data.moves,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        id: data.id,
        name: data.name,
    });
   
    };


   
     
    render(){
       const { moves, base_experience, height, weight, id, name} = this.state;
       return (
        <div className = "detalhes">
              
            <h1>{name}</h1>
              <p>Id: {id}</p>
              <p>Exp base: {base_experience}</p>
              <p>Altura: {height}</p>
              <p>Peso: {weight}</p>

            <h2>Abilidades:</h2>  
              
            {moves.map(({move}) => (
                <article key={move.name}>
                   <ul className = "lista">
                     <li>{move.name}</li>
                   </ul> 
                </article>
            ))}
            
        </div>
       );
    }
}