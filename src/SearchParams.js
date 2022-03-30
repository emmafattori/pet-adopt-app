import { useState, useEffect, useContext } from 'react';
import useBreedList from './useBreedList';
import ThemeContext from './ThemeContext';
import Results from './Results';

const animals = ['dog', 'cat', 'bird', 'rabbit', 'reptile']

const SearchParams = () => {
    const [location, setLocation] = useState('');
    const [animal, setAnimal] = useState('');
    const [breed, setBreed] = useState('');
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        requestPets()
    }, [])

    async function requestPets() {
        const res = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)

        const json = await res.json()
        setPets(json.pets)
    }
    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault()
                    requestPets()
                }}
            >
                <label htmlFor="location">
                    Location
                    <input id="location" onChange={e => setLocation(e.target.value)} value={location}></input>
                </label>
                <label>
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={e => setAnimal(e.target.value)}
                        onBlur={e => setAnimal(e.target.value)}
                    >
                        <option />
                        {
                            animals.map((animal) => (
                                <option value={animal} key={animal}>{animal}</option>
                            ))
                        }
                    </select>
                </label>

                <label>
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        onBlur={e => setBreed(e.target.value)}
                    >
                        <option />
                        {
                            breeds.map((breed) => (
                                <option value={breed} key={breed}>{breed}</option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}>
                        <option value="darkblue">Dark Blue</option>
                        <option value="peru">Peru</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>

                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets} />

        </div>
    )
}

export default SearchParams