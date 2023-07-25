import icons from '../icons';

const Header =({client, orderNumber = 'XX', orderButton}) => {

    client = client.toUpperCase();
    return (
    <div className='App-header'>
        <img src={icons.wendys} className="App-logo" alt="logo" />
        <div className='d-flex align-items-center'>
            <img src={icons.client} className="App-logo" alt="logo" />
            <p className='fs-3'>{client}</p>
        </div>
        <div className='d-flex align-items-center'>
            <img src={icons.bag} className="App-logo" alt="logo" />
            <p className='fs-2'>ORDEN {orderNumber}</p>
            <button 
            hidden
            onClick={
                () => {
                    orderButton();
                }
            }>click</button>
        </div>
        
    </div>
    )


}



export default Header;