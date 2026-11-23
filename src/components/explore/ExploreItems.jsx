import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExploreItemsSkeleton } from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

        const response = await axios.get(url);
        setItems(response.data);
        setVisibleCount(8);
      } catch (err) {
        console.error("Failed to fetch explore items", err);
        setError("Failed to load explore items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  if (loading) {
    return (
      <>
        <div>
          <select
            id="filter-items"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <ExploreItemsSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {visibleItems.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up"
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {item.expiryDate && (
              <div className="de_countdown">{timeLeft[item.id] || "..."}</div>
            )}

            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
