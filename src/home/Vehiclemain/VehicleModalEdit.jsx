import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const VehicleModalEdit = (props) => {
  const [editYear, setEditYear] = useState(props.vehicle.year);
  const [editMake, setEditMake] = useState(props.vehicle.make);
  const [editModel, setEditModel] = useState(props.vehicle.model);
  const [editVin, setEditVin] = useState(props.vehicle.vin);
  const [editPrice, setEditPrice] = useState(props.vehicle.price);
  const [editPhoto, setEditPhoto] = useState(props.vehicle.photo);
  const [editDescription, setEditDescription] = useState(
    props.vehicle.description
  );

  const vehicleEdit = (event) => {
    event.preventDefault();
    fetch(`https://tapatio-server.herokuapp.com/${props.vehicle.id}`, {
      method: "PUT",
      body: JSON.stringify({
        vehicle: {
          year: editYear,
          make: editMake,
          model: editModel,
          vin: editVin,
          price: editPrice,
          photo: editPhoto,
          description: editDescription,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    }).then((res) => {
      console.log(sessionToken)
      refreshPage();
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // const uploadImage = async (e) => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append("file", files[0]);
  //   data.append("upload_preset", "dev_setup");
  //   setLoading(true);
  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/mlpez/image/upload",
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const file = await res.json();
  //   console.log(res);
  //   setImage(file.secure_url);
  //   setEditPhoto(file.secure_url);
  //   setLoading(false);
  // };

  const arr = [];
  const handleDrop = (files) => {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "dev_setup"); // Replace the preset name with your own
      formData.append("api_key", "iWtzb0gNKfNM0r-eNzIspr_xp8c"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading("true");
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post("https://api.cloudinary.com/v1_1/mlpez/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          arr.push(data.secure_url);
          // setImage(data.secure_url);
          console.log(data.secure_url);
        });
      });
      // Once all the files are uploaded
      axios.all(uploaders).then(() => {
        setImage(arr);
        setEditPhoto(arr);
        console.log(arr);
        setLoading("false");
        
      // ... perform after upload is successful operation
    });
  };
  
function imagaPrevie () {
  if (loading === "true") {
    return <h3>Loading</h3>;
}
if (loading === 'false') {
    return <h3>Done</h3>;
}
return '';
}

  const handleOnChange = (e, editor) => {
    const data = editor.getData();
    setEditDescription(data);
  };

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  return (
    <>
      {" "}
      <Button color="warning" onClick={toggleNested}>
        Edit
      </Button>
      <Modal
        isOpen={nestedModal}
        toggle={toggleNested}
        onClosed={closeAll ? toggle : undefined}
      >
        <ModalHeader>Edit Vehicle Informacion</ModalHeader>

        {/* ////////////Edit///////// */}
        <ModalBody>
          <Card>
            <Col>
              <h3>Add A Vehicle</h3>
              <Form onSubmit={vehicleEdit}>
                <FormGroup>
                  Year
                  <Label htmlFor="year" />
                  <Input
                    type="select"
                    name="year"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                  >
                    <option value="">-</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  Make
                  <Label htmlFor="make" />
                  <Input
                    name="make"
                    value={editMake}
                    onChange={(e) => setEditMake(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  Model
                  <Label htmlFor="model" />
                  <Input
                    name="model"
                    value={editModel}
                    onChange={(e) => setEditModel(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  Vin
                  <Label htmlFor="vin" />
                  <Input
                    name="vin"
                    value={editVin}
                    onChange={(e) => setEditVin(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  Price
                  <Label htmlFor="price" />
                  <Input
                    name="price"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  Photo
                  <Label htmlFor="photo" />
                </FormGroup>
                <Dropzone
              className="dropzone"
              onDrop={handleDrop}
              onChange={(e) => setEditPhoto(e.target.value)}
              value={image}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <span>📁</span>
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>  
            {imagaPrevie()}
                <FormGroup>
                  Description
                  <CKEditor
                    editor={ClassicEditor}
                    data={props.vehicle.description}
                    onChange={handleOnChange}
                  />
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
              </Form>
              <br />
            </Col>
          </Card>
        </ModalBody>
        {/* ////////////Edit End////////// */}
        <ModalFooter>
          <Button color="primary" onClick={toggleNested}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VehicleModalEdit;
