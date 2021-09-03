const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const body = event.body;
  const todos = await getCollection();

  try {
    const admin = await todos.findOne({ isAdmin: { $eq: 'true' }});
    const isAdmin = admin.password===body
    if(!isAdmin){
      return {
        statusCode: 400,
        body: 'Not Authorized',
      };
    }
    const res = await todos.find({});
    const list = Object.keys(res).map(el=>res[el])
    return {
      statusCode: 200,
      body: JSON.stringify(list),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
