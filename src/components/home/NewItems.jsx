import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../UI/Carousel";
import "./NewItems.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch items.", err);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {/* SKELETON LOADER */}

            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item skeleton">
                  <div className="item-banner skeleton-banner"></div>
                  <div className="item-avatar skeleton-avatar"></div>
                  <h3 className="skeleton-text"></h3>
                  <span className="skeleton-text"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <Carousel>
          {items.map((item) => (
            <div className="nft_coll" key={item.id}>
              <img
                className="collection-banner"
                src={item.nftImage}
                alt=""
              />
              <img
                className="collection-avatar"
                src={item.authorImage}
                alt=""
              />
              <h3>{item.title}</h3>
              <span>ERC-{item.code}</span>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NewItems;
