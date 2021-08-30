// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from "react";
import {database} from "../../firebase";

// MATERIAL UI IMPORT
import Button from '@material-ui/core/Button';

// CSS IMPORT

import './SendNewValidation.css';
import {Alert} from "@material-ui/lab";

//PAGE VALIDATION INCRIPTION

export default function SendNewValidation () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const {reSendEmail, currentUser} = useAuth();

    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })

    }, [currentUser.uid])


    async function sendEmail(ev){
        ev.preventDefault();
        console.log(currentUser)
        try{
            reSendEmail(currentUser)
                .then(() => {
                    setMessage('email envoyé a ' + currentUser.email);
                })
        } catch(error) {
            setError('Quelque chose n\' pas fonctionné ...');
        }
        console.log(message)
    }

    return (

        <div className='sign-in-validation container'>
            {error ? <Alert severity="error">{error}</Alert> :
                <div className="text-validation">
                    <p>{userData.firstname}Un e-mail de confirmation vous a été renvoyé, merci de vérifier votre boite mail à l'adresse {currentUser.email}
                        <br></br>Attention, vérifiez si le mail n'est pas dans vos Spams.</p>
                </div>}

            {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
            <Button onClick={sendEmail}>Renvoyer un mail</Button>

        </div>
    );
}