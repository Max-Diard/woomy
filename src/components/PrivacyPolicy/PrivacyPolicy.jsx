// IMPORT FIREBASE
import {useAuth} from "../../contexts/AuthContext";

// IMPORT COMPONENT
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function PrivacyPolicy () {

    const {currentUser} = useAuth();


    return (

        <div>
            {currentUser && <Header />}
            <h1>Politique de confidentialit√©</h1>
                    <p></p>
            {currentUser && <Footer/>}
        </div>
    );
}