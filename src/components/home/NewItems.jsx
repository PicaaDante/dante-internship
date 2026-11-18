import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "../UI/Carousel";
import "./NewItems.css";
import { useParams } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const { id } = useParams();

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
        console.log("NewItems API", response.data);
      } catch (err) {
        console.error("Failed to fetch items.", err);
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const updated = {};

      items.forEach((item) => {
        if (item.expiryDate) {
          const diff = item.expiryDate - now;

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            updated[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            updated[item.id] = "Expired";
          }
        }
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [items]);

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
            <div className="nft__item" key={item.id}>
              <Link to={`/author/${item.authorId}`} className="author_list_pp">
                <img src={item.authorImage} alt="" />
              </Link>

              {/* Countdown */}
              {item.expiryDate && (
                <div className="de_countdown">{timeLeft[item.id] || "..."}</div>
              )}

              <Link
                to={`/item-details/${item.nftId}`}
                className="nft__item_wrap"
              >
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>

              <div className="nft__item_info">
                <h4>{item.title}</h4>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NewItems;
