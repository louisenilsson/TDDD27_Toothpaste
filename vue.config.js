module.exports = {
    devServer: {
      proxy: {
        "/appointments": {
          target: "http://localhost:4000"
        }
      }
    }
  };
