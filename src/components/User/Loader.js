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
        {/* <BoxesLoader
        boxColor={"#6366F1"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      /> */}
        {/* <ScatterBoxLoader primaryColor={"#6366F1"} background={"#6366F1"} /> */}
      </div>
    </>
  );
};
export default ScatterBoxLoaderComponent;
