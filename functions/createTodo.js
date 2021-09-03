const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const todos = await getCollection();
  const body = JSON.parse(event.body);
  console.log(body)

  try {
    const res = await todos.update(body.id,{todos:body.todos});
    console.log(res)
    const list = await todos.get( `${body.id}/todos`);
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
