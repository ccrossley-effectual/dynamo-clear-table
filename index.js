const { DynamoDB } = require('aws-sdk');

const docClient = new DynamoDB.DocumentClient({region: 'us-west-2'});

const TABLE_NAME = 'PUT YOUR TABLE NAME HERE';

async function listItems() {
  var params = {
    TableName: TABLE_NAME,
  }

  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

async function deleteItem(id) {
  var params = {
    TableName: TABLE_NAME,
    Key: { id }
  }
  try {
    await docClient.delete(params).promise()
  } catch (err) {
    return err
  }
}

const run = async () => {
  try {
    const data = await listItems()
    console.log(data);
    data.Items.forEach(async item => {
      await deleteItem(item.id);
    });
    return { data }
  } catch (err) {
    return { error: err }
  }
};

run();
