import React from 'react'
import Rating from './rating'
export default function Product({product}) {
  return (
    <tr>
        <th>{product.id}</th>
        <th>{product.title}</th>
        <th>{product.price}</th>
        <th>{product.description}</th>
        <th>{product.category}</th>
        <th><img width={250} src={product.image} alt={product.title} /></th>
        <th> <Rating rate={product.rating.rate} count={product.rating.count}></Rating></th>

    </tr>
  )
}
