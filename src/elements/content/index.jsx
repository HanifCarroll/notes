import React from "react";

export class Content extends React.Component {
  render() {
    const {
      containerClassName,
      contentClassName,
      content,
      onClick
    } = this.props;

    return (
      <div className={containerClassName} onClick={onClick}>
        <p className={contentClassName}>{content}</p>
      </div>
    );
  }
}
