export const styles = {
  global: {
    "html, body": {
      bg: "gray.50",
      color: "gray.800",
      minHeight: "100vh",
      fontFeatureSettings: "'ss01' on, 'ss02' on, 'cv01' on, 'cv02' on",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "*::placeholder": {
      color: "gray.400",
    },
    "*": {
      borderColor: "gray.200",
      wordWrap: "break-word",
    },
    ".gradient-text": {
      background: "brand.gradients.primary",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    ".card": {
      backdropFilter: "blur(10px)",
      borderRadius: "2xl",
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease-in-out",
      _hover: {
        transform: "translateY(-5px)",
        boxShadow: "xl",
      },
    },
    ".glass-effect": {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "2xl",
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    // Fun animations for buttons
    ".button-bounce": {
      transition: "transform 0.2s",
      _hover: {
        transform: "scale(1.05)",
      },
      _active: {
        transform: "scale(0.95)",
      },
    },
    // Cool hover effects
    ".hover-glow": {
      transition: "all 0.3s ease-in-out",
      _hover: {
        boxShadow: "0 0 20px rgba(0, 245, 212, 0.5)",
      },
    },
  },
};
