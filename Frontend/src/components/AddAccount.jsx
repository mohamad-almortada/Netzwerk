import Navi from "./subcomponents/Navi"
import MainForm from './subcomponents/Form/MainForm'
import {Container} from 'react-bootstrap';

const AddAccount = () => {
    return ( <>
    <Navi currentActive={"add-account"}/>
    <Container>

        <MainForm />

    </Container>


    </> );
}
 
export default AddAccount;