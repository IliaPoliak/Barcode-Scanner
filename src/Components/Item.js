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

      {/* Loading */}
      {loading && !error && !data && <div>Loading...</div>}

      {/* Error */}
      {error && !loading && !data && <div>Error: {error}</div>}

      {/* No Data */}
      {(!data || data.status_verbose === "product not found") &&
        !loading &&
        !error && <div>No data</div>}

      {/* Data */}
      {data &&
        data.status_verbose === "product found" &&
        !loading &&
        !error && (
          <div className="flex items-center justify-center flex-col">
            {/* Brand */}
            <p className="font-bold text-3xl mb-1">{data.product.brands}</p>

            {/* Product Name */}
            <p className="font-bold text-xl mb-1">
              {data.product.product_name}
            </p>

            {/* Quantity */}
            <p className="mb-2">
              {data.product.product_quantity}{" "}
              {data.product.product_quantity_unit}
            </p>

            {/* Product Photo */}
            <img src={data.product.image_url}></img>

            {/* Alergens */}
            <p className="font-bold mt-5">Alergens:</p>
            {!data.product.allergens_hierarchy ? (
              <p>No data found</p>
            ) : data.product.allergens_hierarchy.length === 0 ? (
              <p>No alergens found</p>
            ) : (
              <p>
                {data.product.allergens_hierarchy.map((element) => {
                  return <p>{element}</p>;
                })}
              </p>
            )}

            {/* Tags */}
            <p className="font-bold mt-5">Tags:</p>
            {data.product.ingredients_analysis_tags &&
            data.product.ingredients_analysis_tags.length > 0 ? (
              <p>
                {data.product.ingredients_analysis_tags.map((element) => {
                  return <p>{element}</p>;
                })}
              </p>
            ) : (
              <p>No tags found</p>
            )}

            {/* Nutriments */}
            <p className="font-bold mt-5 text-lg">
              Nutriments per {data.product.nutrition_data_prepared_per}
            </p>

            <div className="flex flex-col mb-10 mt-2 w-52">
              {/* Energy (kcal) */}
              {data.product.nutriments["energy-kcal_100g"] !== undefined &&
                data.product.nutriments["energy-kcal_unit"] !== undefined && (
                  <div className="flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Energy:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments["energy-kcal_100g"].toFixed(1)
                      )}{" "}
                      {data.product.nutriments["energy-kcal_unit"]}
                    </div>
                  </div>
                )}

              {/* Fat */}
              {data.product.nutriments.fat_100g !== undefined &&
                data.product.nutriments.fat_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Fat:</div>
                    <div>
                      {parseFloat(data.product.nutriments.fat_100g.toFixed(1))}{" "}
                      {data.product.nutriments.fat_unit}
                    </div>
                  </div>
                )}

              {/* Saturated Fat */}
              {data.product.nutriments["saturated-fat_100g"] !== undefined &&
                data.product.nutriments["saturated-fat_unit"] !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Saturated Fat:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments["saturated-fat_100g"].toFixed(1)
                      )}{" "}
                      {data.product.nutriments["saturated-fat_unit"]}
                    </div>
                  </div>
                )}

              {/* Carbohydrates */}
              {data.product.nutriments.carbohydrates_100g !== undefined &&
                data.product.nutriments.carbohydrates_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Carbohydrates:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments.carbohydrates_100g.toFixed(1)
                      )}{" "}
                      {data.product.nutriments.carbohydrates_unit}
                    </div>
                  </div>
                )}

              {/* Sugars */}
              {data.product.nutriments.sugars_100g !== undefined &&
                data.product.nutriments.sugars_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Sugars:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments.sugars_100g.toFixed(1)
                      )}{" "}
                      {data.product.nutriments.sugars_unit}
                    </div>
                  </div>
                )}

              {/* Proteins */}
              {data.product.nutriments.proteins_100g !== undefined &&
                data.product.nutriments.proteins_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Proteins:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments.proteins_100g.toFixed(1)
                      )}{" "}
                      {data.product.nutriments.proteins_unit}
                    </div>
                  </div>
                )}

              {/* Fiber */}
              {data.product.nutriments.fiber_100g !== undefined &&
                data.product.nutriments.fiber_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Fiber:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments.fiber_100g.toFixed(1)
                      )}{" "}
                      {data.product.nutriments.fiber_unit}
                    </div>
                  </div>
                )}

              {/* Salt */}
              {data.product.nutriments.salt_100g !== undefined &&
                data.product.nutriments.salt_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Salt:</div>
                    <div>
                      {parseFloat(data.product.nutriments.salt_100g.toFixed(1))}{" "}
                      {data.product.nutriments.salt_unit}
                    </div>
                  </div>
                )}

              {/* Sodium */}
              {data.product.nutriments.sodium_100g !== undefined &&
                data.product.nutriments.sodium_unit !== undefined && (
                  <div className="border-t-0 flex justify-between border border-black px-2 py-1 even:bg-gray-300">
                    <div>Sodium:</div>
                    <div>
                      {parseFloat(
                        data.product.nutriments.sodium_100g.toFixed(1)
                      )}{" "}
                      {data.product.nutriments.sodium_unit}
                    </div>
                  </div>
                )}
            </div>

            {/* Ingredients */}
            {/*<p className="font-bold">Ingredients:</p>
            {data.product.ingredients_hierarchy &&
            data.product.ingredients_hierarchy.length > 0 ? (
              <p>
                {data.product.ingredients_hierarchy.map((element) => {
                  return <p>{element}</p>;
                })}
              </p>
            ) : (
              <p>No ingredients found</p>
            )}*/}
          </div>
        )}
    </div>
  );
};
export default Item;
