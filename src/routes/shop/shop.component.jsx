import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';
const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  console.log('categories',categoriesMap)
  return (
    <Fragment>
      {
      Object.keys(categoriesMap).map(category => (
        <Fragment>
          <h2>{category}</h2>
          <div className="products-container">
            {
              categoriesMap[category].map((product,idx) => {
                if(idx < 4) return <ProductCard key={product.id} product={product} />
              })
            }
            </div>
        </Fragment>
      ))
      }
    </Fragment>
  )
}

export default Shop