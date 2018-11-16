# AWS-IoT-Button-

This project aims to deploy the IoT environment where the IoT button is a trigger for two lambda functions which create a WAF firewall and send a state notification.

![digramiot](https://user-images.githubusercontent.com/21377092/48621566-c5a61a00-e99b-11e8-9568-79d3720cc15e.png)

Before to start you must create the IAM roles to allow deploy the services, then is necessary configure the IoT button “https://docs.aws.amazon.com/es_es/iot/latest/developerguide/configure-iot.html” after this action you have to create the two Lamda functions, this function are develop in node js.

Cloudformation creation

const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

var stackName = process.env.STACK_NAME;
var templateUrl = process.env.TEMPLATE_URL;

exports.handler = function(event, context, callback) {  
  if (event.clickType =='DOUBLE') {
    cloudformation.deleteStack({
      StackName: stackName
    }, function(err, res) {
      callback(err);
    });
  } else if (event.clickType =='SINGLE') {
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

SebdToActions

const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

var stackName = process.env.STACK_NAME;
var templateUrl = process.env.TEMPLATE_URL;

exports.handler = function(event, context, callback) {  
  if (event.clickType =='DOUBLE') {
    cloudformation.deleteStack({
      StackName: stackName
    }, function(err, res) {
      callback(err);
    });
  } else if (event.clickType =='SINGLE') {
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

Now you must asign the lamda functions in Services>Action:
![captura de pantalla de 2018-11-16 07-56-57](https://user-images.githubusercontent.com/21377092/48622593-284ce500-e99f-11e8-942f-f19b043b9603.png)

When you use simple click the Cloudformation will create a Cloudformation environment and with double click will delete Cloudformation environment.

![captura de pantalla de 2018-11-16 08-00-16](https://user-images.githubusercontent.com/21377092/48622741-a4dfc380-e99f-11e8-9c7c-f50217acbc8f.png)

