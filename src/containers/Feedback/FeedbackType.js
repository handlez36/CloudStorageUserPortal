import React from "react";

const FeedbackType = ({ onChange, invalid }) => (
  <div className="form-group">
    <select
      onChange={onChange}
      name="feedbackType"
      className={`custom-select browser-default feedback-type ${invalid ? 'invalid' : ''}`}
      required
    >
      <option value="">Feedback Type</option>
      <option name="bug">Bug</option>
      <option name="feature">Feature</option>
      <option name="improvement">Improvement</option>
      <option name="portal feedback">Feedback</option>
      <option name="other">Other</option>
    </select>
    <label>Please select a feedback option</label>
  </div>
)

export default FeedbackType;
