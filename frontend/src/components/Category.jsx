import daves from '../daves_x1.png'

function Category({id, name, image = daves, handleClick}){

    name = name.toUpperCase();
    return (
        <div className="img-wrap"
        onClick={() => {
            handleClick(id);
          }}>
            <img src={image} className="img"></img>
            <h1 className='h5'>{name}</h1>
        </div>
    )
}

export default Category;