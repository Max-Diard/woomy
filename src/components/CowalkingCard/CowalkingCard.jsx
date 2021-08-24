
/// ----- Material UI ----- ///
import ButtonRound from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

/// ----- Import image ----- ///
import ImageProfil from './profile-pic-placeholder.png'

/// ----- CSS ----- ///
import "./cowalkingCard.css";

/// ----- React Modules ----- ///
import {Link} from "react-router-dom";

/////////// CARTE DE COPIETONNAGE //////////////

function CowalkingCard ({cowalk,index}) {
    
    return(
        <Link to="/ticket">
            <li className='cowalkingCard' key={cowalk.id}>
                <div className='cowalkingCardTitle'>
                    <h3>itinéraire:{index+1}</h3>
                    <div className='cowalkingCardRoute'>
                        <div className="cowalkingCardDeparture">
                            <p>Départ:</p>
                            <span>{cowalk.startFrom}</span>
                        </div>
                        <span>
                            <TrendingFlatIcon/>
                        </span>
                        <div className="cowalkingCardDestination">
                            <p>Destination:</p>
                            <span>{cowalk.goTo}</span>
                        </div>
                    </div>
                    <p>Heure de départ:{cowalk.startTime.match(/[\d]{2}:[\d]{2}/g)}</p>
                </div>
                <div className='cowalkingCardFooter'>
                    <div className='cowalkingCardCount'>
                        <figure>
                            <img src={ImageProfil} alt="profil" />
                        </figure>
                        <ul>
                            <li><span>+3</span></li>
                        </ul>
                        
                    </div>
                    <div className='cowalkingCardButtons'>
                        <ButtonRound aria-label="delete" onClick={(e) => { 
                            e.preventDefault();
                            console.log('onClick'); }}>
                            <DeleteIcon/>
                        </ButtonRound>
                        <ButtonRound aria-label="edit" onClick={(e) => { 
                            e.preventDefault();
                            console.log('onClick2'); }}>
                            <EditIcon/>
                        </ButtonRound>
                    </div>
                </div>
            </li>
        </Link>
    ) 
}


export default CowalkingCard