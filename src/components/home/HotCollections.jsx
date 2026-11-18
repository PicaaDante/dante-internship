import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../UI/Carousel";
import { HotCollectionsSkeleton } from "../UI/Skeleton";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (err) {
        setError("Failed to fetch collections.");
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <HotCollectionsSkeleton />
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <Carousel>
          {collections.map((collection) => (
            <div className="nft_coll" key={collection.id}>
              <img
                className="collection-banner"
                src={collection.nftImage}
                alt=""
              />
              <img
                className="collection-avatar"
                src={collection.authorImage}
                alt=""
              />
              <h3>{collection.title}</h3>
              <span>ERC-{collection.code}</span>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HotCollections;
