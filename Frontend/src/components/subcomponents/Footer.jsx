import "../../App.css";
import {Container, Row, Col} from 'react-bootstrap';

const Footer = ({furtherDetials, datenschutz, impressum}) => {
    return ( <>
 
<div className="main-footer">


    <Container className="main-footer">
        <Row>
            <Col xs={12} lg={6} className="mt-1">

                <h3>Netzwerk der Chemieunterricht</h3>
                <ul className="list-unstyled footer-about-us">
                    <li>Über uns</li>
                    <li>Kontak</li>
                </ul>
            </Col>


            <Col xs={12} lg={6} className="mt-1">
                <h3>Weitere Links</h3>
                <ul className="footer-links">
                    <li> <a href="https://chemiedidaktik.uni-wuppertal.de/">Didkatik der Chemie</a></li>
                    <li> <a href="https://uni-wuppertal.de">Uni Wuppertal</a> </li>
                </ul>
            </Col>
        </Row>
        <hr />
      <Row>
          <div className="footer-further">
              { furtherDetials && <div className="row">
                  <p style={{alignContent: 'center'}}>
                      {furtherDetials}
                    </p>
                </div>}
              &copy; 2022 { new Date().getFullYear() !== 2022 && "- "  }
              { new Date().getFullYear() !== 2022 && new Date().getFullYear()  } 
              | <a className="footer-further" href={datenschutz}>Datenschutz</a> | <a className="footer-further" href={impressum}>Impressum</a> 
          </div>
      </Row>
        
            
        
</Container> 

</div>


    </> );
}
 
export default Footer;