const validateRequest = (schema, type = "body") => {
  return (req, res, next) => {
    const typeObj = {
      body: { req: req.body, format: "Json Type Object" },
      params: { req: req.params, format: "Type Params" },
      query: { req: req.query, format: "Type Query" },
    };
    if (!typeObj[type]["req"]) {
      return res.status(400).json({
        error: `Pass Valid ${typeObj[type]["format"]}`,
      });
    }
    const { error } = schema.validate(typeObj[type]["req"], {
      abortEarly: false,
    });

    // console.log({ error });
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      res.status(422).json({ error: messages });
      return;
    }
    next();
  };
};

module.exports = validateRequest;
