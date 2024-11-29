"use client";

import { useFormStatus } from "react-dom";
const { pending } = useFormStatus();

const submitButton = () => {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 rounded-xl p-3"
    >
      {pending ? "Submitting..." : "Submit"}
      Subscribe
    </button>
  );
};

export default submitButton;
