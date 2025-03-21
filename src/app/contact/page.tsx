import React from "react";
import { Container, Typography, Box, Grid, TextField, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/contact.jpg')",
          backgroundSize: "cover",
          //backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Contact Us
        </Typography>
      </Box>

      {/* Contact Info */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: <PhoneIcon />, label: "Phone", info: "+1 234 567 890" },
            { icon: <EmailIcon />, label: "Email", info: "support@rentopia.com" },
            { icon: <LocationOnIcon />, label: "Location", info: "123 Rentopia St, NY, USA" },
          ].map((item, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Box textAlign="center" color={'blue'} bgcolor={'#ffdddd'} boxShadow={4} py={4}>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.info}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form */}
      <Container sx={{ py: 6, maxWidth: "600px" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Get in Touch
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField label="Your Name" variant="outlined" fullWidth required />
          <TextField label="Your Email" variant="outlined" fullWidth required type="email" />
          <TextField label="Message" variant="outlined" fullWidth multiline rows={4} required />
          <Box mx={'auto'}>
            <Button variant="contained" color="primary" size="large">
                Send Message
            </Button>

          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ContactUsPage;