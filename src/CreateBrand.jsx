import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { MdOutlineCancel } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { create } from "ipfs-http-client";
import { IconButton, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// const client = create("https://ipfs.infura.io:5001/api/v0");

const Input = styled("input")({
  display: "none",
});

export default function CreateBrand() {
  const history = useHistory();
  const [inputLogo, setInputLogo] = useState({
    name: "",
    url: "",
    otherVariation: [],
  });
  const [guidlinesValue, setGuidlinesValue] = useState("");

  function addInput() {
    const values = { ...inputLogo };
    console.log(values);
    values.otherVariation.push({ name: "", url: "" });
    setInputLogo(values);
    console.log(inputLogo);
  }
  function removeInput(i) {
    const values = { ...inputLogo };
    values.otherVariation.splice(i, 1);
    setInputLogo(values);
  }
  function handleLogoChange(i, event) {
    const values = { ...inputLogo };
    values.otherVariation[i].name = event.target.value;
    setInputLogo(values);
  }
  function handleFileChange(i, event) {
    const values = { ...inputLogo };
    values.otherVariation[i].url = event.target.files[0];
    setInputLogo(values);
  }

  const orgNameInputRef = useRef();
  const orgOverviewInputRef = useRef();
  const pronounciationInputRef = useRef();
  const orgDescriptionInputRef = useRef();

  async function createstudent() {
    var organisationName = orgNameInputRef.current.value;
    var organisationOverview = orgOverviewInputRef.current.value;
    var pronounciation = pronounciationInputRef.current.value;
    var organisationDescription = orgDescriptionInputRef.current.value;

    // console.log(ID_ProofUrl);
    // console.log(marksheetUrl);
    // console.log(profilePicUrl);

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
    // history.push("/student");

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
                onChange={() => setGuidlinesValue(guidlinesValue)}
              />
              <MDEditor.Markdown source={guidlinesValue} />
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
                <IconButton
                  sx={{ color: "#182340" }}
                  aria-label="add"
                  component="span"
                  onClick={addInput}
                >
                  <CgAdd sx={{ width: "40px", height: "40px" }} />
                </IconButton>
              </div>

              <div className="w-100">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Logo Name"
                    aria-label="Logo Name"
                    aria-describedby="button-addon2"
                    value={inputLogo.name}
                    onChange={(e) => {
                      const values = { ...inputLogo };
                      values.name = e.target.value;
                      setInputLogo(values);
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => {
                        const values = { ...inputLogo };
                        values.url = e.target.files[0];
                        setInputLogo(values);
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </div>
              </div>

              {inputLogo.otherVariation.length > 0 &&
                inputLogo.otherVariation.map((input, index) => (
                  <div
                    key={`${input}-${index}`}
                    className={`${index > 0 && "mt-2"}`}
                  >
                    <div className="d-flex">
                      <div className="">
                        <IconButton
                          onClick={() => removeInput(index)}
                          className="mt-0"
                          sx={{ color: "#ec523e" }}
                          aria-label="cancel"
                          component="span"
                        >
                          <MdOutlineCancel
                            sx={{ width: "40px", height: "40px" }}
                          />
                        </IconButton>
                      </div>

                      <div className="w-100">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Logo Name"
                            aria-label="Logo Name"
                            aria-describedby="button-addon2"
                            value={input.name}
                            onChange={(e) => {
                              handleLogoChange(index, e);
                            }}
                          />
                          <label htmlFor={`contained-button-file-${index}`}>
                            <Input
                              accept="image/*"
                              id={`contained-button-file-${index}`}
                              multiple
                              type="file"
                              onChange={(e) => {
                                handleFileChange(index, e);
                              }}
                            />
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <label htmlFor="exampleColorInput" className="form-label">
              Color picker
            </label>
            <input
              type="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              value="#563d7c"
              title="Choose your color"
            ></input>
          </form>

          <hr />

          <div
            // onClick={createstudent}
            className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
          >
            Create Brand ✅
          </div>
        </section>
      </div>
    </section>
  );
}
