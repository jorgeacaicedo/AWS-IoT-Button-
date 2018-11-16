const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

var stackName = process.env.STACK_NAME;
var templateUrl = process.env.TEMPLATE_URL;

exports.handler = function(event, context, callback) {  
  if (event.clickType ==='DOUBLE') {
    cloudformation.deleteStack({
      StackName: stackName
    }, function(err, res) {
      callback(err);
    });
  } else if (event.clickType === 'SINGLE') {
    cloudformation.createStack({
      StackName: stackName,
      Capabilities: ['CAPABILITY_IAM'],
      Tags: [
        {
          Key: 'Name',
          Value: stackName
        }
      ],
      TemplateURL: templateUrl
    }, function(err, res) {
      callback(err);
    });
  } else {
    callback(new Error(`click type ${event.clickType} not supported`));
  }
};
