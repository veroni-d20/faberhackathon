import { useState, useRef } from "react";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "./scss/style.scss";
import { MdOutlineCancel } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
// import IconButton from "@mui/material/IconButton";

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function App() {
  //   const blockchain = useSelector((state) => state.blockchain);
  //   console.log(blockchain);
  // const [ID_ProofFile, setID_ProofFile] = useState(null);
  // const [marksheetFile, setMarksheetFile] = useState(null);
  const [inputLogo, setInputLogo] = useState([{ name: "", url: "" }]);
  function addInput() {
    const values = [...inputLogo];
    values.push({ name: "", url: "" });
    setInputLogo(values);
  }
  function removeInput(i) {
    const values = [...inputLogo];
    values.splice(i, 1);
    setInputLogo(values);
  }
  function handleLogoChange(i, event) {
    const values = [...inputLogo];
    values[i].question = event.target.value;
    setInputLogo(values);
  }
  function handleFileChange(i, event) {
    const values = [...inputLogo];
    values[i].file = event.target.files[0];
    setInputLogo(values);
    // setFile((prev) => [...prev, event.target.files[0]]);
  }

  const [ID_ProofUrl, setID_ProofUrl] = useState("/aadhar-placeholder.jpg");
  const [marksheetUrl, setMarksheetUrl] = useState(
    "/marksheet-placeholder.jpg"
  );
  const [profilePicUrl, setProfilePicUrl] = useState("/avatar.png");
  // const [urlArr, setUrlArr] = useState([]);
  const [guidlinesValue, setGuidlinesValue] = useState("");
  let history = useHistory();

  const orgNameInputRef = useRef();
  const orgOverviewInputRef = useRef();
  const pronounciationInputRef = useRef();
  const orgDescriptionInputRef = useRef();
  const dosInputRef = useRef();
  const dontsInputRef = useRef();
  const fontsInputRef = useRef();

  async function retrieveMarksheet(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setMarksheetUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveID_Proof(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setID_ProofUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveProfilePic(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfilePicUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createstudent() {
    var organisationName = orgNameInputRef.current.value;
    var organisationOverview = orgOverviewInputRef.current.value;
    var pronounciation = pronounciationInputRef.current.value;
    var organisationDescription = orgDescriptionInputRef.current.value;

    console.log(ID_ProofUrl);
    console.log(marksheetUrl);
    console.log(profilePicUrl);

    // const receipt = await blockchain.contract.methods
    //   .addStudentInfo(
    //     organisationName,
    //     organisationOverview,
    //     pronounciation,
    //     organisationDescription,
    //     ID_ProofUrl,
    //     marksheetUrl,
    //     profilePicUrl
    //   )
    //   .send({
    //     from: blockchain.account,
    //   });
    // console.log(receipt);
    history.push("/student");

    // Call API to create brand
  }

  return (
    <section className="pt-2">
      <div className="text-dark container" style={{ paddingTop: "150px" }}>
        <div className="mb-5 d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Create Brand</h1>
        </div>
        <section className="pb-5 mb-5">
          <form>
            <div className="form-group  my-4">
              <label htmlFor="inputName" className="text-dark">
                Organisation Name
              </label>
              <input
                ref={orgNameInputRef}
                type="text"
                style={{ width: "100%" }}
                className="p-3 d-flex bg-dark col-md-6 text-white  rounded focus-none"
                id="inputName"
                placeholder="Organisation Name - Eg. Netflix"
              />
            </div>

            <div className="form-group  my-4">
              <label htmlFor="inputDescription" className="text-dark">
                Organisation description
              </label>
              <input
                ref={orgDescriptionInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white  rounded focus-none"}
                style={{ width: "100%" }}
                id="inputDescription"
                placeholder="Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
              />
            </div>

            <div className="form-group  my-4">
              <label htmlFor="inputOverview" className="text-dark">
                Brand Overview
              </label>
              <input
                ref={orgOverviewInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white rounded focus-none"}
                style={{ width: "100%" }}
                id="inputOverview"
                placeholder="Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
              />
            </div>
            <div className="">
              <label htmlFor="inputOverview" className="text-dark">
                General Guidlines
              </label>
              <MDEditor
                height={200}
                value={guidlinesValue}
                onChange={setGuidlinesValue}
              />
              <MDEditor.Markdown
                source={guidlinesValue}
                linkTarget="_blank"
                // previewOptions={{
                //   linkTarget: "_blank"
                // }}
              />
            </div>
            <div className="form-group  my-4">
              <label htmlFor="inputPronounciation" className="text-dark">
                Pronounciation
              </label>
              <input
                ref={pronounciationInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white  rounded focus-none"}
                style={{ width: "100%" }}
                id="inputPronounciation"
                placeholder="li-cet patt-ar-ee"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputLogo" className="form-label fs-5 my-4 ">
                Logo
              </label>
              <div className="d-inline-block">
                <button
                  sx={{ color: "#182340" }}
                  aria-label="add"
                  component="span"
                  onClick={addInput}
                >
                  <CgAdd sx={{ width: "40px", height: "40px" }} />
                </button>
              </div>
              {inputLogo.map((input, index) => (
                <div key={index}>
                  <div className="d-flex">
                    {index > 0 && (
                      <div className="my-md-2">
                        <button
                          onClick={() => removeInput(index)}
                          className=""
                          sx={{ color: "#ec523e" }}
                          aria-label="cancel"
                          component="span"
                        >
                          <MdOutlineCancel
                            sx={{ width: "40px", height: "40px" }}
                          />
                        </button>
                      </div>
                    )}
                    <input
                      type="text"
                      className="form-control mb-2 p-2 "
                      placeholder="Logo"
                      value={input.name ? input.name : ""}
                      onChange={(e) => {
                        handleLogoChange(index, e);
                      }}
                    />
                  </div>
                  <input
                    className="form-control p-2 mb-3 "
                    type="file"
                    id="logoFile"
                    onChange={(e) => {
                      handleFileChange(index, e);
                    }}
                  />
                </div>
              ))}
            </div>
          </form>
          <div className="form-group  my-4">
              <label htmlFor="inputDos" className="text-dark">
                Do's
              </label>
              <input
                ref={dosInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white  rounded focus-none"}
                style={{ width: "100%" }}
                id="inputDos"
                placeholder="Do's"
              />
          </div>
          <div className="form-group  my-4">
              <label htmlFor="inputDonts" className="text-dark">
                Dont's
              </label>
              <input
                ref={dontsInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white  rounded focus-none"}
                style={{ width: "100%" }}
                id="inputDonts"
                placeholder="Dont's"
              />
          </div>
          <div className="form-group  my-4">
              <label htmlFor="inputFonts" className="text-dark">
                Fonts
              </label>
              <input
                ref={fontsInputRef}
                type="text"
                className={"p-3 d-flex bg-dark  text-white  rounded focus-none"}
                style={{ width: "100%" }}
                id="inputFonts"
                placeholder="Fonts"
              />
          </div>
          <hr />

          <div
            onClick={() => createstudent()}
            className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
          >
            Create Brand ✅
          </div>
        </section>
      </div>
    </section>
  );
}
