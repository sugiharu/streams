import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
import { fetchStream, editStream } from "../../actions";

const StreamEdit = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const onSubmit = formValues => {
    props.editStream(props.match.params.id, formValues);
  };

  const renderStream = () => {
    if (!props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={onSubmit}
          initialValues={_.pick(props.stream, "title", "description")}
        />
      </div>
    );
  };

  return renderStream();
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);
