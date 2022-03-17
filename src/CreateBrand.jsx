import { useState, useRef } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function CreateBrand() {
  //   const blockchain = useSelector((state) => state.blockchain);
  //   console.log(blockchain);
  // const [ID_ProofFile, setID_ProofFile] = useState(null);
  // const [marksheetFile, setMarksheetFile] = useState(null);
  const [ID_ProofUrl, setID_ProofUrl] = useState("/aadhar-placeholder.jpg");
  const [marksheetUrl, setMarksheetUrl] = useState(
    "/marksheet-placeholder.jpg"
  );
  const [profilePicUrl, setProfilePicUrl] = useState("/avatar.png");
  // const [urlArr, setUrlArr] = useState([]);
  let history = useNavigate();

  const orgNameInputRef = useRef();
  const orgOverviewInputRef = useRef();
  const pronounciationInputRef = useRef();
  const orgDescriptionInputRef = useRef();

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

            <div className="d-flex justify-content-start">
              <div className="me-md-4">
                <div>Upload Profile Pic</div>
                <input
                  type="file"
                  className="form-control my-3 bg-dark text-white"
                  name="profilePic"
                  placeholder="Upload Profile Pic"
                  onChange={retrieveProfilePic}
                />
              </div>
              <div className="me-md-4">
                <div>Upload ID_Proof Card</div>
                <input
                  type="file"
                  className="form-control my-3 bg-dark text-white"
                  name="ID_Proof"
                  placeholder="Upload ID_Proof"
                  onChange={retrieveID_Proof}
                />
              </div>

              <div className="me-md-4">
                <div>Upload Marksheet</div>
                <input
                  type="file"
                  className="form-control my-3 bg-dark text-white"
                  name="marksheet"
                  onChange={retrieveMarksheet}
                />
              </div>
            </div>
          </form>

          <hr />

          <div className="d-flex justify-content-between mt-3">
            <div>
              Your uploaded Profile Picture
              <div className="card card-body my-3 me-md-3">
                <img src={profilePicUrl} style={{ height: "300px" }} alt="" />
              </div>
            </div>
            <div>
              Your uploaded ID_Proof image
              <div className="card card-body my-3 me-md-3">
                <img src={ID_ProofUrl} style={{ height: "300px" }} alt="" />
              </div>
            </div>
            <div>
              Your uploaded marksheet image
              <div className="card card-body my-3 me-md-3">
                <img src={marksheetUrl} style={{ height: "300px" }} alt="" />
              </div>
            </div>
          </div>

          <div
            onClick={() => createstudent()}
            className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
          >
            Create Student & Proceed ✅
          </div>
        </section>
      </div>
    </section>
  );
}
