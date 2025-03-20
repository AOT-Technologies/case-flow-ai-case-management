import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { createEmployer } from "../../services/EmployerService";

export default function EmployerForm() {
  const [formValues, setFormValues] = useState({
    employerName: "",
    workSafeBCNumber: "",
    email: "",
    phoneNumber: "",
    contacts: [{ firstName: "", lastName: "", phoneNumber: "", email: "", address: "" }],
    locations: [{ address: "", city: "", province: "", country: "", postalCode: "" }],
  });

  const handleChange = (event, index, field, type) => {
    if (type === "contact") {
      const newContacts = [...formValues.contacts];
      newContacts[index][field] = event.target.value;
      setFormValues({ ...formValues, contacts: newContacts });
    } else if (type === "location") {
      const newLocations = [...formValues.locations];
      newLocations[index][field] = event.target.value;
      setFormValues({ ...formValues, locations: newLocations });
    } else {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
  };

  const isContactFilled = (contact) =>
    Object.values(contact).every((value) => value.trim() !== "");

  const isLocationFilled = (location) =>
    Object.values(location).every((value) => value.trim() !== "");

  const handleSubmit = async () => {
    try {
        console.log('form values', formValues)
      const res = await createEmployer({
          name: formValues.employerName,
          worksafenumber: formValues.workSafeBCNumber,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber
      });
      console.log('res is', res)
    
    } catch (error) {
      console.error("Error creating employer:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Employer Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField fullWidth label="Employer Name" name="employerName" value={formValues.employerName} onChange={handleChange} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="WorkSafeBC Number" name="workSafeBCNumber" value={formValues.workSafeBCNumber} onChange={handleChange} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Email" name="email" type="email" value={formValues.email} onChange={handleChange} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Phone Number" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} inputProps={{ maxLength: 14, placeholder: "(XXX) XXX-XXXX" }} /></Grid>
      </Grid>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Create Details</Typography>
      {formValues.contacts.map((contact, index) => (
        <>
          {index > 0 && <Divider sx={{ marginY: 2 }} />}
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}><TextField fullWidth label="First Name" value={contact.firstName} onChange={(e) => handleChange(e, index, "firstName", "contact")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Last Name" value={contact.lastName} onChange={(e) => handleChange(e, index, "lastName", "contact")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Phone Number" value={contact.phoneNumber} onChange={(e) => handleChange(e, index, "phoneNumber", "contact")} inputProps={{ maxLength: 14, placeholder: "(XXX) XXX-XXXX" }} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Email" type="email" value={contact.email} onChange={(e) => handleChange(e, index, "email", "contact")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Address" value={contact.address} onChange={(e) => handleChange(e, index, "address", "contact")} /></Grid>
          </Grid>
        </>
      ))}
      {isContactFilled(formValues.contacts[formValues.contacts.length - 1]) && (
        <Button onClick={() => setFormValues({ ...formValues, contacts: [...formValues.contacts, { firstName: "", lastName: "", phoneNumber: "", email: "", address: "" }] })} variant="outlined" style={{ marginTop: 10 }}>Add Another Contact</Button>
      )}

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Location Details</Typography>
      {formValues.locations.map((location, index) => (
        <>
          {index > 0 && <Divider sx={{ marginY: 2 }} />}
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}><TextField fullWidth label="Address" value={location.address} onChange={(e) => handleChange(e, index, "address", "location")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="City" value={location.city} onChange={(e) => handleChange(e, index, "city", "location")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Province" value={location.province} onChange={(e) => handleChange(e, index, "province", "location")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Country" value={location.country} onChange={(e) => handleChange(e, index, "country", "location")} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Postal Code" value={location.postalCode} onChange={(e) => handleChange(e, index, "postalCode", "location")} /></Grid>
          </Grid>
        </>
      ))}
      {isLocationFilled(formValues.locations[formValues.locations.length - 1]) && (
        <Button onClick={() => setFormValues({ ...formValues, locations: [...formValues.locations, { address: "", city: "", province: "", country: "", postalCode: "" }] })} variant="outlined" style={{ marginTop: 10 }}>Add Another Location</Button>
      )}

      <Button variant="contained" sx={{ backgroundColor: "primary.main", width: "100%", marginTop: 5 }} onClick={handleSubmit}>Submit</Button>
    </Container>
  );
}