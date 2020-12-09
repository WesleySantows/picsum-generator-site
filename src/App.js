import React, { useState } from "react";
import download from "downloadjs";
import "./index.scss";

function Generator() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [error, setError] = useState("");

  const submitValue = async () => {
    if (width && height) {
      setError(false);
      setLoading(true);
      const response = await fetch(`https://picsum.photos/${width}/${height}`);
      setUrlImage(response.url);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="container fadeInDown">
        <h1 className="title">Picsum Generator</h1>
      </div>

      <div className="wrapper fadeInDown">
        <div className={urlImage ? "active" : ""} id="formContent">
          <input
            className={error ? "error" : "fadeIn second"}
            type=""
            id="width"
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
            required
          />
          <input
            type=""
            id="height"
            className={error ? "error" : "fadeIn second"}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
            required
          />
          <input
            type="submit"
            onClick={submitValue}
            id="button"
            className="fadeIn fourth unit"
            value={urlImage ? "Regenerate" : "Generate image "}
          />

          {loading && (
            <div id="loading">
              <div className="loading-content">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          )}

        </div>

        {urlImage && (
          <div className="active" id="image-rendered">
            <div className="download" onClick={() => download(urlImage)}>
              <svg
                className="icon-download"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 477.867 477.867"
              >
                <path d="M409.6 153.6h-85.333c-9.426 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067H409.6c9.426 0 17.067 7.641 17.067 17.067v221.867c0 9.426-7.641 17.067-17.067 17.067H68.267c-9.426 0-17.067-7.641-17.067-17.067V204.8c0-9.426 7.641-17.067 17.067-17.067H153.6c9.426 0 17.067-7.641 17.067-17.067S163.026 153.6 153.6 153.6H68.267c-28.277 0-51.2 22.923-51.2 51.2v221.867c0 28.277 22.923 51.2 51.2 51.2H409.6c28.277 0 51.2-22.923 51.2-51.2V204.8c0-28.277-22.923-51.2-51.2-51.2z" />
                <path d="M335.947 243.934c-6.614-6.387-17.099-6.387-23.712 0L256 300.134V17.067C256 7.641 248.359 0 238.933 0s-17.067 7.641-17.067 17.067v283.068l-56.201-56.201c-6.78-6.548-17.584-6.361-24.132.419-6.388 6.614-6.388 17.1 0 23.713l85.333 85.333c6.657 6.673 17.463 6.687 24.136.03l.031-.03 85.333-85.333c6.549-6.78 6.361-17.584-.419-24.132z" />
              </svg>
              <img onLoad={() => setLoading(false)} src={urlImage} alt="" />
            </div>
          </div>
        )}

        {urlImage && (
          <div className="link">
            <a className="link_new-tab" target="_blank" rel="noopener noreferrer" href={urlImage}>
              Open image a new tab
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Generator;
