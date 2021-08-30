import { database } from '../../firebase';

// REACT IMPORT
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

//LIST ALL LOCATION
export default function PlaceList () {

    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [locations, setLocations] = useState([]);

    //Pouvoir trier par ordre alphabétique ou quartier ?

    useEffect(() => {
        database.locations.get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            tempLocations.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            setLocations(tempLocations)            
        })
    }, [])

    return (
      <div class="container container-admin">
         <h1>Lieux existants</h1>
         <Link className="MuiButtonBase-root MuiButton-root MuiButton-contained admin-form-btn" to={'/adminplace'}>Retour</Link>
        
     </div>
    )
}