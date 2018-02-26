import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import  {Jumbotron, Button, Carousel, PageHeader, Image, Panel, Grid , Row, Col} from 'react-bootstrap';
import playground1 from '../images/playground1.jpg';
import playground2 from '../images/playgrounds.jpg';
import playground3 from '../images/playground3.jpeg';
import logo from '../images/logo.png';

const HomePage = () => {
  return (
    <Route
        render={() => {
      return (

<div>

<Block
marginTop={60}
marginLeft="auto"
marginRight="auto"
align="center"
>

<Grid>
<Row>
<Col xs={9} md={4}>

</Col>
<Col xs={9} md={4}>
<Image src={logo} thumbnail />
</Col>
<Col xs={6} md={4}>

</Col>
</Row>
</Grid>;

</Block>

        <Block
          marginTop="auto"
          color="#FF6347"
          backgroundColor = "#F5F5DC"
            textAlign= "center"
            borderRadius={400}
            backgroundSize="contain"
            fontStyle="italic"
            marginRight={150}
            marginLeft={100}


                          >
          <Navigation />


          <PageHeader>
          PLAYGROUND... <small>Kids do not remember their best day of television!!!</small>
          </PageHeader>

</Block>



<Block
marginBot= {150}
textAlign= "center"



                 >
            <Carousel>
  <Carousel.Item >
    <img width={1200} height={700}  src={playground1} />
    <Carousel.Caption>
      <h3>Κάντε κράτηση τώρα!</h3>
      <p>Αγοράστε εισιτήριο για την δραστηριότητα που ενδιαφέρει εσάς και τα παιδιά σας!</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={1100} height={50}  src={playground2} />
    <Carousel.Caption>
      <h3>Διευρύνετε τους ορίζοντές τους!</h3>
      <p>Επιλέξτε δραστηριότητες που αναπτύσσουν πληθώρα δεξιοτήτων των παιδιών σας! </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={1100} height={50} src={playground3} />
    <Carousel.Caption>
      <h3>Επικοινωνήστε μαζί μας!</h3>
      <p>Τόσο εμείς όσο και οι πάροχοι των υπηρεσιών είμαστε στη διάθεσή σας ανα πάσα στιγμή!</p>
    </Carousel.Caption>
  </Carousel.Item>
      </Carousel>




       </Block>

<Block
  textAlign= "center">
        <Panel>

  <Panel.Footer>Evil Corp ©   Copyright 2018    </Panel.Footer>
</Panel>
  </Block>


</div>

      );
    }}
    />
  );
};

export default HomePage;
