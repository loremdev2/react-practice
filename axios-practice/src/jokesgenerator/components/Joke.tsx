import React from 'react';
import axios from 'axios';

interface JokeProps{

}

const Joke :React.FC<JokeProps> = () => {
    const [joke , setJoke] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const fetchJoke = async ()=>{
        setLoading(true);
        setError(null);
        try{
            const response= await axios.get('https://sv443.net/jokeapi/v2/joke/Programming?type=single');
            setJoke(response.data.joke);
        }catch(error){
            setError('Failed to fetch joke');
            console.log("Error: "+error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div>
            <h2>Random Joke</h2>
            {joke ? <p>{joke}</p> : <p>No joke available</p>}
            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> : <button onClick={fetchJoke}>Fetch Joke</button>}
        </div>
     )
}
export default Joke;