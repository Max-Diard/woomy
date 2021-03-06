/// ----- Import Components ---- ///
import CowalkingCard from "../CowalkingCard/CowalkingCard";

/// ----- CSS ----- ///
import './cowalkingList.css'

/// ----- React Modules ----- ///
import { useState,useEffect } from 'react';

//FIREBASE
import {database} from '../../firebase'


function CowalkingList () {

    const [cowalks, setCowalks] = useState([])
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        return database.cowalks
            .onSnapshot((querySnapshot) => {
            const tempResults = [];
            querySnapshot.forEach((doc) => {
                tempResults.push(database.formatDoc(doc))
            })
            setPageLoading(false)
            setCowalks(tempResults)
            

        });
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container">

            <ul className='cowalkingList'>

                { pageLoading ? <p>Loading</p> : (cowalks.length > 0 ?

                    cowalks.map((cowalk,index)=><CowalkingCard key={cowalk.id} cowalk={cowalk} index={index} />) : <p>Aucun résultat</p>) }


            </ul>
        </div>
    )
}

export default CowalkingList;