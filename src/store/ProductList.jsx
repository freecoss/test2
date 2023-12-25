import React, { useEffect, useState } from 'react'
import Product from './Product'
export default function ProductList() {
    const [productList,setProductList] = useState([])
    const [productCategorie,setproductCategorie] = useState([])
    const [searchInput,setSearchInput] = useState('')
    const [currentCategory, setCurrentCategory] = useState()
    
    const getProducts= () => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(response => setProductList(response))
    }

    const getCategories= () => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(response => setproductCategorie(response))
    }

    useEffect(() =>{
        getProducts()
        getCategories()
    },[])

    const displayProducts = () => {
        let productListFilterd = productList
        if (searchInput !== undefined) {
            productListFilterd = productList.filter(product => {
                return product.title.toUpperCase().includes(searchInput.toUpperCase())
            })            
        }


        if(currentCategory!==undefined) {
            productListFilterd = productListFilterd.filter(product =>{
                return product.category ===currentCategory
            })
        }

        if (productListFilterd.length > 0) {
            return productListFilterd.map((product, productKey) => (
                <Product product={product} key={productKey} />
            ));
        } else {
            return (
                <tr>
                    <td colSpan={7}>no items found</td>
                </tr>
            );
        }
    };
    
    const displayCategories = () => {
        return productCategorie.map(categorie =>
                <button
                    className={'btn ' + (currentCategory === categorie ? 'btn-dark' : 'btn-secondary')}
                    onClick={(e) => {
                        e.preventDefault()
                        setCurrentCategory(categorie)
                    }}
                >
                    {categorie}
                </button>
        )
    }

    const handleSearchInput = (e) => {
        e.preventDefault()
        setSearchInput(document.querySelector('#search').value)
    }
  return (
    <div className='container-fluix mx-auto w-75 my-3'>
        <h2 style={{textAlign:'left'}}>Search:</h2>
        <div className="form-group d-flex align-items-center">
            <label>Search</label>
            <input type="text" id="search" className="form-control mx-2 w-25"  />
            <input type="submit" value="Search" className="btn btn-primary" onClick={handleSearchInput}/>
        </div>
        <hr />
        <h2 style={{textAlign:'left'}}>categories:</h2>
        <div className="btn-group form-group d-flex align-items-center">
            {displayCategories()}
        </div>
        <hr />
        <h1>Products:</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {displayProducts()}
            </tbody>
        </table>
    </div>
  )
}
