// CSS FIREBASE
import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from "react";

// MATERIAL UI IMPORT
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import {Link} from "react-router-dom";

// CSS IMPORT

import './SendNewValidation.css';
import {auth, database} from "../../firebase";

//PAGE VALIDATION INCRIPTION

export default function SendNewValidation () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const {logout, reSendEmail} = useAuth();

    const {currentUser} = useAuth();

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
                    console.log('email envoyé a ' + currentUser.email);
                })
        } catch(error) {
            setError('Marche pas');
        }
    }

    return (

        <div className='signIn-Validation container'>

            <div className="text-validation">
                <p>Un e-mail de confirmation vous a été renvoyé, merci de vérifier votre boite mail.
                    Attention, vérifiez si le mail n'est pas dans vos Spams.</p>

            </div>

            {/* MATERIAL UI BUTTON FOR CLOSE VALIDATION */}
            <Button onClick={sendEmail}>Renvoyer un mail</Button>

        </div>
    );
}