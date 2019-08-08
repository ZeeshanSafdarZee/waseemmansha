/** @jsx jsx */
import * as React from "react";
import { jsx } from "theme-ui";
import Img from "gatsby-image";
import { Lightbox } from "react-modal-image";
import Grid from "./Grid";
import Tile from "./Tile";

const imgStyles: any = {
  css: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.5s, filter 0.25s",
    "&:hover": {
      transform: "scale(1.1)",
      filter: "saturate(1.3)",
    },
    border: '1px solid rgba(0,0,0,0.4)'
  },
};

const Gallery = ({galleryImages}) => {
  const images = galleryImages;
  const [showImageIndex, setShowImageIndex] = React.useState<number | undefined>(undefined);

  return (
    <div>
      <Grid>
        {images.map((image, index) => (
          <Tile
            key={image.id}
            onClick={() => {
              setShowImageIndex(index);
            }}
          >
            <Img fluid={image.childImageSharp.fluid} {...imgStyles} />
          </Tile>
        ))}
      </Grid>
      {showImageIndex !== undefined && (
        <Lightbox
          hideDownload={true}
          large={images[showImageIndex].childImageSharp.fluid.src}
          onClose={() => {
            setShowImageIndex(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Gallery;
