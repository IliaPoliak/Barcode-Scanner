import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Item = () => {
  const { isbn } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${isbn}.json`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col text-center">
      <Link
        className="text-white bg-green-600 px-5 py-3 m-5 rounded-3xl font-bold  hover:bg-green-700  active:shadow-2xl"
        to="/scan"
      >
        Scan Another Item
      </Link>

      {loading && !error && !data && <div>Loading...</div>}

      {error && !loading && !data && <div>Error: {error}</div>}

      {!data && !loading && !error && <div>No data</div>}

      {data && !loading && !error && (
        <div>
          <p>{data.product.brands}</p>
          <p>{data.product.product_name}</p>
          <p>
            {data.product.product_quantity} {data.product.product_quantity_unit}
          </p>

          <img src={data.product.image_url}></img>

          <p className="font-bold">Nutriments per 100g</p>
          <p>
            Carbohydrates: {data.product.nutriments.carbohydrates_100g}{" "}
            {data.product.nutriments.carbohydrates_unit}
          </p>
          <p>
            Energy: {data.product.nutriments["energy-kcal_100g"]}{" "}
            {data.product.nutriments["energy-kcal_unit"]}
          </p>
          <p>
            Fat: {data.product.nutriments.fat_100g}{" "}
            {data.product.nutriments.fat_unit}
          </p>
          <p>
            Fiber: {data.product.nutriments.fiber_100g}{" "}
            {data.product.nutriments.fiber_unit}
          </p>
          <p>
            Proteins: {data.product.nutriments.proteins_100g}{" "}
            {data.product.nutriments.proteins_unit}
          </p>
          <p>
            Salt: {data.product.nutriments.salt_100g}{" "}
            {data.product.nutriments.salt_unit}
          </p>
          <p>
            Saturated Fat: {data.product.nutriments["saturated-fat_100g"]}{" "}
            {data.product.nutriments["saturated-fat_unit"]}
          </p>
          <p>
            Sodium: {data.product.nutriments.sodium_100g}{" "}
            {data.product.nutriments.sodium_unit}
          </p>
          <p>
            Sugars: {data.product.nutriments.sugars_100g}{" "}
            {data.product.nutriments.sugars_unit}
          </p>

          <p className="font-bold">Ingredients:</p>
          <p>
            {data.product.ingredients_hierarchy.map((element) => {
              return <p>{element}</p>;
            })}
          </p>

          <p className="font-bold">Alergens:</p>
          <p>
            {data.product.allergens_hierarchy.map((element) => {
              return <p>{element}</p>;
            })}
          </p>

          <p className="font-bold">Tags:</p>
          <p>
            {data.product.ingredients_analysis_tags.map((element) => {
              return <p>{element}</p>;
            })}
          </p>
        </div>
      )}
    </div>
  );
};
export default Item;
