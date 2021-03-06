// IMPORT CSS
import './adminplace.css'

// IMPORT MATERIAL
import {Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// FIREBASE IMPORT
import { database } from '../../firebase';

// REACT IMPORT
import React, {useRef, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import BackToAdminDashboardButton from "../BackToAdminDashboardButton/BackToAdminDashboardButton";

//ADD A LOCATION
export default function AdminPlace () {

    const [isShow, setIsShow] = useState(false);
    const [locationAdded, setLocationAdded] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [error,setError] = useState()

    const formRef = useRef();
    const locationNameRef = useRef();
    const districtRef = useRef();
    const adressRef = useRef();

    useEffect(() => {
        database.districts.orderBy('name').get().then(districts => {
            const tempDistricts = []
            districts.forEach(district => {
                tempDistricts.push(database.formatDoc(district))
            })
            setDistricts(tempDistricts)
        })
    }, [])

    const addLocation = (e) => {
        e.preventDefault();
        
        if(locationNameRef.current.value.length < 1 || districtRef.current.value.length < 1 || adressRef.current.value.length < 1){
            setIsShow(!isShow);
            if(locationAdded){
                setLocationAdded(!locationAdded);
            }
        } else {

            database.locations.add({
                name: locationNameRef.current.value,
                district: districtRef.current.value,
                adress: adressRef.current.value,
                createdAt: database.getCurrentTimestamp,
                mapUrl: ("https://www.google.com/maps/place/"+ (adressRef.current.value).split(' ').join('+') + "+tours")
            })
            .then((docRef) => {
                formRef.current.reset();
                if (isShow) {
                    setIsShow(!isShow);
                }

                if(!locationAdded){
                    setLocationAdded(!locationAdded);
                }
            })
            .catch((error) => {
                setError('Quelque chose s\'est mal pass?? :(');
            });
        }

    }

    return (

      <div className="container container-admin">

          <BackToAdminDashboardButton />
         <h1>Lieux</h1>
         <Link className="place-list-link" to={'/place-list'}>
             <div className="place-list-btn">
                <Button variant="contained">Voir tous les lieux</Button>
             </div>
         </Link>
         <h2 className="create-place-title">Cr??ation d'un nouveau lieu</h2>

        <form onSubmit={addLocation} ref={formRef} className="place-form">

        <TextField inputRef={locationNameRef} label="Lieux" variant="outlined"/>
        <TextField select inputRef={districtRef} label="Quartier" variant="outlined">
            {districts.map((option) => (
            <option key={option.id} value={option.name}>
            {option.name}
            </option>
        ))}
        </TextField>
        <TextField inputRef={adressRef} label="Adresse" variant="outlined"/>


        <Button type="submit" color="secondary" variant='contained'>Ajouter</Button>


        {error && <Alert severity="error">{error}</Alert> }
        {locationAdded && <Alert severity="success">Le lieu a ??t?? ajout??</Alert>}
        {isShow && <Alert severity="warning">Tous les champs doivent ??tre remplis !</Alert>}

        </form>
        
        <Link to={'/admin-district'}><Button variant='contained'>Ajouter un quartier</Button></Link>
     </div>
    )
}