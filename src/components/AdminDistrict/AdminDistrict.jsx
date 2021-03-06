// IMPORT CSS
import './admindistrict.css'

// IMPORT MATERIAL
import {Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// IMPORT FIREBASE
import { database } from '../../firebase';

// REACT IMPORT

import React, {useRef, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

//ADD A LOCATION
export default function AdminDistrict() {


  

    const [isShow, setIsShow] = useState(false);
    const [districtAdded, setDistrictAdded] = useState(false);
    const [towns, setTowns] = useState([]);
    const [error,setError] = useState()


    const formRef = useRef();
    const districtNameRef = useRef();
    const townRef = useRef();


    useEffect(() => {
        database.towns.orderBy('name').get().then(towns => {
            const tempTowns = []
            towns.forEach(town => {
                tempTowns.push(database.formatDoc(town))
            })
            setTowns(tempTowns) 
        })
    }, [])


    const addDistrict = (e) => {
        e.preventDefault();

        if (districtNameRef.current.value.length < 1 || townRef.current.value.length < 1) {
            setIsShow(!isShow);
            if (districtAdded) {
                setDistrictAdded(!districtAdded);
            }
        } else {

            database.districts.add({
                name: districtNameRef.current.value,
                town: townRef.current.value,
                createdAt: database.getCurrentTimestamp
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }
                if (!districtAdded){
                    setDistrictAdded(!districtAdded);
                }
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal passé :(');
            });


        }
    }

    return (
      <div className="container container-admin">
          <BackToAdminDashboardButton />
         <h1>Quartiers</h1>
        
         <Link className="district-list-link" to={'/district-list'}>
            <div className="place-list-btn">
                <Button variant="contained" >Voir tous les quartiers</Button>
             </div>
         </Link>

         <h2 className="create-district-title">Ajout d'un nouveau quartier</h2>
         <form onSubmit={addDistrict} ref={formRef} className="district-form">
            <TextField inputRef={districtNameRef} label="Quartier" variant="outlined"/>


            <TextField select inputRef={townRef} label="Commune" variant="outlined">
            {towns.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
            </TextField>

            <Button type="submit" variant='contained' color="secondary">Ajouter</Button>


            {error && <Alert severity="error">{error}</Alert> }
            {districtAdded && <Alert severity="success">Le quartier a été ajouté</Alert>}
            {isShow && <Alert severity="warning">Tous les champs doivent être remplis !</Alert>}
         </form>



         <Link className="MuiButtonBase-root MuiButton-root MuiButton-contained admin-form-btn" to={'/adminplace'}>Ajouter un lieu</Link>



         <Link to={'/admin-place'}><Button variant='contained'>Ajouter un lieu</Button></Link>
        

     </div>
    )
}