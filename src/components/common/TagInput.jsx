import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "../../styles/react-tagsinput.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ tags, setTags, inputFieldPosition }) => {
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <ReactTags
      tags={tags}
      // delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition={inputFieldPosition}
      autocomplete
      placeholder=""
      classNames={{
        tags: "ReactTags__tags",
        tagInput: "ReactTags__tagInput",
        tag: "ReactTags__tag",
        remove: "ReactTags__remove",
      }}
      
    />
  );
};

export default TagInput;
