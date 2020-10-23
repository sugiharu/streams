import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = props => {
  const refAuth = useRef();
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "390117598419-lp36h0d2nf19nn2uep2qros1kinhp281.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          refAuth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(refAuth.current.isSignedIn.get());
          refAuth.current.isSignedIn.listen(() =>
            onAuthChange(refAuth.current.isSignedIn.get())
          );
        });
    });
  }, []);

  const onAuthChange = isSignedIn => {
    if (isSignedIn) {
      props.signIn(refAuth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignOutClick = () => {
    refAuth.current.signOut();
  };

  const onSignInClick = () => {
    refAuth.current.signIn();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
