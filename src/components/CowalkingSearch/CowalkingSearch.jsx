import './cowalkingsearch.css';
import  Select from '@material-ui/core/Select';
import  InputLabel from '@material-ui/core/Inputlabel';
import  MenuItem from '@material-ui/core/MenuItem';
import  TextField from '@material-ui/core/Textfield';


function CoWalkingSearch() {


    return (
      <div className="colwalkingsearch-container">
         <h2>Créer votre itinéraire</h2>
         <form className="searchform">
         <InputLabel className="label">Départ</InputLabel>
            <Select labelId="label" id="select" >
                <MenuItem >Velpeau</MenuItem>
                <MenuItem >SPDC</MenuItem>
            </Select>
            <TextField
                id="time"
                label="Heure du départ"
                type="time"
                />
        </form>
        <div className="separator"></div>
        {/* <ul className='cowalkingList'>
            {
                cowalks.map((cowalk,index)=><CowalkingCard cowalk={cowalk} index={index} />)
            }
        </ul> */}

      </div>
    );
  }

  export default CoWalkingSearch;