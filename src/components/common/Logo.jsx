import webLogo from "../../assets/images/m.png";
function Logo({ width = "100px" }) {
  return (
    <div className="flex justify-center">
      <img src={webLogo} alt="Logo" style={{ width: width }} />
    </div>
  );
}
export default Logo;
