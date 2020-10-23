import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const actions = () => {
    const id = props.match.params.id;

    return (
      <React.Fragment>
        <button
          onClick={() => props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cansel
        </Link>
      </React.Fragment>
    );
  };

  const content = () => {
    if (!props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title : ${props.stream.title}`;
  };

  const renderDelete = () => {
    return (
      <Modal
        title="Delete a Stream"
        content={content()}
        actions={actions()}
        onDismiss={() => history.push("/")}
      />
    );
  };

  return renderDelete();
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream
})(StreamDelete);
