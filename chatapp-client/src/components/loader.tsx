import { BeatLoader } from "react-spinners";
import "../css/loader.css";

export const Loader = () => {
  return (
    <div className="loader">
      <BeatLoader
        loading
        color="#38d6b7"
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
};
