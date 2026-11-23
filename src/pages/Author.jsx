import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { AuthorSkeleton } from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
        );
        setAuthor(response.data);
        setFollowers(response.data.followers || 0);
      } catch (err) {
        console.error("Failed to fetch author", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
    setFollowers((prev) => (following ? prev - 1 : prev + 1));
  };

  if (loading) {
    return <AuthorSkeleton />;
  }

  if (!author) {
    return <div className="container text-center mt-5">Author not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followers} followers
                      </div>
                      <button className="btn-main" onClick={handleFollow}>
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author.nftCollection || []} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
