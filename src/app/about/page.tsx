import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { Microscope } from "lucide-react";

const AboutUsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/about.webp')",
          
          backgroundBlendMode:'darken',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          p: 4,
        }}
      >
        <Box>

          <Typography  variant="h2" fontWeight="bold">
            Welcome to Rentopia
          </Typography>
          <Typography variant="h5"  sx={{ mt: 2 }}>
            Your dream rental, just a click away.
          </Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 6 }}>
        <Typography textAlign={'center'} boxShadow={3} py={2} variant="h4" fontWeight="bold" gutterBottom>
          About Rentopia
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rentopia is a modern rental listing platform that helps tenants find
          the perfect home while making life easier for landlords. With a
          user-friendly interface and advanced search features, we connect
          people to their ideal rental properties seamlessly.
        </Typography>
      </Container>

      {/* Core Values Section */}
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Core Values
        </Typography>
        <Grid container  spacing={4} justifyContent="center">
          {["Transparency", "Convenience", "Trust", "Innovation"].map((value) => (
            <Grid item  key={value} xs={12} sm={6} md={3}>
              <Box
                sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: "background.paper" }}
              >
                
                <Typography variant="h6" fontWeight="bold">
                  {value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  We believe in {value.toLowerCase()} to provide the best rental experience.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Join Rentopia Today
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Find your next home or list your property effortlessly.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
    </>
  );
};

export default AboutUsPage;
