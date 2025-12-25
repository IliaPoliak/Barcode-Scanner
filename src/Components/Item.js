import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleDroplet,
  faCheese,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

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

  const validateAlergens = (alergen) => {
    if (alergen.substring(0, 3) === "en:") {
      return alergen.substring(3, 4).toUpperCase() + alergen.substring(4);
    }

    return alergen; // Default
  };

  const validateTag = (tag) => {
    // Palm Oil
    if (tag.includes("palm-oil")) {
      if (tag === "en:palm-oil-free") {
        return (
          <span className="text-green-500">
            <FontAwesomeIcon icon={faBottleDroplet} />
            Palm Oil Free
          </span>
        );
      } else if (tag === "en:palm-oil") {
        return (
          <span className="text-red-500">
            <FontAwesomeIcon icon={faBottleDroplet} />
            Palm Oil
          </span>
        );
      } else if (tag === "en:may-contain-palm-oil") {
        return (
          <span className="text-yellow-500">
            <FontAwesomeIcon icon={faBottleDroplet} />
            May Contain Palm Oil
          </span>
        );
      } else if (tag === "en:palm-oil-content-unknown") {
        return (
          <span className="text-black text-sm">
            <FontAwesomeIcon icon={faBottleDroplet} className="text-base" />
            Palm Oil Content Unknown
          </span>
        );
      }
    }
    // Vegan
    else if (tag.includes("vegan")) {
      if (tag === "en:vegan") {
        return (
          <span className="text-green-500">
            <FontAwesomeIcon icon={faLeaf} />
            Vegan
          </span>
        );
      } else if (tag === "en:maybe-vegan") {
        return (
          <span className="text-yellow-500">
            <FontAwesomeIcon icon={faLeaf} />
            Maybe Vegan
          </span>
        );
      } else if (tag === "en:non-vegan") {
        return (
          <span className="text-red-500">
            <FontAwesomeIcon icon={faLeaf} />
            Non Vegan
          </span>
        );
      } else if (tag === "en:vegan-status-unknown") {
        return (
          <span className="text-black">
            <FontAwesomeIcon icon={faLeaf} />
            Vegan Status Unknown
          </span>
        );
      }
    }
    // Vegeterian
    else if (tag.includes("vegetarian")) {
      if (tag === "en:vegetarian") {
        return (
          <span className="text-green-500">
            <FontAwesomeIcon icon={faCheese} />
            Vegetarian
          </span>
        );
      } else if (tag === "en:vegetarian-status-unknown") {
        return (
          <span className="text-black text-sm">
            <FontAwesomeIcon icon={faCheese} className="text-base" />
            Vegetarian Status Unknown
          </span>
        );
      } else if (tag === "en:maybe-vegetarian") {
        return (
          <span className="text-yellow-500">
            <FontAwesomeIcon icon={faCheese} />
            Maybe Vegetarian
          </span>
        );
      } else if (tag === "en:non-vegetarian") {
        return (
          <span className="text-red-500">
            <FontAwesomeIcon icon={faCheese} />
            Non Vegetarian
          </span>
        );
      }
    }

    return <span className="text-gray-500">{tag}</span>; // Default
  };

  return (
    <div className="flex items-center justify-center text-center pt-8 pb-[calc(10vh+8px)]">
      {/* Button */}
      <Link className="green-btn" to="/scan">
        Scan Another Item
      </Link>

      {/* Disapear content behind the button */}
      <div className="bottom-[calc(3vh+48px)] h-[24px] bg-gradient-to-t from-white to-transparent w-full fixed z-10"></div>
      <div className="bottom-0 h-[calc(3vh+48px)] bg-white w-full fixed z-10"></div>

      {/* Loading */}
      {loading && !error && !data && (
        <h1 className="no-item-message">Loading...</h1>
      )}

      {/* Error */}
      {error && !loading && !data && (
        <h1 className="no-item-message">Error: {error}</h1>
      )}

      {/* No Data */}
      {(!data || data.status_verbose === "product not found") &&
        !loading &&
        !error && <h1 className="no-item-message">No data</h1>}

      {/* Data */}
      {data &&
        data.status_verbose === "product found" &&
        !loading &&
        !error && (
          <div className="flex items-center justify-center flex-col">
            {/* Brand */}
            <h1 className="font-bold text-3xl mb-1">{data.product.brands}</h1>

            {/* Product Name */}
            <h2 className="font-bold text-xl mb-1">
              {data.product.product_name}
            </h2>

            {/* Quantity */}
            <p className="mb-2">
              {data.product.product_quantity &&
                Number(data.product.product_quantity).toFixed(0)}{" "}
              {data.product.product_quantity_unit}
            </p>

            {/* Product Photo */}
            <div className="relative w-52 h-52 rounded-lg overflow-hidden">
              <img
                src={data.product.image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                aria-hidden="true"
              />

              <img
                src={data.product.image_url}
                alt="Product"
                className="relative z-10 w-full h-full object-contain"
              />
            </div>

            {/* Tags */}
            <p className="card-name">Tags:</p>

            <hr className="hr" />

            {data.product.ingredients_analysis_tags &&
            data.product.ingredients_analysis_tags.length > 0 ? (
              <p className="card font-bold">
                {data.product.ingredients_analysis_tags.map((element) => {
                  return <p>{validateTag(element)}</p>;
                })}
              </p>
            ) : (
              <p className="card">No data found</p>
            )}

            {/* Alergens */}
            <p className="card-name">Alergens:</p>

            <hr className="hr" />

            {!data.product.allergens_hierarchy ? (
              <p className="card">No data found</p>
            ) : data.product.allergens_hierarchy.length === 0 ? (
              <p className="card">No alergens found</p>
            ) : (
              <p className="card">
                {data.product.allergens_hierarchy.map((element) => {
                  return <p>{validateAlergens(element)}</p>;
                })}
              </p>
            )}

            {/* Nutriments */}
            <p className="card-name">
              Nutriments per {data.product.nutrition_data_prepared_per}
            </p>

            <div className="flex flex-col mb-10 w-52 border-t border-black">
              {/* Energy (kcal) */}
              {data.product.nutriments["energy-kcal_100g"] !== undefined &&
                data.product.nutriments["energy-kcal_unit"] !== undefined && (
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
                  <div className="nutriment">
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
          </div>
        )}
    </div>
  );
};

export default Item;
