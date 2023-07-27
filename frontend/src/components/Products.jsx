import Item from './Item';
import Item2 from './Item2';
import ProductModal from './ProductModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import {getOneProduct} from '../services/productServices';
const bootstrap = require('bootstrap');
const backendURL = 'http://localhost:3001';

const Products =({products, addToOrder}) => {
    let rendered = [];
    let row = [];

    const [productModalShow, setProductModalShow] = useState(false);
    const [productSelected, setProductSelected] = useState(false);
    const [productData, setProductData] = useState([]);


    async function  handleClickedItem(id){
        setProductModalShow(true);
        const productdata = await getOneProduct(id);
        setProductData(productdata);
        console.log(productData);
        setProductSelected(true);
    }

        products.map( product => {
            row.push(
            <Col>
            <Item
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            img={backendURL+product.imagePath}
            onClickCallback={handleClickedItem}
            />
            </Col>
            )
        })
        rendered.push(<Row lg={4}>{row}</Row>);

    return(
        <Container>
            {rendered}
            {productSelected && 
            <ProductModal
                productData={productData}
                show={productModalShow}
                addToOrder={addToOrder}
                onHide={() => {
                    setProductModalShow(false);
                    setProductSelected(false);
                }}
            />}
        </Container>
    )
}

export default Products;