import { CircleLoader } from "react-awesome-loaders";
import "./Loader.css";
import Particles from "react-particles-js";
import { particles } from "../../Assets/particlesjs-config";
const ScatterBoxLoaderComponent = () => {
  return (
    <>
      <Particles params={particles} className="particles" />
      <div className="loader-container">
        <CircleLoader
          meshColor={"#25bfb6"}
          lightColor={"#25bfb6"}
          duration={1.5}
          desktopSize={"90px"}
          mobileSize={"64px"}
        />
      </div>
    </>
  );
};
export default ScatterBoxLoaderComponent;
