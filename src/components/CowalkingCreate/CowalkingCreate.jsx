/// ----- Material UI ---- ///
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Alert} from "@material-ui/lab";

/// ----- CSS ----- ///
import './cowalkingcreate.css';

/// ----- React Modules ----- ///
import {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {useAuth} from "../../contexts/AuthContext";

// FIREBASE
import {database} from '../../firebase'
import {useHistory} from "react-router-dom";

///////// PAGE DE CREATION DES COPIETONNAGE //////////


function CowalkingCreate () {

    const [locations, setLocations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [goTo,setGoTo] = useState('');
    const [startFrom,setStartFrom] = useState('');

    const {currentUser} = useAuth();

    const history = useHistory();

    useEffect(() => {
        database.locations.orderBy('name').get().then(locations => {
            const tempLocations = []
            locations.forEach(location => {
                tempLocations.push(database.formatDoc(location))
            })
            setLocations(tempLocations)
            
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmitCowalk(ev) {
        ev.preventDefault();
        if (selectedDate.getTime() > new Date().getTime()-60000){

            try {
                setError('');
                setLoading(true)
            await database.cowalks.add({
                startFrom: startFrom,
                goTo: goTo,
                startTime: selectedDate,
                createdAt: database.getCurrentTimestamp,
                owner: currentUser.uid,
            }).then(()=>{
                    history.push("/list")
                })
            } catch(error) {
            setError(error.message)
            }
            setLoading(false);
        } else {
            setError("Vous ne pouvez pas cr??er un copi??tonnage dans le pass??")
        }
    }

    return (
      <div className="create-walk container">
        <h2>Cr??er votre itin??raire</h2>
        <form className="createform">
            
            <TextField select defaultValue="" value={startFrom} onChange={(event)=>setStartFrom(event.target.value)} label="D??part">
                <option value="" disabled>Choisissez un lieu de d??part</option>    
                {locations.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>


            <TextField select defaultValue="" value={goTo} onChange={(event)=>setGoTo(event.target.value)} label="Destination">
                <option value="" disabled>Choisissez une destination</option> 
                {locations.map((option) => (
                <option key={option.id} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                value={selectedDate}
                onChange={setSelectedDate}
                minutesStep={15}
                />
            </MuiPickersUtilsProvider>
            <div className="button-container">
                <Button disabled={loading} onClick={handleSubmitCowalk} type="submit" variant="contained">Cr??er</Button>
                {error && <Alert severity="error">{error}</Alert>}
            </div>
        </form>
      </div>
    )
}


export default CowalkingCreate;


