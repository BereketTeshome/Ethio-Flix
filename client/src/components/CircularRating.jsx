import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  const stringValue = value >= 10 ? "--" : Math.floor(value * 10) / 10;
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "max-content",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10}
        color="success"
        size={45}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px" }}
        >
          {stringValue.toString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
