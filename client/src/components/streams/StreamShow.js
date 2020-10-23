import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = props => {
  const videoRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    props.fetchStream(props.match.params.id);

    return () => playerRef.current.destroy();
  }, []);

  useEffect(() => {
    buildPlayer();
  }, [props.stream]);

  const buildPlayer = () => {
    if (playerRef.current || !props.stream) {
      return;
    }
    const { id } = props.match.params;

    playerRef.current = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });

    playerRef.current.attachMediaElement(videoRef.current);
    playerRef.current.load();
  };

  const renderShow = () => {
    if (!props.stream) {
      return <div>...Loading</div>;
    }

    const { title, description } = props.stream;

    return (
      <div>
        <video ref={videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  };

  return <div>{renderShow()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
