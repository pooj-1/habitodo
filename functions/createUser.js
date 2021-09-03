const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const todos = await getCollection();
  const body = JSON.parse(event.body);
  console.log(body)
  try {
    const user = await todos.findOne({ email: { $eq: body.email }});
    if(user){
        return {
            statusCode: 400,
            body: JSON.stringify('Email already exists!'),
          };
    }
    const res = await todos.create(body.id, body);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
